import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";
import ROLE from "../enums/role.enum";

const API_URL = CONSTANT.baseUrl + "/auth/";

class AuthService {

    async signIn(userName, password) {
        return axiosApiInstance.post(API_URL + "sign-in", {
          userName,
          password,
        });
    }

    async signOut() {
        return axiosApiInstance.get(API_URL + "sign-out");
    }
}

export default new AuthService();