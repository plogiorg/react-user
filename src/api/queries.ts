import { useQuery } from "react-query";
import { fetchUtil } from "../utils/fetch.util";

const QUERY_KEYS = {
  GET_CURRENT_USER: ["user"],
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.GET_CURRENT_USER,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/user/me",
        method: "GET",
        token: true,
      });
    },
  });
};
