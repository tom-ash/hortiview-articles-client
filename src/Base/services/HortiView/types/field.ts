import { Block } from "./block";

export interface Field {
  id: string;
  name: string;
  description: string;
  farmId: string;
  blocks: Block[];
}
