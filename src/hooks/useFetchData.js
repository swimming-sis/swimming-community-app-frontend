import { useEffect, useState } from 'react';

const tokenItem = localStorage.getItem("token");
let authHeader = "";

if (tokenItem) {
  // eslint-disable-next-line no-useless-escape
  const tokenValue = JSON.parse(tokenItem).value.replace(/\'/g,"");
  authHeader = `Bearer ${tokenValue}`;
}

const defaultOptions = {
  method: 'GET',
  headers:{
    Authorization: authHeader,
  }
};

function useFetchData(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        ...defaultOptions,
        ...options,
      });
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      if (!(error instanceof DOMException)) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  
    return () => {};
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, isLoading, error , fetchData}; 
}

export default useFetchData