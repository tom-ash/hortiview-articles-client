import { Expand, OrderBy, Filter as QueryFilter, Select } from "odata-query";
/**
 * The type of the api to call
 */
export enum ApiType {
  Common,
  CommonNoVersion,
  Module,
}

export type TextType = {
  value: string;
};

/**
 * Definition of a request configuration in the system
 */
export type RequestConfig = {
  redirect: "follow";
  credentials: "omit";
  headers: RequestHeader;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
};

/**
 * Definition of a request header in the system
 */
export type RequestHeader = {
  "Content-Type"?: "application/json";
  orgId?: string;
  Authorization?: string;
  Permission?: string;
  "Api-Version"?: "1.0" | "2.0";
};

/**
 * Definition of a Query used in hooks to fetch data
 */
export type Query<T> = {
  filter?: QueryFilter<T>;
  orderBy?: OrderBy<T>;
  expand?: Expand<T>;
  // could not find a valid type for select
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select?: Select<T>;
  count?: boolean;
  pagination?: Pagination;
  top?: number;
  skip?: number;
  overwrite?: string;
};

/**
 * Definition of a Pagination object
 */
export type Pagination = {
  top?: number;
  skip?: number;
  pageSize?: number;
};

/**
 * Definition of a hook parameter object
 */
export type HookParams<T> = {
  query?: Query<T>;
  refetch?: {
    refetchInterval: number;
    refetchIntervalInBackground: boolean;
  };
  id?: string;
  organizationId?: string;
  enabled?: boolean;
};

export type BaseResponse<T> = T | T[] | { value: T | T[] } | { items: T | T[] };
