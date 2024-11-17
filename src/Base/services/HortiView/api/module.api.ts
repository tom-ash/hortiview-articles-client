import { HortiViewService } from '../HortiViewService'
import { ApiType, BaseResponse } from '../types/types';

export const getFarmOrgEntities = <T>(
  moduleId: string,
  entityId: string
): Promise<BaseResponse<T>> =>
  HortiViewService.getInstance().baseFetch(
    `getAllFarmOrgEntities/${moduleId}/${entityId}`,
    ApiType.Module,
    {}
  );
