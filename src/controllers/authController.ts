import { NextFunction, Request, Response } from "express";
const authService = require("../services/authService");

/**
 * Register a new user
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = await authService.register(req);
    res.status(201).json(auth);
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const login = await authService.login(req);
    res.json(login);
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 */
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const logout = await authService.logout();
    res.json(logout);
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.getCurrentUserProfile(req);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
