import { Block } from '../services/HortiView/types/block';
import { Farm } from '../services/HortiView/types/farms';
import { Field } from '../services/HortiView/types/field';

/**
 * Properties that are passed to the Base component by the host application
 * @param token authentication user token
 * @param modulePermissionToken token for the module, to communicate with the module api
 * @param moduleId id of the module
 * @param basePath base path of the module (that is part of the URL and will be used for routing)
 * @param organizationId id of the organization, where the module is used
 * @param config configuration object that is used to configure the module
 * @param navigateTo function to navigate to a specific route to trigger the routing in the host application
 * @param addTranslation function to add a translation to the i18n instance of the host application
 * @param currentNavigationPath current path of the route, that is changed, when the host application navigates
 */
export type BaseProps = {
  /**
   * authentication user token - @deprecated
   * a communication with the internal hv apis will not be possible in the future
   * this token will be removed in the future
   * use modulePermissionToken instead
   */
  token: string;
  /**
   * token for the module, to communicate with the module api
   */
  modulePermissionToken: string;
  moduleId: string;
  basePath: string;
  sourcePath: string;
  organizationId: string;
  config: RemoteComponentConfig | null;
  currentNavigationPath: string;
  currentLanguage: string;
  standalone?: boolean;
  /**
   * function to navigate to tell the host application to navigate to a specific route
   * @param path the path to navigate to
   * @returns
   */
  navigateTo: (path: string) => void;
  /**
   * function to add a translation to the i18n instance of the host application
   * @param translation the translation to add
   * @returns
   */
  addTranslation: (translation: { key: string; value: string }) => void;
  /**
   * function to add a notification to the host application, which will be displayed in the notification center
   */
  addNotification: (notification: NotificationDto) => void;
};

/**
 * needed information for a route
 */
export type RouteConfig = {
  path: string;
  element: JSX.Element;
  translationKey?: string;
};

/**
 * Definition of a Route
 * @example
 * {
 *  Home: {
 *   path: "/",
 *   element: <Home />,
 *  },
 *  Test: {
 *   path: "/test",
 *   element: <Test />,
 *  },
 * }
 */
export type RouteDefinition = {
  [key: string]: RouteConfig;
};

/**
 * Configuration object that is used to configure the environment of the module
 *
 */
export type Configuration = {
  /**
   * The environment of the module, @example "development", "production"
   */
  environment: string;
  /**
   * the api endpoints used by the module
   */
  api: {
    prefix: string;
    common: string;
    module: string;
  };
};

/**
 * The notification object that is used to display notifications in the host application
 */
export type NotificationDto = {
  /**
   * The criteria icon that is used to display the icon of the notification
   */
  criteriaIcon?: JSX.Element | string | null;
  /**
   * The description of the notification
   */
  description: string | JSX.Element;
  /**
   * The farm organization id of the notification
   */
  farmOrganizationId: string;
  /**
   * The id of the notification
   */
  id: string;
  /**
   * The link of the notification
   */
  link?: string;
  /**
   * The name of the module the notification is coming from
   */
  moduleName: string;
  /**
   * the notifications time stamp
   */
  timeStamp: Date;
  /**
   * the title of the notification
   */
  title: string;
};

/**
 * The type of the remote configurations
 */
export type RemoteComponentConfig = {
  isBaseModule?: boolean;
  /**
   * The relative path to the shared module, e.g. ./MyModule
   */
  module: string;
  /**
   * The path to the remote container entry. The url were the app is running or the path to location of the remote js file, e.g. http://localhost:3000/remoteEntry.js
   */
  path: string;
  /**
   * name of the remote app, like sprayingbook
   */
  scope: string;

  /**
   * name of the module
   */
  name?: string;

  /**
   * name of the icon
   */
  icon?: string;
  /**
   * if the module has an error
   */
  error?: boolean;
  /**
   * the short name of the module
   */
  shortName: string;
  /**
   * the id of the module - used as alias
   */
  id: string;
};

/**
 * the basic interface for the module apis farm organization entities
 */
export interface FarmOrgEntity {
  block: Block | undefined;
  entityName: FarmOrgEntityTypes;
  farm: Farm | undefined;
  farmOrg: { id: string } | undefined; // not needed
  field: Field | undefined;
  id: string;
  irrigationStation: { id: string } | undefined;
}

export type FarmOrgEntityTypes =
  | 'farms'
  | 'fields'
  | 'zones'
  | 'irrigation_stations'
  | 'farm_organizations';

export const FarmOrgEntityTypeResultMap: Record<FarmOrgEntityTypes, string> = {
  farms: 'farm',
  fields: 'field',
  zones: 'block',
  irrigation_stations: 'irrigationStation',
  farm_organizations: 'farmOrg',
};
