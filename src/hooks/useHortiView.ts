import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getOptions } from "../Base/services/HortiView/api/common.api";
import { OptionType } from "../Base/services/HortiView/enums";
import { universalSelector } from "../Base/services/HortiView/Helper";
import { HortiViewService } from "../Base/services/HortiView/HortiViewService";
import { CommonOption } from "../Base/services/HortiView/types/options";
import { BaseResponse, Query} from "../Base/services/HortiView/types/types";
import { useBasePropsStore } from "../Base/stores/BaseStore";

//CommonApi
export const useTestConnection = (): UseQueryResult<boolean, Error> =>
  useBasicQuery(
    {},
    HortiViewService.getInstance()?.testConnection,
    'testConnection'
  ) as UseQueryResult<boolean, Error>;

export const useOptions = (
  optionType: keyof typeof OptionType
): UseQueryResult<CommonOption[], Error> =>
  useQuery({
    queryKey: ['Hortiview-articles-client', 'options', optionType],
    queryFn: () => getOptions(optionType),
    select: data => universalSelector<CommonOption>(data) as CommonOption[],
  });

//useQuery
export const useBasicQuery = <T>(
  query: Query<T>,
  callback: (query: Query<T>, id: string) => Promise<BaseResponse<T>>,
  queryKeyHelper: string,
  enabled = true,
  id?: string
): UseQueryResult<T | T[], Error> => {
  const organizationId = useBasePropsStore(state => state.organizationId);
  const queryKey = ['Hortiview-articles-client', queryKeyHelper, organizationId, query, id];
  return useQuery({
    queryKey,
    queryFn: () => callback(query, id ?? ''),
    select: data => universalSelector<T>(data),
    enabled: enabled === true,
  });
};
