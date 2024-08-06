async function callApi(endpoints, options) {
  const baseURL = "http://localhost:7039/api/";
  return fetch(`${baseURL}${endpoints}`, options);
}

export default callApi;
