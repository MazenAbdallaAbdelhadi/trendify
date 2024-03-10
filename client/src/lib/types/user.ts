export enum ROLES {
  ADMIN = 1,
  VENDOR = 2,
  CUSTOMER = 3,
}

export type User = {
  name: string;
  email: string;
  role: ROLES;
  profileImage?: string;
  bio?: string;
};
