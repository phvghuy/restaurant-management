//frontend/src/createInstance.js
//khong can phai tao AxiosJWT o cac page co ADMIN nua
//Ma dung file nay cho tat ca cac chuc nang yeu cau AccessToken, refreshToken
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const refreshToken = async () => {
    try {
      const res = await axios.post("/v1/auth/refresh", null,{
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
          let currentDate = new Date();
          const decodedToken = jwtDecode(user?.accessToken);
          if (decodedToken.exp < currentDate.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = {
              ...user,
              accessToken: data.accessToken,
            };
            dispatch(stateSuccess(refreshUser));
            config.headers["token"] = "Bearer " + data.accessToken;
          }
          return config;
        },
        (err) => {
          return Promise.reject(err);
        }
      );
    return newInstance;
};