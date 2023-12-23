import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";

const API_URL = CONSTANT.baseUrl + "/api/moderator/account/";

class ModeratorAccountManagementService {

    async createNewUser(data) {
        return axiosApiInstance.post(API_URL + "create-new-user", data).then((res) => {
            return res.data;
        });
    }
}

export default new ModeratorAccountManagementService();