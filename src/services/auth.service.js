import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const API_URL = CONSTANT.baseUrl + "/auth/";

class AuthService {

    async signIn(userName, password) {
        return axiosApiInstance.post(API_URL + "sign-in", {
          userName,
          password,
        }).then((response) => {
            if (response.data && response.data.accessToken) {
                cookies.set("accessToken", response.data.accessToken);
            }
            if (response.data && response.data.refreshToken) {
                cookies.set("refreshToken", response.data.refreshToken);
            }
            return response;
        });
    }

    async signOut() {
        return axiosApiInstance.get(API_URL + "sign-out");
    }
}

export default new AuthService();