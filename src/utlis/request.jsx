async function callApi(endpoints, options) {
  const baseURL = "https://localhost:7039/api/";
  return fetch(`${baseURL}${endpoints}`, options);
}

export default callApi;
