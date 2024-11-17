export type Block = {
  id: string;
  fieldId: string;
  blockName?: string;
  shortName?: string;
  area?: number;
  fieldPercentage?: number;
  tagID?: string;
  description?: string;
  length?: number;
  width?: number;
  rows?: number;
  /** Stringyfied Position, only used in BE */
  location?: string;
  /**Position will be transformed from the Location string, only internally used*/
  position?: {
    row: number;
    column: number;
  };
};
