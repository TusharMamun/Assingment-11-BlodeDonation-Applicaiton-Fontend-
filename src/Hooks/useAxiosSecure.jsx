import axios from "axios";
// import { useEffect } from "react";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router-dom";

const AxiosSecure = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base
});

const useAxiosSecure = () => {
  // const { logOut, user } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // ✅ Request interceptor
  //   const reqInterceptor = AxiosSecure.interceptors.request.use(
  //     (config) => {
  //       const token = user?.accessToken;

  //       // don't overwrite if already set
  //       if (token && !config.headers?.Authorization) {
  //         config.headers = config.headers || {};
  //         config.headers.Authorization = `Bearer ${token}`;
  //       }
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   // ✅ Response interceptor (error handling)
  //   const resInterceptor = AxiosSecure.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const status = error?.response?.status;

  //       // Unauthorized / Forbidden => logout + go to login
  //       if (status === 401 || status === 403) {
  //         try {
  //           await logOut();
  //         } catch (e) {
  //           // ignore logout failure
  //         }
  //         navigate("/loging", { replace: true });
  //       }

  //       // Optionally: normalize error message
  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     AxiosSecure.interceptors.request.eject(reqInterceptor);
  //     AxiosSecure.interceptors.response.eject(resInterceptor);
  //   };
  // }, [user?.accessToken, logOut, navigate]);

  return AxiosSecure;
};

export default useAxiosSecure;
