import axios from "axios";
import CONSTANT from "../utils/constant";

const API_URL = CONSTANT.baseUrl + "api/";

class AuthService {

    constructor(){
        axios.defaults.withCredentials = true;
    }

    signin(userName, password) {
        return axios
            .post(API_URL + "signin", {
                userName,
                password
            })
    }

    signout() {
        return axios.get(API_URL + 'signout');
    }

    getCurrentUser() {
        return axios.get(API_URL + "get-user-infor")
            .then((res) => {
                if (res.data.message) {
                    return null;
                } else {
                    return res.data;
                }
            })
    }
}

export default new AuthService();