// API clients to communicate with backend
const callApiEndpoint = (endpoint: string, options = {}) => {
  let status = 0;
  return fetch(endpoint, options)
    .then(res => {
      ({ status } = res);
      return res.json();
    })
    .then(
      result => {
        if (status !== 200 && status !== 201) {
          return { error: result };
        }
        return { response: result };
      },
      error => {
        // eslint-disable-next-line no-console
        console.log('Looks like there was a problem: \n', error);
        return { error };
      }
    );
};

const createList = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const endpoint = `${baseUrl}/api/lists`;
  const options = {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(option)
  };
  return callApiEndpoint(endpoint, options);
};

const resetList = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { id } = option;
  const endpoint = `${baseUrl}/api/lists/${id}/reset`;
  return callApiEndpoint(endpoint, {});
};

const loadList = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { id } = option;
  const endpoint = `${baseUrl}/api/lists/${id}`;
  return callApiEndpoint(endpoint, {});
};

const createItem = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { title, listId } = option;
  const endpoint = `${baseUrl}/api/lists/${listId}/items`;
  const options = {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({ title })
  };
  return callApiEndpoint(endpoint, options);
};

const deleteItem = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { itemId, listId } = option;
  const endpoint = `${baseUrl}/api/lists/${listId}/items/${itemId}`;
  const options = {
    mode: 'cors',
    method: 'DELETE'
  };
  return callApiEndpoint(endpoint, options);
};

const reOrderItem = (option: any) => {
  const { REACT_APP_API_BASE_URL: baseUrl } = process.env;
  const { itemId, listId, index } = option;
  const endpoint = `${baseUrl}/api/lists/${listId}/items/${itemId}`;
  const options = {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify({ index })
  };
  return callApiEndpoint(endpoint, options);
};

export const apiCalls = {
  createList,
  resetList,
  loadList,
  createItem,
  deleteItem,
  reOrderItem
};
