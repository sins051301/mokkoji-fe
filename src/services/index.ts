import axios from "axios";
import {
  useAuthStore,
  isTokenExpired,
} from "@/features/login/store/useAuthStore";
import { getTokenExpiration } from "@/utils/getTokenExpiration";
import { useModalStore } from "@/stores/useModalStore";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/dev`,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken && !isTokenExpired()) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setAccessToken, refreshToken, clearToken } =
      useAuthStore.getState();
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/dev/users/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            withCredentials: true,
          }
        );

        const newToken = data.data.accessToken;
        const expiredTime = getTokenExpiration(newToken);
        setAccessToken(newToken, expiredTime || 59);
        error.config.headers.Authorization = `Bearer ${newToken}`;

        return api(error.config);
      } catch {
        clearToken();
        useModalStore.getState().openModal();
        throw new Error("Refresh token expired, logging out...");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
