import { IUser } from "../IUser";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
