import { IUser } from "./IUser";
import { Request } from "express";

export interface IAuthRequest extends Request {
  user: IUser;
}
