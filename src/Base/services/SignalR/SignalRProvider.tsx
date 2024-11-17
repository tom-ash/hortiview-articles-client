
import { PropsWithChildren, useMemo } from 'react';
import { createSignalRContext } from 'react-signalr';
import { ProviderProps } from 'react-signalr/lib/signalr/provider';
import { useBasePropsStore } from '../../stores/BaseStore';
import { useConfigurationStore } from '../../stores/ConfigurationStore';

/**
 * SignalRProvider on behalf of the module
 */
export const SignalRModuleContext = createSignalRContext();

/**
 * SignalRProvider
 * @param children
 * @returns
 */
export const SignalRProvider = ({ children }: PropsWithChildren) => {
  // get token from store
  const token = useBasePropsStore(state => state.modulePermissionToken);
  const moduleId = useBasePropsStore(state => state.moduleId);
  const orgId = useBasePropsStore(state => state.organizationId);
  const config = useConfigurationStore(state => state.config);

  // Basic SignalR provider props
  const providerProps: Omit<ProviderProps, 'url' | 'children'> = useMemo(
    () => ({
      accessTokenFactory: () => token,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      automaticReconnect: [10000, 20000, 30000, 60000], // 10s, 20s, 30s, 60s four retries
      onError: async error => console.error('SignalR connection error', error),
    }),
    [token]
  );

  /**
   * There is a signal r hub in the module api to receive messages from there.
   *
   * This provider is used to provide the signalR context for the module.
   * The connection is only enabled if the module permission token, the module id, organization id and the module api url is present.
   *
   */

  return (
    <SignalRModuleContext.Provider
      {...providerProps}
      connectEnabled={!!token && !!moduleId && !!config?.api.module && !!orgId}
      dependencies={[token, moduleId, config?.api.module, orgId]}
      url={`${config?.api.module}/api/${orgId}/${moduleId}/pushNotifications`}
    >
      {children}
    </SignalRModuleContext.Provider>
  );
};
