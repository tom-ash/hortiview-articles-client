import { HortiViewService } from '../services/HortiView/HortiViewService';
import { useConfigurationStore } from '../stores/ConfigurationStore';
import { BaseProps } from '../types/BaseTypes';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasePropsStore } from '../stores/BaseStore';
// re-export everything
export * from 'react-router-dom';

/**
 * Hook to navigate to a specific path in the module and the host application
 * @returns a function to navigate to a specific path (with the base path)
 */
const useRouting = () => {
  const currentNavigationPath = useBasePropsStore(state => state.currentNavigationPath);
  const standalone = useBasePropsStore(state => state.standalone);
  const navigateTo = useBasePropsStore(state => state.navigateTo);
  const navigateFunc = useNavigate();
  //#region Navigation
  const navigate = useMemo(() => {
    if (standalone)
      return (path: string) => {
        navigateFunc(path);
      };
    if (currentNavigationPath) navigateFunc(currentNavigationPath);
    return (path: string) => {
      navigateTo(path);
    };
  }, [currentNavigationPath, navigateTo, standalone, navigateFunc]);
  //#endregion
  return navigate;
};

/**
 *  Hook to build a route with the base path of the module
 * @param basePath the base path of the module
 * @returns a function to build a route with the base path prepended
 */
export const useRouteBuilder = (basePath: string) => {
  const builder = (path: string) => {
    return route({ base: basePath, path });
  };
  return builder;
};

/**
 * internal function to build a route with the base path
 */
const route = ({ base, path }: { base: string; path: string }) => {
  const route = `${base}${path}`;
  return route;
};
/**
 * Hook to return a route with the base path
 * @param path internal path/route of the module
 * @returns the route with the base path
 */
export const useRoute = (path: string) => {
  const basePath = useBasePropsStore(state => state.basePath);
  return route({ base: basePath, path });
};

/**
 * Loads the configuration from the environment file, placed in /public/config/env.js.
 * The function creates a script tag, which contains an additional window attribute called `__env_season__`.
 * To get this on runtime the sourcePath is needed, which is provided by the host application.
 * If handle the config by another way, this function can be replaced or removed
 * @param sourcePath path to the module
 */
export const useConfig = (props: BaseProps) => {
  const { sourcePath, modulePermissionToken, standalone, organizationId, config } = props;
  const setConfig = useConfigurationStore(state => state.setConfig);
  const getConfig = async () => {
    const existing = document.getElementById(config?.shortName ?? 'template_env');
    if (existing) {
      setConfig(buildConfig());
    }

    if (!existing) {
      const path = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
      const script = document.createElement('script');
      script.id = config?.shortName ?? 'template_env';
      script.src = `${path}/config/env.js`;
      script.onload = () => {
        // get the config from the window object
        const config = buildConfig();
        // initialize the hortiview service
        HortiViewService.initializeInstance(
          !!standalone,
          modulePermissionToken,
          config?.api,
          organizationId
        );
        // set the config in the store
        setConfig(config);
      };

      document.head.appendChild(script);
    }
  };

  useEffect(() => {
    getConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourcePath]);
};

const buildConfig = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = (window as any).__env_template__;
  const config = {
    api: {
      prefix: env?.API_PREFIX ?? '',
      user: env?.USER_API ?? '',
      farm: env?.FARM_API ?? '',
      common: env?.COMMON_API ?? '',
      proxy: env?.PROXY_API ?? '',
      module: env?.MODULE_API ?? '',
    },
    environment: 'Hortiview-articles-client',
  };
  return config;
};

//export navigate
export { useRouting as useNavigate };
