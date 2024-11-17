import { CommonOption } from '../types/options';
import { TextType } from '../types/types';

export const Ping: TextType = {
  value: 'pong',
};

export const StatusOptions: CommonOption[] = [
  {
    id: 'b5e885ed-c837-43fe-b9fb-9738ec18fd00',
    value: 'Draft',
    description: '',
  },
  {
    id: '5e9e38c5-a775-4fff-b579-81e8a04c3188',
    value: 'Active',
    description: '',
  },
  {
    id: 'a1988dbd-5a8e-4311-a1a1-372ca069e132',
    value: 'Archived',
    description: '',
  },
];
export const CropOptions: CommonOption[] = [
  { id: '1', value: 'Tomatoes', description: 'Tomato' },
  { id: '2', value: 'Cucumber', description: 'Cucumber' },
  { id: '3', value: 'Pepper', description: 'Pepper' },
  { id: '4', value: 'Eggplant', description: 'Eggplant' },
];

export const CropTypeOptions: CommonOption[] = [
  { id: '1', value: 'Indeterminate', description: 'Indeterminate' },
  { id: '2', value: 'Determinate', description: 'Determinate' },
  { id: '3', value: 'Semi-Determinate', description: 'Semi-Determinate' },
  { id: '4', value: 'Dwarf', description: 'Dwarf' },
];

export const CropVarierityOptions: CommonOption[] = [
  { id: '1', value: 'Cherry', description: 'Cherry' },
  { id: '2', value: 'Beefsteak', description: 'Beefsteak' },
  { id: '3', value: 'Roma', description: 'Roma' },
  { id: '4', value: 'Heirloom', description: 'Heirloom' },
];

export const RootstockOptions: CommonOption[] = [
  {
    id: '5ac99572-8524-4972-95e7-d795c193c30f',
    value: 'Ahorta',
    description: '',
  },
  {
    id: '4ae2c149-e43a-4b89-ae48-d250ca6ff09b',
    value: 'Colosus',
    description: '',
  },
  {
    id: '0fd18408-ba0f-4889-bc9d-258687cf7b59',
    value: 'Defenso',
    description: '',
  },
  {
    id: '9a5a0868-ad01-42c8-8d8c-76bd5065f6c4',
    value: 'Dynafor',
    description: '',
  },
  {
    id: 'a38ee19e-f9f5-4b11-af98-14b100e2a8c3',
    value: 'Empower',
    description: '',
  },
  {
    id: '96b81c8a-299d-4446-9ea3-9d9d38553427',
    value: 'Enforcer',
    description: '',
  },
  {
    id: '1b8460a3-f47a-4b0e-ab9a-446ac9051eaa',
    value: 'Fortalino',
    description: '',
  },
  {
    id: '5088be65-6074-4c1d-bba4-7319f367308d',
    value: 'Itzafort',
    description: '',
  },
  {
    id: '415cdad8-8fd8-4965-a1fb-044759745e28',
    value: 'Kaiser',
    description: '',
  },
  {
    id: '7e379617-6ef4-4ffc-8060-601436951a32',
    value: 'Maxifort',
    description: '',
  },
  {
    id: '0e96d43a-2202-4a76-bbd2-36efb049ff32',
    value: 'Multifort',
    description: '',
  },
  {
    id: '5bf33d1d-0946-41e2-b8ec-8b3e283e8a73',
    value: 'Other',
    description: '',
  },
  {
    id: 'fd63eca6-ba3f-4512-8c48-b3ed3ba2f277',
    value: 'Taurino',
    description: '',
  },
  {
    id: '9726cf85-d05c-4b41-93f5-d6cc18b0495e',
    value: 'Top 2010',
    description: '',
  },
  {
    id: 'f0ab100b-8d8a-4b10-be5e-1b34e9bee1ad',
    value: 'Top 2014',
    description: '',
  },
];

/**
 * Data Area Options - currently only Farm Organization
 */
export const DataAreaOptions: CommonOption[] = [
  {
    id: 'ec983864-f928-484a-a0fb-d6e24a03df86',
    value: 'Farm Organization',
    description: '',
  },
];

/**
 * Data Area Entity Options - currently only Farm Organization
 */
export const DataAreaEntityOptions: CommonOption[] = [
  {
    id: '80c9fd4c-2311-40bb-a1ef-ae4033d9e1e8',
    value: 'farms',
    description: 'ec983864-f928-484a-a0fb-d6e24a03df86',
  },
  {
    id: '7709947d-66a4-49f4-8c3e-818ffd8a5766',
    value: 'zone_tags',
    description: 'ec983864-f928-484a-a0fb-d6e24a03df86',
  },
  {
    id: 'a1a1cfac-f77d-451c-9ed3-d2d120070882',
    value: 'farm_organizations',
    description: 'ec983864-f928-484a-a0fb-d6e24a03df86',
  },
  {
    id: '4abe2ab8-8ca3-4847-a3a3-ec5d77a07dde',
    value: 'field_tags',
    description: 'ec983864-f928-484a-a0fb-d6e24a03df86',
  },
  {
    id: 'bee07c3b-3b11-4637-9402-7ffb5593e773',
    value: 'zones',
    description: 'ec983864-f928-484a-a0fb-d6e24a03df86',
  },
  {
    id: 'e3e36b72-df1c-405b-bd52-d856b0bcd9f5',
    value: 'farm_tags',
    description: 'ec983864-f928-484a-a0fb-d6e24a03df86',
  },
  {
    id: '2efe27ab-28f3-4df2-b584-db62b0c86f9c',
    value: 'fields',
    description: 'ec983864-f928-484a-a0fb-d6e24a03df86',
  },
  {
    id: '08ca7f97-53c6-4fff-a9f5-e684ffe171a9',
    value: 'irrigation_stations',
    description: 'ec983864-f928-484a-a0fb-d6e24a03df86',
  },
];
