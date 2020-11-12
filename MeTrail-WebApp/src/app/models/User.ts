import { UserRole } from './UserRole';

export class User {
  userId: number;
  token: string;
  role: UserRole;
  fullName: string;
}
