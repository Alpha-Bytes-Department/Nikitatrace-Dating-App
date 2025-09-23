import axios from "axios";
import { getCookie, setCookie, removeAuthTokens } from "./cookie-utils";
import { refreshTokenUrl, loginUrl } from "../../endpoints";

const API_URL = import.meta.env.VITE_API_URL || "https://gentle-thrush-enormously.ngrok-free.app/api";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    // Skip adding Authorization header for login endpoint
    if (!config.url.includes(loginUrl)) {
      const accessToken = getCookie("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    // Ensure FormData requests don't have a conflicting Content-Type
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check for non-JSON response
    if (error.response && typeof error.response.data === "string") {
      return Promise.reject(
        new Error("Invalid response format from server (likely HTML)")
      );
    }

    // Skip unauthorized handling for login endpoint
    if (error.config.url.includes(loginUrl)) {
      return Promise.reject(error); // Pass login errors directly to component
    }

    // Handle "You are not authorized" for non-login endpoints
    if (
      error.response?.data?.message &&
      typeof error.response.data.message === "string" &&
      error.response.data.message.includes("You are not authorized")
    ) {
      console.error("Invalid token detected, clearing auth state");
      removeAuthTokens();
      // Only redirect if not on signin page
      if (window.location.pathname !== "/signin") {
        window.location.href = "/signin";
      }
      return Promise.reject(error);
    }

    // Handle 401 errors for token refresh
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      if (
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/refresh-token")
      ) {
        if (isRefreshing) {
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return await axios(originalRequest);
          } catch (err) {
            return Promise.reject(err);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getCookie("refresh_token");
        if (!refreshToken) {
          // Only redirect if not on signin page
          if (window.location.pathname !== "/signin") {
            removeAuthTokens();
            window.location.href = "/signin";
          }
          return Promise.reject(error);
        }

        try {
          const response = await apiClient.post(refreshTokenUrl, {
            refresh_token: refreshToken,
          });
          const { access_token } = response.data;
          setCookie("access_token", access_token, { maxAge: 30 * 24 * 60 * 60 });
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          processQueue(null, access_token);
          return apiClient(originalRequest);
        } catch (err) {
          processQueue(err, null);
          // Only redirect if not on signin page
          if (window.location.pathname !== "/signin") {
            removeAuthTokens();
            window.location.href = "/signin";
          }
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;