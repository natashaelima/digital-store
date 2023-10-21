import axios from "axios";

export const API = axios.create({
    baseURL: 'http://locahost:3000/'
});