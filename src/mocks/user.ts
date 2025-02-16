import { ERole } from '@constants/masterData';
import type { UserDTO } from '@dtos';

export const USER_ADMIN = {
  id: '1',
  name: 'Test User',
  email: 'email',
  role: ERole.ADMIN,
};

export const USER_SELLER: UserDTO = {
  id: '2',
  email: 'seller@test.com',
  fullName: 'John Doe',
  role: ERole.SELLER,
  createdDate: '2024-01-01T00:00:00Z',
  createdBy: 'system',
  updatedDate: '2024-01-01T00:00:00Z',
  updatedBy: 'system',
  username: 'seller_test',
  status: 'active',
  firstName: 'John',
  lastName: 'Doe',
  phoneNum: '0123456789',
  department: 'Sales',
  position: 'Senior Sales Representative',
  branch: 'Main Branch',
  expertise: 'Product Sales',
};
