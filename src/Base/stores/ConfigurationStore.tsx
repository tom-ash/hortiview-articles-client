import { create } from "zustand";
import { Configuration } from "../types/BaseTypes";

/**
 * Store with the configuration object that is used to configure the environment of the module.
 */
type ConfigurationStore = {
  /**
   * The configuration object that is used to configure the environment of the module.
   */
  config: Configuration | null;
  /**
   * Sets the configuration object that is used to configure the environment of the module.
   * @param config - the configuration object
   */
  setConfig: (config: Configuration) => void;
};

/**
 * Store with the configuration object that is used to configure the environment of the module.
 * If you handle the configuration by another way, this store can be replaced or removed.
 */
export const useConfigurationStore = create<ConfigurationStore>((set) => ({
  config: null,
  setConfig: (config) => {
    set(() => ({ config }));
  },
}));
