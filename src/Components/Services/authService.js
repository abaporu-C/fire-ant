const axios = require("axios");

const API_URL = "http://localhost:3001/api/auth/";

//Authenticate user
export const authenticate = (req) => {
    return axios.post(`${API_URL}authenticate`, {
        username: req.username,
        email: req.email,
        password: req.password,
    })
    .then(res => {
        console.log(res)
        return res;
    })
    .catch(err => console.error("error", err))
}

//Register new user
export const register = (req) => {
    return axios.post(`${API_URL}register`, {
        username: req.username,
        email: req.email,
        password: req.password,
    })
    .then(res => {
        console.log(res)
        return res;
    })
    .catch(err => console.error("error", err))
}

//Check for token validity
export const checkToken = () => {
    return axios.get('/checkToken')
    .then(res => res)
    .catch(err => console.error("error", err))
}

//Verifies code sent to email for registration
export const verifyUser = (code) => {
    return axios.post(`${API_URL}confirm/${code}`).then(res => {
        return res.data;
    })
};