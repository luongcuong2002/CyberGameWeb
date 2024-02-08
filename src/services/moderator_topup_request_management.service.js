import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";

const API_URL = CONSTANT.baseUrl + "/api/moderator/topup-request/";

class ModeratorTopupRequestManagementService {

    async getTopupRequests(pageNo, pageSize, searchTerm) {
        return axiosApiInstance.get(API_URL + "get-topup-requests", {
            params: {
                pageNo,
                pageSize,
                searchTerm
            }
        }).then((res) => {
            return res.data;
        });
    }
}

export default new ModeratorTopupRequestManagementService();