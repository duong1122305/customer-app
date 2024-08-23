async function callApi(endpoints, options) {
  const baseURL = "https://api.datlich.id.vn/api/";
  return fetch(`${baseURL}${endpoints}`, options);
}

export default callApi;
