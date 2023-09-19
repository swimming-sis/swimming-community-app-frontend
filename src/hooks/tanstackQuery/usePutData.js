import { useMutation } from '@tanstack/react-query';

const putData = async ({ endpoint, body }) => {
  const tokenItem = localStorage.getItem('token');
  let authHeader = '';

  if (tokenItem) {
    // eslint-disable-next-line no-useless-escape
    const tokenValue = JSON.parse(tokenItem).value.replace(/\'/g, '');
    authHeader = `Bearer ${tokenValue}`;
  }

  const headersWithAuth = {
    'Content-Type': 'application/json',
    Authorization: authHeader,
  };

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: headersWithAuth,
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
};

function usePutData() {
  const mutation = useMutation(putData, {
    onError: (error) => {
      console.log(`Error updating data: ${error}`);
    },

    onSuccess: (data) => {
      console.log('Data updated successfully', data);
    },
  });

  return mutation;
}

export default usePutData;
