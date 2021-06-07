export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  roles: {permissions: string}[]
}
