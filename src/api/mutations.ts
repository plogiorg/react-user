import { useMutation } from "react-query";
import { LoginRequest } from ".";
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
