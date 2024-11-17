import { QueryClient, QueryKey } from "@tanstack/react-query";
import isEmpty from "lodash/isEmpty";
import buildQuery from "odata-query";
import {
  CropOptions,
  CropTypeOptions,
  CropVarierityOptions,
  DataAreaEntityOptions,
  DataAreaOptions,
  Ping,
  RootstockOptions,
  StatusOptions,
} from "./mockresults/Common";
import { Blocks, Farms, Fields } from "./mockresults/Farm";
import { ApiType, BaseResponse, Query } from "./types/types";

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  return response;
};

export const getConfig = (
  token: string,
  organizationId?: string,
  method = "GET",
): RequestInit => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Api-Version", "1.0");
  if (organizationId) headers.append("orgId", organizationId);
  headers.append("Authorization", `Bearer ${token}`);
  return {
    redirect: "follow",
    credentials: "omit",
    method,
    headers,
  };
};

/**
 * a base fetch function which can be used for all fetches, it handles the response {@link handleResponse} and returns the json which is a type of given T.
 * @param url - the complete url build by {@link prependBaseUrl}
 * @param config - the request config including auth headers
 * @returns the json object which is a type of given T
 * @example export const fetchInvitedUsers = async (config: RequestConfig, formattedQuery: string): Promise<InvitedUsersOdata> => {
  return baseFetch(prependBaseUrl(`InvitedUsers${formattedQuery}`, ApiType.User), config);
};
 */
export const getResponse = async <T>(
  url: string,
  config: RequestInit,
): Promise<BaseResponse<T>> => {
  const response = await fetch(url, config).then(handleResponse);
  const jsonText = await response.text();
  let json;
  try {
    //parse json if possible otherwise return the text as value
    json = JSON.parse(jsonText);
  } catch {
    //if parsing fails, return the text as value (e.g. for ping endpoint)
    json = {
      value: jsonText,
    };
  }
  return json;
};

/**
 * combines the base url (depending on the type like: farm, module, user, common, registry, marketplace) with the endpoint and the organization context if needed
 * @param endpoint - the endpoint to call
 * @param apiUrl - the type of the api see
 * @param type - the type of the api see {@link ApiType}
 * @param withOrganizationContext - if the organization context should be added to the url
 * @param organizationId - the organization id to add to the url, default is the active organization
 * @returns
 */
export const prependBaseUrl = (
  endpoint: string,
  type: ApiType,
  apiUrl: string,
  withOrganizationContext = true,
  organizationId?: string,
) => {
  const organizationPart =
    withOrganizationContext && organizationId ? `/${organizationId}` : "";

  //Add new api types here if needed
  switch (type) {
    case ApiType.Module:
      return `${apiUrl}/api/v1.0${organizationPart}/${endpoint}`;
    case ApiType.Common:
      return `${apiUrl}/api/v1.0/${endpoint}`;
    case ApiType.CommonNoVersion:
      return `${apiUrl}/${endpoint}`;
    default:
      throw new Error(
        "Invalid api type - needs to be implemented in HortiViewService",
      );
  }
};

/**
 * a helper function to format the query string
 * @param query - the query object to format
 * @param withApiVersion - if the api version should be added to the query string
 * @returns
 */
export const formatQuery = <T>(query?: Query<T>, withApiVersion = true) => {
  const version = withApiVersion ? "api-version=1.0" : "";
  const questionMark = withApiVersion ? "?" : "";
  const ampersand = withApiVersion ? "&" : "";

  if (!query) return `${questionMark}${version}`;
  const {
    filter = [],
    orderBy = [],
    select,
    top,
    skip,
    expand = [],
    count = true,
    overwrite = "", // last resort for uncommon query string
  } = query;
  if (overwrite) {
    return overwrite;
  } else {
    const formatted = buildQuery({
      expand,
      filter,
      orderBy,
      select,
      top,
      skip,
      count,
    });
    return isEmpty(formatted)
      ? `${questionMark}${version}`
      : `${formatted}${ampersand}${version}`;
  }
};

/**
 * a universal selector that can be used for all fetches
 * @param data - the data to select from
 * @returns
 */
export const universalSelector = <T>(data: BaseResponse<T>): T | T[] => {
  // check special types first
  if (typeof data === "string") return data;
  if (typeof data === "boolean") return data;
  if (typeof data === "number") return data;

  // if data is an odata object with a value property, return the value property
  if (typeof data === "object" && "value" in (data as object)) {
    return (data as { value: T | T[] }).value;
  }
  // if data is an odata object with a value property, return the value property
  if (typeof data === "object" && "items" in (data as object)) {
    return (data as { items: T | T[] }).items;
  }

  // if data is an array, return it
  if (Array.isArray(data)) return data;

  // if data is a single object, return it as type of T
  return data as T;
};

