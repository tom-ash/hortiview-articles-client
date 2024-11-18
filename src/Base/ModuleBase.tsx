import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useConfig } from "./hooks/useBase";
import { Routing } from "./routing/Routing";
import { HortiViewService } from "./services/HortiView/HortiViewService";
import { SignalRProvider } from "./services/SignalR/SignalRProvider";
import { useSignalRMessages } from "./services/SignalR/useSignalRMessages";
import { useBasePropsStore } from "./stores/BaseStore";
import { useConfigurationStore } from "./stores/ConfigurationStore";
import { BaseProps, RouteDefinition } from "./types/BaseTypes";

type ModuleBaseProps = {
  props: BaseProps;
  requiredProps?: (keyof BaseProps)[];
  routes: RouteDefinition;
};

/**
 * Base Component for a module that sets the custom props and renders the routing
 * @param props custom props for the module
 * @param requiredProps props that are required for the module to work and will be validated
 * @param routes routeDefinitions for the module, that will render the routing (with the basePath)
 * @returns a routing component with the given routes
 */
export const ModuleBase = ({
  props,
  requiredProps,
  routes,
}: ModuleBaseProps) => {
  const { i18n, t } = useTranslation();
  const setBaseProps = useBasePropsStore((state) => state.setCustomProps);
  const currentLanguage = useBasePropsStore((state) => state.currentLanguage);
  // to load the environment config a sourcePath is needed
  const config = useConfigurationStore((state) => state.config);

  useSignalRMessages();

  useConfig(props);

  useEffect(() => {
    setBaseProps(props);
    if (!props.standalone) validateProps(props, requiredProps);
    HortiViewService.updateProps(props);

    props.addTranslation({ key: "debug", value: t("routes.debug") });
    props.addTranslation({ key: "local", value: t("routes.local") });
    //iterate over every route and add the translation to the translation store
    if (routes)
      Object.values(routes).forEach((route) => {
        const translationKey = route.translationKey;
        if (translationKey)
          props.addTranslation({
            key: translationKey,
            value: t(`routes.${translationKey}`),
          });
      });
  }, [props, setBaseProps, requiredProps, config, t, routes]);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  if (!config || config?.api?.prefix === "" || !HortiViewService.getInstance())
    // return <LoadingSpinner text={t('common.loadingModule')} />;
    return <div>{t("common.loading")}</div>;
  return (
    <SignalRProvider>
      <Routing basePath={props.basePath} routes={Object.values(routes)} />
    </SignalRProvider>
  );
};

/**
 * Validates the props and checks if the required props are set
 * @param props props to be validated
 * @param requiredProps props that will be validated/checked if they exist
 */
const validateProps = (
  props: BaseProps,
  requiredProps?: (keyof BaseProps)[],
) => {
  if (requiredProps) {
    requiredProps.forEach((prop) => {
      checkIfPropExists(prop, props);
    });
  }
};

/**
 * Checks if a prop exists and throws an error if it does not
 * @param prop prop to be checked
 * @param props props to be checked against
 */
const checkIfPropExists = (prop: keyof BaseProps, props: BaseProps) => {
  if (!props[prop]) {
    throw new Error(`Missing required prop: ${prop}`);
  }
};

export const testExport = {
  checkIfPropExists,
  validateProps,
  useConfig,
};
