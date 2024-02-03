import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import { betaTravelAxios } from "../../axios/axios";

const useUseQuery = (queryId: string, route: string, enabled: boolean, params?: {}, headers?: {}, onSuccess?: (data: AxiosResponse<any, any>) => void, onError?: () => void) => {
  return useQuery(
    queryId,
    async () => {
      return await betaTravelAxios.get(route, {
        params,
        headers,
      });
    },
    {
      enabled,
      onSuccess,
      onError,
      cacheTime: 0,
    }
  );
};

export default useUseQuery;
