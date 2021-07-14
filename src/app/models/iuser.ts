import { IRole } from "./irole";

export interface IUser {
  id: number;
  username:string;
  firstName: string;
  lastName: string;
  email: string;
  hireDate: Date;
  roles: IRole[];
}
