import { BaseProps, Configuration } from "../../types/BaseTypes";
import isEmpty from "lodash/isEmpty";
import {
  formatQuery,
  getConfig,
  getMockResponse,
  getResponse,
  prependBaseUrl,
} from "./Helper";
import { ApiType, BaseResponse, Query, TextType } from "./types/types";

export interface IHortiViewService {
  testConnection(): Promise<boolean>;
  baseFetch<T>(
    url: string,
    api: ApiType,
    query: Query<T>,
    permamock?: boolean,
  ): Promise<BaseResponse<T>>;
  baseMutation<T, R>(
    url: string,
    api: ApiType,
    method: "POST" | "PATCH" | "DELETE",
    body?: T,
  ): Promise<BaseResponse<R>>;
}

export class HortiViewService implements IHortiViewService {
  private static instance: IHortiViewService;
  private static modulePermissionToken: string;
  private static mock?: boolean = false;
  private static organizationId: string;
  private static apis: Omit<Configuration["api"], "prefix">;

  //#region Initialization
  private constructor(
    standalone: boolean,
    modulePermissionToken: string,
    apis?: Omit<Configuration["api"], "prefix">,
    organizationId?: string,
  ) {
    HortiViewService.mock = standalone;
    HortiViewService.modulePermissionToken = modulePermissionToken;
    if (apis) HortiViewService.apis = apis;
    if (organizationId) HortiViewService.organizationId = organizationId;
  }

  public static readonly getInstance = (): IHortiViewService => {
    return HortiViewService.instance;
  };

  public static readonly initializeInstance = (
    standalone: boolean,
    modulePermissionToken: string,
    apis?: Omit<Configuration["api"], "prefix">,
    organizationId?: string,
  ): IHortiViewService => {
    if (!HortiViewService.instance) {
      HortiViewService.instance = new HortiViewService(
        standalone,
        modulePermissionToken,
        apis,
        organizationId,
      );
    }

    return HortiViewService.instance;
  };
  //#endregion

  public static readonly updateProps = (props: BaseProps): void => {
    const { modulePermissionToken, organizationId } = props;
    HortiViewService.modulePermissionToken = modulePermissionToken;
    HortiViewService.organizationId = organizationId;
  };

  public testConnection = (): Promise<boolean> => {
    return new Promise((resolve) => {
      this.baseFetch("HealthzChecks/ping", ApiType.CommonNoVersion, {}).then(
        (resp) => {
          if ((resp as TextType)?.value === "pong") resolve(true);
          else resolve(false);
        },
      );
    });
  };

  private getApiUrl = (api: ApiType): string => {
    switch (api) {
      case ApiType.Module:
        return HortiViewService.apis.module;
      case ApiType.Common:
      case ApiType.CommonNoVersion:
        return HortiViewService.apis.common;
      default:
        throw new Error(
          "Invalid api type - needs to be implemented in HortiViewService",
        );
    }
  };

  public baseFetch = <T>(
    url: string,
    api: ApiType,
    query: Query<T>,
    permamock?: boolean,
  ): Promise<BaseResponse<T>> => {
    if (HortiViewService.mock || permamock)
      return getMockResponse(url, query ?? {});
    const token = HortiViewService.modulePermissionToken;
    const orgId = HortiViewService.organizationId;
    const config = getConfig(token, orgId);
    const apiUrl = this.getApiUrl(api);
    const formattedQuery = !isEmpty(query) ? formatQuery(query) : "";

    const completeUrl = `${prependBaseUrl(url, api, apiUrl, true, orgId)}${formattedQuery}`;

    //return only getResponse
    return getResponse(`${completeUrl}`, config);
  };

  public baseMutation = <T, R>(
    url: string,
    api: ApiType,
    method: "POST" | "PATCH" | "DELETE",
    body?: T,
  ): Promise<BaseResponse<R>> => {
    const token = HortiViewService.modulePermissionToken;
    const orgId = HortiViewService.organizationId;
    const config = getConfig(token, orgId, method);
    const completeUrl = prependBaseUrl(
      url,
      api,
      this.getApiUrl(api),
      true,
      orgId,
    );
    //return only getResponse
    return getResponse(completeUrl, {
      ...config,
      ...(body && { body: JSON.stringify(body) }),
    });
  };
}
