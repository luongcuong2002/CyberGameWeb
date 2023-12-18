import axios from "axios";
import CONSTANT from "../utils/constant";
import Cookies from 'universal-cookie';
import { setSignOutDialogShowing } from "../slices/modal_appearance.slice";
import API_ERROR from "../enums/apierror.enum";
const cookies = new Cookies();

const axiosApiInstance = axios.create({
  baseURL: CONSTANT.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApiInstance.defaults.withCredentials = true;

axiosApiInstance.interceptors.request.use(
  async (config) => {
    if (
      config.url.indexOf("/auth") >= 0 && 
      config.url.indexOf("/auth/refresh-token") < 0
    ) {
      return config;
    }

    const accessToken = await cookies.get("accessToken");

    config.headers["x-access-token"] = accessToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const config = error?.config;
    if (
      config?.url.indexOf("/auth") >= 0 &&
      config.url.indexOf("/auth/refresh-token") < 0
    ) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 401) {
      console.log("Token expired!");

      let errorMessage = error?.response?.data?.error;

      if (errorMessage === API_ERROR.expiredAccessToken) {
        const refreshToken = await cookies.get("refreshToken");

        const data = await (
          await axiosApiInstance.post(
            CONSTANT.baseUrl + "/auth/refresh-token",
            {
              refreshToken,
            }
          )
        ).data;

        cookies.set("accessToken", data.newAccessToken);

        config.headers["x-access-token"] = data.newAccessToken;
        console.log("new accessToken: ", data.newAccessToken);
        return axiosApiInstance(config);
      }
      
      if (errorMessage === API_ERROR.expiredRefreshToken) {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        setSignOutDialogShowing(true);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;