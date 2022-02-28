const axios = require("axios");

axios.default.withCredentials = true;

const API_URL = "http://localhost:3001/api/auth/";

//Authenticate user
export const authenticate = async (req) => {
    return axios.post(`${API_URL}authenticate`, {
            username: req.username,
            email: req.email,
            password: req.password,            
    }, {withCredentials: true})
    .then(res => {               
        return res;
    })
    .catch(err => {
        console.error("error", err)
        return err;
    })
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
    .catch(err => {
        console.error("error", err);
        return err;
    })
}

//Check for token validity
export const checkToken = () => {
    return axios.get('/checkToken')
    .then(res => res)
    .catch(err => {
        console.error("error", err);
        return err;
    })
}

//Verifies code sent to email for registration
export const verifyUser = (code) => {
    return axios.post(`${API_URL}confirm/${code}`).then(res => {
        return res.data;
    })
    .catch(err => {
        console.log("error", err);
        return err;
    })
};