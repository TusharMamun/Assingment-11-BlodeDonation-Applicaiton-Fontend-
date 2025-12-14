import axios from "axios";

import { useEffect } from "react";
import useAuth from "./useAuth";


const AxiosSecure = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base
});

const useAxiosSecure = () => {
  const {user} =useAuth()
useEffect(()=>{
  // interceptors request
  AxiosSecure.interceptors.request.use(config=>{
    config.headers.Authorization =`Bearer ${user?.accessToken}`
    return  config
  },[user])
})
  return AxiosSecure;
};

export default useAxiosSecure;
