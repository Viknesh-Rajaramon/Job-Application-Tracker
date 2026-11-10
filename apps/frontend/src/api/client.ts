import axios from "axios";

export const adminInstance = axios.create({
    baseURL: process.env.REACT_APP_USER_BASE_URL,
    withCredentials: true,
});
