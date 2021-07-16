import { IPartialUser } from "./ipartial-user";

export interface IPermissionRequest {
  id: number;
  user: IPartialUser;
  startDate: Date;
  endDate: Date;
  description: string;
  acceptanceStatus: number;
  status: number;
}

export enum PermissionRequestAcceptanceStatus{
  WAITING,
  APPROVED,
  REJECTED
}