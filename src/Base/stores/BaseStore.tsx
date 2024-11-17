import { create } from 'zustand';
import { BaseProps } from '../types/BaseTypes';

/**
 * Store with base properties that are passed to the module
 * @param standalone if the module is standalone or part of a host application (default: false)
 */
type BasePropsStore = BaseProps & {
  setCustomProps: (props: BaseProps) => void;
};

/**
 * Global Store with base properties, to be used in the module
 */
export const useBasePropsStore = create<BasePropsStore>(set => ({
  config: null,
  sourcePath: '',
  basePath: '',
  currentLanguage: 'en',
  currentNavigationPath: '',
  navigateTo: () => console.warn('navigateTo not implemented, please provide a function'),
  organizationId: '',
  addTranslation: () => console.warn('addTranslation not implemented, please provide a function'),
  addNotification: () => console.warn('addNotification not implemented, please provide a function'),
  setCustomProps: props => {
    set(() => props);
  },
  standalone: false,
  token: '',
  modulePermissionToken: '',
  moduleId: '',
}));
