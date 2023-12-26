import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";

const API_URL = CONSTANT.baseUrl + "/api/moderator/debt-management/";

class ModeratorDebtManagementService {

    async getDebts(params) {
        return axiosApiInstance.get(API_URL + "get-debts", {
            params
        }).then((res) => {
            return res.data;
        });
    }
}

export default new ModeratorDebtManagementService();