import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { invalidateMultipleQueries } from "../HortiView/Helper";
import { SignalRModuleContext } from "./SignalRProvider";
import {
  EntityType,
  NotificationIcons,
  OperationType,
  SignalRMessage,
} from "./signalR";
import styles from "./signalRProvider.module.css";
import { useBasePropsStore } from "../../stores/BaseStore";
import { NotificationDto } from "../../types/BaseTypes";
import React from "react";

/**
 * useSignalRMessages
 * Subscribes to the signalR messages and maps them to alerts
 *
 * organization targets: FarmAdminPushNotification, ModuleAdminPushNotification
 * user targets: UserAdminPushNotification, HVAdminPushNotification
 */
export const useSignalRMessages = () => {
  const addNotification = useBasePropsStore((state) => state.addNotification);

  const { mapMessageToAlert } = useMessageMapper();
  const { triggerAdditionalFunctions } = useTriggerAdditionalFunctions();

  // get all messages for organizations
  SignalRModuleContext.useSignalREffect(
    "ModuleApiPushNotification",
    (...[message]) => {
      addNotification(mapMessageToAlert(message as SignalRMessage));
      triggerAdditionalFunctions(message as SignalRMessage);
    },
    [addNotification],
  );
};

/**
 * a hook to map the signalR message to an alert
 * @returns
 */
const useMessageMapper = () => {
  const { t } = useTranslation();

  /**
   * Message example:
   * {"type":1,"target":"ModuleApiPushNotification","arguments":[
   * {"messageType":"Notification",
   * "entityId":"9121c035-3212-4524-a829-3750f021b3c0",
   * "entityType":"Block",
   * "operationType":"Delete",
   * "message":"Block was deleted",
   * "propertyBag":{"firstName":"Jane","lastName":"Doe","blockName": "Block 1"}}]}
   */

  /**
   * Maps the signalR message to an alert
   * @param message signalR message
   * @returns
   */
  const mapMessageToAlert = (message: SignalRMessage): NotificationDto => {
    const { entityType, operationType, propertyBag, messageId } = message;

    const id = messageId ?? crypto.randomUUID(); // generate id if not provided

    return {
      id,
      description: t(`notification.${entityType}${operationType}Description`, {
        ...propertyBag,
      }),
      title: t(`notification.${entityType}${operationType}`),
      farmOrganizationId: propertyBag.farmOrgid,
      criteriaIcon: (
        <AlertIcon
          icon={NotificationIcons[entityType]}
          danger={operationType === OperationType.Delete}
        />
      ),
      timeStamp: new Date(),
      moduleName: "",
    };
  };

  return { mapMessageToAlert };
};

/**
 * a hook to provide additional functions that should be triggered by the signalR message
 * depending on the message type and operation type
 *
 * e.g. invalidate season queries when a block was deleted
 * @returns
 */
const useTriggerAdditionalFunctions = () => {
  const queryClient = useQueryClient();
  const triggerAdditionalFunctions = (message: SignalRMessage) => {
    const { entityType, operationType } = message;
    switch (`${entityType}${operationType}`) {
      case `${EntityType.Field}${OperationType.Delete}`:
      case `${EntityType.Block}${OperationType.Delete}`:
        invalidateMultipleQueries(queryClient, [
          ["Hortiview-articles-client", "cropseasons"],
        ]);
        break;
      default:
        break;
    }
  };

  return { triggerAdditionalFunctions };
};

/**
 * AlertIcon
 * @param icon
 * @returns
 */
const AlertIcon = ({
  icon,
  danger = false,
}: {
  icon?: string | null;
  danger?: boolean;
}) => {
  return (
    <img
      alt={icon ?? "icon"}
      src={icon ?? "notifications"}
      className={danger ? styles.colorDanger : ""}
    />
  );
};
