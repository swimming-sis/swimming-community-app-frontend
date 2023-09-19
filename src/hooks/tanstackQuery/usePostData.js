import { useMutation } from '@tanstack/react-query';

const postData = async ({ endpoint, body }) => {
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
    method: 'POST',
    headers: headersWithAuth,
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
};

function usePostData() {
  const mutation = useMutation(postData, {
    onError: (error) => {
      console.log(`Error posting data: ${error}`);
    },

    onSuccess: (data) => {
      console.log('Data posted successfully', data);
    },
  });

  return mutation;
}

export default usePostData;
