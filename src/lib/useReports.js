// useReports.js
import { useState, useCallback } from "react";
import apiClient from "./api-client";

const useReports = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const report = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get('/administration/report/list/', filters);
      const result = response.data;
      setData(result);
      return result;
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to fetch";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { report, data, loading, error };
};

export default useReports;