/**
 * Invalidates multiple queries and refetches them
 * @param queryClient
 * @param keys array of query keys
 */
export const invalidateMultipleQueries = (
  queryClient: QueryClient,
  keys: QueryKey[],
) => {
  keys.forEach((queryKey) => {
    queryClient.invalidateQueries({ queryKey, refetchType: "none" });
    queryClient.refetchQueries({ queryKey });
  });
};

export const mockCall = async <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

export const getMockResponse = async <T>(
  url: string,
  query: Query<T>,
  delay = 1000,
): Promise<T> => {
  const data: T = getMockData(url);
  //use query on mock data if array
  if (Array.isArray(data)) {
    return mockCall(getInputQuery(data, query), delay) as T;
  }
  return mockCall(data, delay);
};

export const getMockData = <T>(url: string): T => {
  switch (url) {
    case "HealthzChecks/ping":
      return Ping as unknown as T;
    case "farms":
      return Farms as unknown as T;
    case "fields":
      return Fields as unknown as T;
    case "blocks":
      return Blocks as unknown as T;
    case "seasonstate/dropdown":
      return StatusOptions as unknown as T;
    case "crop/dropdown":
      return CropOptions as unknown as T;
    case "croptype/dropdown":
      return CropTypeOptions as unknown as T;
    case "cropvariety/dropdown":
      return CropVarierityOptions as unknown as T;
    case "rootstock/dropdown":
      return RootstockOptions as unknown as T;
    case "dataareagroup/dropdown":
      return DataAreaOptions as unknown as T;
    case "dataareaentity/dropdown":
      return DataAreaEntityOptions as unknown as T;
    case url.match(/getAllFarmOrgEntities\//)?.input: {
      // matches getAllFarmOrgEntities/123-456-789/abc
      const id = getLastUrlSegment(url);
      // matches abc
      if (!id) return {} as T;

      if (id === findByValue(DataAreaEntityOptions, "farms")?.id)
        return Farms.map((farm) => ({ farm })) as unknown as T;
      if (id === findByValue(DataAreaEntityOptions, "fields")?.id)
        return Fields.map((field) => ({ field })) as unknown as T;
      if (id === findByValue(DataAreaEntityOptions, "zones")?.id)
        return Blocks.map((block) => ({ block })) as unknown as T;
      return findById(Fields, id) as unknown as T;
    }
    default:
      return {} as T;
  }
};

const getLastUrlSegment = (url: string) => {
  return url.split("/").pop()?.split("?").shift();
};

/**
 * filters and selects data based on the query object
 * @deprecated
 * @param data the data to filter and select
 * @param query  the query object to filter and select the data
 * @returns  the filtered and selected data
 */
export const getInputQuery = <T>(data: T[], query: Query<T>): T[] => {
  const { filter, select } = query;
  let result = data;

  //if filter is array
  if (Array.isArray(filter)) {
    result = result.filter((item) => {
      return filter.every((filterItem) => {
        //if filterItem is a string
        if (typeof filterItem === "string") {
          const [key, value] = filterItem.split(" eq ");
          return item[key as keyof T] === value;
        }
        //if filterItem is an object
        const [key, value] = Object.entries(filterItem)[0];
        return item[key as keyof T] === value;
      });
    });
  }

  //if filter object
  if (typeof filter === "object") {
    const [key, value] = Object.entries(filter)[0];
    result = result.filter((item) => item[key as keyof T] === value);
  }

  //if filter is no array
  if (typeof filter === "string") {
    const [key, value] = filter.split(" eq ");
    result = result.filter((item) => item[key as keyof T] === value);
  }

  //select
  if (select && Array.isArray(select)) {
    result = result.map((item) => {
      const newItem: Partial<T> = {};
      select.forEach((key) => {
        newItem[key as keyof T] = item[key as keyof T];
      });
      return newItem as T;
    });
  }
  //single select
  if (select && typeof select === "string") {
    result = result.map((item) => {
      const newItem: Partial<T> = {};
      newItem[select as keyof T] = item[select as keyof T];
      return newItem as T;
    });
  }
  return result;
};

/**
 * find object of T by id
 * @param data the data to search in
 * @param id the id to search for
 */
export const findById = <T>(
  data: (T & { id: string })[] | undefined,
  id: string,
): T | undefined => {
  return data?.find((item) => item.id === id);
};

/**
 * find object of T by a given value
 * @param data the data to search in
 * @param value the value to search for
 */
export const findByValue = <T>(
  data: (T & { value: string })[] | undefined,
  value: string,
): T | undefined => {
  return data?.find((item) => item.value === value);
};

/**
 * Get the date object from a string or date object
 * @param date
 */
export const getDate = (date: Date | string) => {
  return typeof date === "string" ? new Date(date) : date;
};
