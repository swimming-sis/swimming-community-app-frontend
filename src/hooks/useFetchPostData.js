import { useState } from 'react';

const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function useFetchPostData(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  async function fetchData(body = {}) {
    setIsLoading(true);
    const controller = new AbortController();

    const tokenItem = localStorage.getItem('token');
    let authHeader = '';

    if (tokenItem) {
      // eslint-disable-next-line no-useless-escape
      const tokenValue = JSON.parse(tokenItem).value.replace(/\'/g, '');
      authHeader = `Bearer ${tokenValue}`;
    }

    const headersWithAuth = {
      ...defaultOptions.headers,
      Authorization: authHeader,
    };
    
    try {
      const response= await fetch(endpoint, {
        ...defaultOptions,
        ...options,
        signal: controller.signal,
        headers: headersWithAuth,
        body: JSON.stringify(body),
      });
      setResponse(response)

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      if (!(error instanceof DOMException)) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }

    return () => {
      controller.abort()
    };
  }

  return { data, response, isLoading, error, fetchData };
}

export default useFetchPostData;
