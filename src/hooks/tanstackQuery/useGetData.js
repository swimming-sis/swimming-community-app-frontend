import { useQuery } from '@tanstack/react-query';

const getData = async (endpoint) => {
  const tokenItem = localStorage.getItem('token');
  let authHeader = '';

  if (tokenItem) {
    // eslint-disable-next-line no-useless-escape
    const tokenValue = JSON.parse(tokenItem).value.replace(/\'/g, '');
    authHeader = `Bearer ${tokenValue}`;
  }

  const headersWithAuth = {
    Authorization: authHeader,
  };

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: headersWithAuth,
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
};

function useGetData(endpoint) {
  const { data, isLoading, error } = useQuery(endpoint, () => getData(endpoint), {
    retry: 2, suspense: true
  });

  return { data, isLoading, error };
}

export default useGetData;
