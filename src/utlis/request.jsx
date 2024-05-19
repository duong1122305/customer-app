import axios from "axios";

const request = axios.create({
    baseURL: 'https://localhost:7019/'
});

export const get = async (url, params = {}) => {
    const respone = await request.get(url, params);

    return respone.data;
}

export default request;