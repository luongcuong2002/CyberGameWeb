import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";
import ROLE from "../enums/role.enum";

const API_URL = CONSTANT.baseUrl + "/auth/";

class AuthService {

    async signIn(userName, password) {

        // return new Promise((resolve, reject) => {
        //     resolve({
        //       data: {
        //         userId: 1,
        //         userName: "CUONG",
        //         userPublicName: "L",
        //         avatar: null,
        //         role: ROLE.user,
        //         amount: 1000000,
        //         membershipClass: "new",
        //         realName: null,
        //         dateOfBirth: null,
        //         gender: null,
        //         address: null,
        //         phoneNumber: null,
        //         email: null,
        //         amountOwed: null,
        //         sessionDisabled: null,
        //         createdDate: null,
        //       },
        //     });
        // })
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