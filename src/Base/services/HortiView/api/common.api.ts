import { HortiViewService } from '../HortiViewService';
import { OptionType } from '../enums';
import { CommonOption } from '../types/options';
import { ApiType, BaseResponse } from '../types/types';

export const getOptions = (
  optionType: keyof typeof OptionType
): Promise<BaseResponse<CommonOption>> =>
  HortiViewService.getInstance().baseFetch(`${optionType}/dropdown`, ApiType.Common, {});
