import { useMutation } from "react-query";
import { LoginRequest, SignupRequest } from ".";
import { fetchUtil } from "../utils/fetch.util";

export const useLogin = () => {
  return useMutation({
    onMutate: (data: LoginRequest) => {
      return fetchUtil({
        url: "/v1/auth/login",
        body: data,
        method: "POST",
      });
    },
  });
};

export const useLogout = () => {
  return useMutation({
    onMutate: () => {
      return fetchUtil({
        url: "/v1/auth/logout",
        method: "POST",
      });
    },
  });
};

export const useGetService = () => {
  return useMutation({
    mutationFn: (id:number) => {
      return fetchUtil({
        url: `/v1/service/${id}`,
        method: "GET",
        token: true
      });
    },
  });
};
export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupRequest) => {
      return fetchUtil({
        url: "/v1/auth/user/signup",
        body: data,
        method: "POST",
      });
    },
  });
};