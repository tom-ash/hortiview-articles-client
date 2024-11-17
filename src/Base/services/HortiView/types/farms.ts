import { Field } from './field';

/**
 * farm dto (only necessary fields - for now)
 */
export interface Farm {
  id: string;
  farmName: string;
  description: string;
  fields: Field[];
}
