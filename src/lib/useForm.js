import { useState } from "react";
import apiClient from "./api-client"; // Make sure this is your Axios instance

const useForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postResource = async (endpoint, formData) => {
    setLoading(true);
    try {
      const response = await apiClient.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError(null);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postResource, loading, error };
};

export default useForm;
