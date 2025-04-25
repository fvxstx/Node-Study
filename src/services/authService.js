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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = __importDefault(require("../configs/supabase"));
const express_validator_1 = require("express-validator");
const ValidationError_1 = __importDefault(require("../utils/Errors/ValidationError"));
const authService = {
    register: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new ValidationError_1.default(errors
                .array()
                .map((err) => err.msg)
                .join(", "));
        }
        try {
            const { email, password, name } = req.body;
            const { data: authData, error: authError } = yield supabase_1.default.auth.signUp({
                email,
                password,
            });
            if (authError) {
                throw new ValidationError_1.default(authError.message);
            }
            if (authData.user) {
                const { error: profileError } = yield supabase_1.default.from("profiles").insert([
                    {
                        id: authData.user.id,
                        name,
                        email,
                    },
                ]);
                if (profileError) {
                    console.error("Error creating profile:", profileError);
                }
            }
            return {
                success: true,
                message: "Registration successful. Please check your email to confirm your account.",
                user: authData.user,
            };
        }
        catch (error) {
            console.error("Error during registration:", error);
            throw new ValidationError_1.default("Registration failed. Please try again.");
        }
    }),
    login: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new ValidationError_1.default(errors
                .array()
                .map((err) => err.msg)
                .join(", "));
        }
        try {
            const { email, password } = req.body;
            const { data, error } = yield supabase_1.default.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                throw new ValidationError_1.default(error.message);
            }
            return {
                success: true,
                message: "Login successful",
                session: data.session,
                user: data.user,
            };
        }
        catch (error) {
            console.error("Error during login:", error);
            throw new ValidationError_1.default("Login failed. Please try again.");
        }
    }),
    getCurrentUserProfile: (req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase_1.default
                .from("profiles")
                .select("*")
                .eq("id", req.user.id)
                .single();
            if (error) {
                throw new Error("User profile not found");
            }
            return {
                success: true,
                profile: data,
            };
        }
        catch (error) {
            console.error("Error fetching user profile:", error);
            throw new ValidationError_1.default("Failed to fetch user profile.");
        }
    }),
    logout: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { error } = yield supabase_1.default.auth.signOut();
            if (error) {
                throw new ValidationError_1.default(error.message);
            }
            return {
                success: true,
                message: "Logout successful",
            };
        }
        catch (error) {
            console.error("Error during logout:", error);
            throw new ValidationError_1.default("Logout failed. Please try again.");
        }
    }),
};
module.exports = authService;
