import { useMemo } from 'react';
import { useBasicQuery, useOptions } from './useHortiView';
import { UseQueryResult } from '@tanstack/react-query';
import { getFarmOrgEntities } from '../Base/services/HortiView/api/module.api';
import { findById } from '../Base/services/HortiView/Helper';
import { useBasePropsStore } from '../Base/stores/BaseStore';
import { FarmOrgEntityTypes, FarmOrgEntity, FarmOrgEntityTypeResultMap } from '../Base/types/BaseTypes';

export const useFarmOrgEntities = <T>(
  entity: FarmOrgEntityTypes,
  enabled = true
): { data: T[]; isLoading: boolean } => {
  const moduleId = useBasePropsStore(state => state.moduleId);
  const { data: dataarea } = useOptions('dataareagroup');
  const { data: dataareaentity } = useOptions('dataareaentity');

  const farmEntityId = useMemo(() => {
    // as long as there is no data return
    if (!dataarea || !dataareaentity) return undefined;

    // get areaId for 'Farm Organization'
    const areaId = dataarea.find(a => a.value === 'Farm Organization')?.id;
    if (!areaId) return undefined;

    const eId = dataareaentity.find(e => e.description === areaId && e.value === entity)?.id;
    return eId;
  }, [dataarea, dataareaentity, entity]);

  const result = useBasicQuery(
    {},
    () => getFarmOrgEntities<FarmOrgEntity[]>(moduleId, farmEntityId ?? ''),
    entity,
    enabled && !!moduleId && !!farmEntityId
  ) as UseQueryResult<FarmOrgEntity[], Error>;

  return {
    isLoading: result.isLoading,
    data: (result.data ?? [])
      .map(farmOrgEntity => {
        const key = FarmOrgEntityTypeResultMap[entity];
        return farmOrgEntity[key as keyof FarmOrgEntity];
      })
      .filter(Boolean) as T[],
  };
};

export const useFarmOrgEntity = <T>(
  entity: FarmOrgEntityTypes,
  id: string,
  enabled = true
): { data: T | undefined; isLoading: boolean } => {
  const { data: fields, isLoading } = useFarmOrgEntities<T & { id: string }>(entity, enabled);

  const data = useMemo(() => {
    return findById<T>(fields, id);
  }, [fields, id]);

  return {
    data,
    isLoading,
  };
};
