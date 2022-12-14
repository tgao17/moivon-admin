import { axiosInstance } from "../api";
import { ALL_ENDPOINTS } from "../api/endpoints";

export const login = (data) => {
  return axiosInstance.post(ALL_ENDPOINTS.BUILD_LOGIN(), data);
};

export const register = (data) => {
  return axiosInstance.post(ALL_ENDPOINTS.BUILD_REGISTER(), data);
};

export const forgotPassword = (data) => {
  return axiosInstance.post(ALL_ENDPOINTS.BUILD_FORGOT_PASSWORD(), data);
};

export const refreshAccessToken = (refreshToken) => {
  if (refreshToken) {
    return axiosInstance.post(ALL_ENDPOINTS.BUILD_REFRESH_TOKEN(), {
      refreshToken,
    });
  }

  throw new Error("No token found!");
};
