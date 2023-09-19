import { useMutation } from '@tanstack/react-query';

const deleteData = async (endpoint) => {
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
    method: 'DELETE',
    headers: headersWithAuth,
  });

  if (!response.ok) throw new Error(response.status);

  return response.json();
};

// eslint-disable-next-line no-unused-vars
function useDeleteData(endpoint) {
  const mutation = useMutation((endpoint) => deleteData(endpoint), {
    onError: (error) => {
      console.log(`Error deleting data: ${error}`);
    },

    onSuccess: (data) => {
      console.log('Data deleted successfully', data);
    },
  });

  return mutation;
}

export default useDeleteData;
