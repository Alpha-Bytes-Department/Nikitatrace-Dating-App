import { useState } from "react";
import apiClient from "./api-client";


const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteResource = async (endpoint) => {
    setLoading(true);
    try {
      await apiClient.delete(endpoint);
      setError(null);
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { deleteResource, loading, error };
};

export default useDelete;
