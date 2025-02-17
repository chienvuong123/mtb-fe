import { EGender, EStatus } from '@constants/masterData';
import {
  CategoryType,
  EApproachStatus,
  type CustomerApproachDTO,
  type CustomerDTO,
} from '@dtos';
import { MOCK_APPROACH_PLAN, MOCK_CAMPAIGN } from './campaign';
import { getRandomDate, getRandomUser } from './common';
import { USER_SELLER } from './user';

export const MOCK_BRANCHES = [
  'HQ',
  'North Branch',
  'South Branch',
  'East Branch',
  'West Branch',
];
export const MOCK_JOBS = [
  'Engineer',
  'Teacher',
  'Doctor',
  'Business Owner',
  'Student',
  'Designer',
];

export const MOCK_CUSTOMER: CustomerDTO = {
  id: '1',
  code: 'CUST001',
  name: 'John Smith',
  phone: '0123456789',
  email: 'john.smith@example.com',
  gender: EGender.MAN,
  job: 'Engineer',
  birthday: '1990-01-15T00:00:00Z',
  address: '123 Main St, New York, NY 10001',
  identityNumber: 'ID123456789',
  hobbies: 'Sports',
  branch: 'HQ',
  description: 'VIP Customer',
  categoryId: '1',
  category: {
    id: '1',
    name: 'VIP',
    code: 'VIP',
    status: EStatus.ACTIVE,
    categoryTypeCode: CategoryType.PRODUCT,
    createdDate: '',
    createdBy: '',
    updatedDate: '',
    updatedBy: '',
  },
  group: {
    id: '1',
    name: 'Platinum',
    code: 'PLT',
    status: EStatus.ACTIVE,
    createdDate: '',
    createdBy: '',
    updatedDate: '',
    updatedBy: '',
  },
  segment: {
    id: '1',
    name: 'High Value',
    code: 'HV',
    status: EStatus.ACTIVE,
    createdDate: '',
    createdBy: '',
    updatedDate: '',
    updatedBy: '',
  },
  createdDate: getRandomDate(),
  createdBy: getRandomUser(),
  updatedDate: getRandomDate(),
  updatedBy: getRandomUser(),
  status: EStatus.ACTIVE,
  campaign: MOCK_CAMPAIGN,
  seller: USER_SELLER,
  campaignId: MOCK_CAMPAIGN.id,
  campaignName: MOCK_CAMPAIGN.name,
  identification: '',
};

export const MOCK_CUSTOMER_APPROACH: CustomerApproachDTO = {
  id: '1',
  customer: MOCK_CUSTOMER,
  createdDate: getRandomDate(),
  createdBy: getRandomUser(),
  updatedDate: getRandomDate(),
  updatedBy: getRandomUser(),
  rating: 0,
  status: EApproachStatus.INPROGRESS,
  approachPlan: MOCK_APPROACH_PLAN,
  seller: USER_SELLER,
  scenario: MOCK_APPROACH_PLAN.scenario,
  note: 'Note',
  result: MOCK_APPROACH_PLAN.scenario?.attributes?.map((attr) => ({
    attribute: attr,
    value: 'Value',
    id: '1',
    createdBy: getRandomUser(),
    createdDate: getRandomDate(),
    updatedBy: getRandomUser(),
    updatedDate: getRandomDate(),
    status: EStatus.ACTIVE,
  })),
};

export const MOCK_CUSTOMER_APPROACHES: CustomerApproachDTO[] =
  MOCK_CAMPAIGN.approachPlans.map((approach) => ({
    ...MOCK_CUSTOMER_APPROACH,
    approachPlan: approach,
    scenario: approach.scenario,
    id: approach.id,
    createdDate: getRandomDate(),
    updatedDate: getRandomDate(),
    result: approach.scenario?.attributes?.map((attr) => ({
      attribute: attr,
      value: 'Value',
      id: '1',
      createdBy: getRandomUser(),
      createdDate: getRandomDate(),
      updatedBy: getRandomUser(),
      updatedDate: getRandomDate(),
      status: EStatus.ACTIVE,
    })),
  }));
