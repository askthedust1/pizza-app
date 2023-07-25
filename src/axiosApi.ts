import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://my-project-e3375-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;