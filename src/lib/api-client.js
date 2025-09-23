import axios from "axios";
import { getCookie, setCookie, removeAuthTokens } from "./cookie-utils";

import {refreshTokenUrl} from "../../endpoints";

const API_URL = import.meta.env.VITE_API_URL || "https://gentle-thrush-enormously.ngrok-free.app/api";
// const API_URL = import.meta.env.VITE_API_URL || "http://10.10.12.10:8001/api";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("access_token");
    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU4Njg0NjkzLCJpYXQiOjE3NTg1OTgyOTMsImp0aSI6ImRmOTZlMDlmNzI0OTQ4YzZiMTNkOTQ3OTdmMjdkMjgyIiwidXNlcl9pZCI6IjEiLCJwcm9maWxlIjp0cnVlLCJzdWJzY3JpcHRpb24iOm51bGx9.URV1onyaRFSEK7IHi3QicCDoF0AM4Zu1wkTIZSceHX8";
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    // Check if response is HTML or non-JSON to avoid 'includes' error
    if (error.response && typeof error.response.data === "string") {
      return Promise.reject(
        new Error("Invalid response format from server (likely HTML)")
      );
    }
    if (
      error.response?.data?.message &&
      typeof error.response.data.message === "string" &&
      error.response.data.message.includes("You are not authorized")
    ) {
      console.error("Invalid token detected, clearing auth state");
      removeAuthTokens();
      clearAuthState();
    }
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
          clearAuthState();
          return Promise.reject(error);
        }

        try {
          const response = await apiClient.post(
            refreshTokenUrl,
            {"refresh_token": refreshToken}
          );
          console.log(response.data)
          const { access_token } = response.data;
          setCookie("access_token", access_token, { maxAge: 30 * 24 * 60 * 60 });
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          processQueue(null, access_token);
          return apiClient(originalRequest);
        } catch (err) {
          processQueue(err, null);
          clearAuthState();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

function clearAuthState() {
  removeAuthTokens();
  window.location.href = "/signin";
}

export default apiClient;
