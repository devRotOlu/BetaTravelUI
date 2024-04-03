import { useQuery } from "@tanstack/react-query";

import { betaTravelAxios } from "../../axios/axios";

const useUseQuery = (queryKey: string[], route: string, enabled: boolean, params?: {}, headers?: {}) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      return await betaTravelAxios.get(route, {
        params,
        headers,
      });
    },
    enabled,
    gcTime: 0,
    networkMode: "offlineFirst",
  });
};

export default useUseQuery;
