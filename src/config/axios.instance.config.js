import axios from "axios";
import CONSTANT from "../utils/constant";
import Cookies from 'universal-cookie';
import { setSignOutDialogShowing, setBlockUserDialogShowing } from "../slices/modal_appearance.slice";
import API_ERROR from "../enums/apierror.enum";
import { store } from "../redux/store";
import { setUser } from "../slices/user.slice";

const cookies = new Cookies();
let urlBeforeRefreshToken = "";

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
    const url = config?.url;

    if (!url) {
      return Promise.reject(error);
    }

    const errorMessage = error?.response?.data?.error;

    if (
      url.indexOf("/auth") >= 0 &&
      url.indexOf("/auth/refresh-token") < 0
    ) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401 && errorMessage) {
      if (errorMessage === API_ERROR.expiredAccessToken) {
        console.log("accessToken expired!");
        const refreshToken = await cookies.get("refreshToken");

        // save url before refresh token
        urlBeforeRefreshToken = url;

        const newAccessToken = await (await axiosApiInstance.post(
          CONSTANT.baseUrl + "/auth/refresh-token", { refreshToken }
        )).data;

        if (!newAccessToken) {
          urlBeforeRefreshToken = "";
          return Promise.reject(error);
        }

        cookies.set("accessToken", newAccessToken, { path: "/" });

        config.headers["x-access-token"] = newAccessToken;
        console.log("resend api with new access token");
        return axiosApiInstance(config);
      }
      
      if (errorMessage === API_ERROR.expiredRefreshToken) {
        console.log("refreshToken expired!");
        cookies.remove("accessToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
        

        if (urlBeforeRefreshToken.indexOf("/user/get-info") >= 0) {
          return;
        }

        store.dispatch(setUser(null));
        store.dispatch(setSignOutDialogShowing({ isSignOutDialogShowing: true }));
      }

      // show dialog if user is blocked
      if (errorMessage === API_ERROR.userIsBlocked) {
        console.log("user is blocked!");
        cookies.remove("accessToken", { path: "/" });
        cookies.remove("refreshToken", { path: "/" });
        store.dispatch(setUser(null));
        store.dispatch(setBlockUserDialogShowing({ isBlockUserDialogShowing: true }));
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;