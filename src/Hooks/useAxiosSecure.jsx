import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const AxiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth(); // make sure useAuth provides logOut
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Request interceptor
    const requestInterceptor = AxiosSecure.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // optional: remove header if no token
          delete config.headers.Authorization;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response interceptor (logout on 401/403)
    const responseInterceptor = AxiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          try {
            await logOut?.(); // firebase signOut
          } catch (e) {
            console.log(e)
          }

          navigate("/loging", { replace: true });
        }

        return Promise.reject(error);
      }
    );

    // ✅ cleanup interceptors (very important)
    return () => {
      AxiosSecure.interceptors.request.eject(requestInterceptor);
      AxiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user?.accessToken, logOut, navigate]);

  return AxiosSecure;
};

export default useAxiosSecure;
