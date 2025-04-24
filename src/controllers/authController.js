const supabase = require("../configs/supabase");
const { validationResult } = require("express-validator");
const authService = require("../services/authService");

/**
 * Register a new user
 */
const registerUser = async (req, res, next) => {
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
const loginUser = async (req, res, next) => {
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
const logoutUser = async (req, res, next) => {
  try {
    const logout = await authService.logout(req);
    res.json(logout);
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUserProfile(req);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
