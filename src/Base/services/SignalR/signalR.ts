/**
 * SignalR message interface, contains property bag for additional data
 */
export interface SignalRMessage {
  messageId: string;
  messageType: keyof typeof MessageType;
  entityId: string;
  entityType: keyof typeof EntityType;
  operationType: keyof typeof OperationType;
  message: string;
  propertyBag: PropertyBag;
}

/**
 * Property bag interface
 * Contains key value pairs with additional data, cant be different for each message
 */
interface PropertyBag extends Record<string, string> {}

/**
 * Enum for the possible operation types
 */
export enum OperationType {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

/**
 * Enum for the possible message types
 * currently not in use
 */
export enum MessageType {
  Notification = 'Notification',
  Alert = 'Alert',
}

/**
 * Enum for the possible entity types
 * the entity type is used to determine the target of the message
 * please check which kind of entity types are available in the platform and add them here
 * of course you can add more entity types if needed for your module
 */
export enum EntityType {
  Block = 'Block',
  Field = 'Field',
}

/**
 * the mapping list of notification icons for the different entity types
 * the icon is used to display the notification in the notification center
 * please check which icons are available in the platform and add them here
 * of course you can add more icons if needed for your module
 */
export const NotificationIcons: Record<keyof typeof EntityType, string> = {
  Block: 'border_clear',
  Field: 'grass',
};
