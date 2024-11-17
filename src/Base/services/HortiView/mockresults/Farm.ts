import { Block } from '../types/block';
import { Farm } from '../types/farms';
import { Field } from '../types/field';

export const SingleFarm: Farm = {
  id: '123-456-789',
  farmName: 'This is a Farm',
  description: 'Farm Description',
  fields: [],
};

export const Fields: Field[] = [
  {
    id: '123-456-789',
    name: 'Field Name',
    description: 'Field Description',
    blocks: [],
    farmId: '345-678-901',
  },
  {
    id: '234-567-890',
    name: 'aNOTHER Field Name',
    description: 'Field Description',
    blocks: [],
    farmId: '345-678-901',
  },
];

export const Farms: Farm[] = [
  {
    id: '123-456-789',
    farmName: 'This is a Farm',
    description: 'Farm Description',
    fields: [],
  },
  {
    id: '234-567-890',
    farmName: 'This is a Farm 2',
    description: 'Farm Description 2',
    fields: [],
  },
  {
    id: '345-678-901',
    farmName: 'Farm Name 3',
    description: 'Farm Description 3',
    fields: Fields,
  },
];

export const Blocks: Block[] = [
  {
    id: '123-456-789',
    blockName: 'Block Name',
    description: 'Block Description',
    fieldId: '123-456-789',
    position: { row: 1, column: 1 },
    location: '{"row":1,"column":1}',
    rows: 12,
    length: 50,
    area: 600,
  },
  {
    id: '234-567-890',
    blockName: 'Block Name 2',
    description: 'Block Description 2',
    fieldId: '123-456-789',
    position: { row: 1, column: 2 },
    location: '{"row":1,"column":2}',
    rows: 23,
    length: 60,
    area: 1380,
  },
  {
    id: '345-678-901',
    blockName: 'Block Name 3',
    description: 'Block Description 3',
    fieldId: '234-567-890',
    position: { row: 1, column: 1 },
    location: '{"row":1,"column":1}',
    rows: 34,
    length: 70,
    area: 2380,
  },
];
