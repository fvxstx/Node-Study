"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const authService = require("../services/authService");
/**
 * Register a new user
 */
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = yield authService.register(req);
        res.status(201).json(auth);
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
/**
 * Login user
 */
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = yield authService.login(req);
        res.json(login);
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
/**
 * Logout user
 */
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logout = yield authService.logout();
        res.json(logout);
    }
    catch (error) {
        next(error);
    }
});
exports.logoutUser = logoutUser;
/**
 * Get current user profile
 */
const getCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authService.getCurrentUserProfile(req);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getCurrentUser = getCurrentUser;
