import CONSTANT from "../utils/constant";
import axiosApiInstance from "../config/axios.instance.config";

const API_URL = CONSTANT.baseUrl + "/api/user/";

class UserService {

  async getCurrentUser() {
    return axiosApiInstance.get(API_URL + "get-info").then((res) => {
      if (res.data.message) {
        return null;
      } else {
        return res.data;
      }
    });
  }
}

export default new UserService();
