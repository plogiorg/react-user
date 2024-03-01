import { useQuery } from "react-query";
import { fetchUtil } from "../utils/fetch.util";
import { GetServiceParams, ServiceResponse, ServiceTypeReponse } from "./models.ts";

const QUERY_KEYS = {
  GET_CURRENT_USER: ["user"],
  GET_SERVICE_LIST: ["services"],
  GET_SERVICE_TYPES: ["service_types"],
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

export const useServicesList = (params?: GetServiceParams) => {
  return useQuery<ServiceResponse>({
    queryKey: QUERY_KEYS.GET_SERVICE_LIST,
    queryFn: () => {
      let queryString = '';
      if (params) {
        const queryParams = new URLSearchParams(params as any);
        queryString = '?' + queryParams.toString();
      }

      return fetchUtil({
        url: `/v1/service${queryString}`,
        method: "GET",
        token: false,
      });
    },
  });
};

export const useServiceTypes = () => {
  return useQuery<ServiceTypeReponse>({
    queryKey: QUERY_KEYS.GET_SERVICE_TYPES,
    queryFn: () => {
      return fetchUtil({
        url: "/v1/service/types",
        method: "GET",
        token: true,
      });
    },
  });
}
