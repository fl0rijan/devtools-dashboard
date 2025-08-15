import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

export const loginUser = async (username, password) => {
    const res = await api.post("/user/login", {username, password});
    return res.data;
}

export const registerUser = async (email, username, password) => {
    const res = await api.post("/user/register", {email, username, password});
    return res.data;
}

export const logoutUser = async () => {
    const res = await api.post("/user/logout");
    return res.data;
}

export const getCurrentUser = async () => {
    const res = await api.get('/user');
    return res.data;
};