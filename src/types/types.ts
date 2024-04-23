
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  lastLoginDate: string;
  registrationDate: string;
  isBlocked: boolean;
}
