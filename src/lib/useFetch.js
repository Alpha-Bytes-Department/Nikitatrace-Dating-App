import { useEffect, useState } from "react";
import apiClient from "./api-client";

const useFetch = (endpoint, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(endpoint, options);
        if (isMounted) {
            console.log(response.data)
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies); // run on mount or when any dependency changes

  return { data, error, loading };
};

export default useFetch;
