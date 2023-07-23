export interface IUser {
  id?: string;
  name: string;
  lastName: string;
  dni: string;
  email: string;
  password: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  scheduleCategoryId: string;
  roleId: string;
}

export interface IRole {
  id?: string;
  name: string;
}
