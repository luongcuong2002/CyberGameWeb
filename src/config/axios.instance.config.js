import axios from "axios";
import CONSTANT from "../utils/constant";
import Cookies from 'universal-cookie';
import { setSignOutDialogShowing } from "../slices/modal_appearance.slice";
import API_ERROR from "../enums/apierror.enum";
import { store } from "../redux/store";

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

      let errorMessage = error?.response?.data?.error;

      if (errorMessage === API_ERROR.expiredAccessToken) {
        console.log("accessToken expired!");
        const refreshToken = await cookies.get("refreshToken");

        const newAccessToken = await (await axiosApiInstance.post(
          CONSTANT.baseUrl + "/auth/refresh-token", refreshToken
        )).data;

        if (!newAccessToken) {
          return Promise.reject(error);
        }

        cookies.set("accessToken", newAccessToken);

        config.headers["x-access-token"] = newAccessToken;
        console.log("resend api with new access token");
        return axiosApiInstance(config);
      }
      
      if (errorMessage === API_ERROR.expiredRefreshToken) {
        console.log("refreshToken expired!");
        cookies.remove("accessToken");
        cookies.remove("refreshToken");

        store.dispatch(setSignOutDialogShowing({ isSignOutDialogShowing: true }));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;