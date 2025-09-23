import { useState } from "react";
import apiClient from "./api-client";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postResource = async (endpoint, formData) => {
    setLoading(true);
    try {
      const response = await apiClient.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError(null);
      return response.data; // Return response if needed
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postResource, loading, error };
};

export default usePost;
