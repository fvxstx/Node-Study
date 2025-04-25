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
exports.authenticateUser = void 0;
const supabase_1 = __importDefault(require("../configs/supabase"));
const UnauthorizedError_1 = __importDefault(require("../utils/Errors/UnauthorizedError"));
/**
 * Authentication middleware to protect routes
 * Verifies JWT token from Authorization header
 */
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Get the token from the authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError_1.default("Authorization token required");
        }
        const token = authHeader.split(" ")[1];
        // Verify the token with Supabase
        const { data: { user }, error, } = yield supabase_1.default.auth.getUser(token);
        if (error || !user) {
            throw new UnauthorizedError_1.default("Invalid or expired token");
        }
        // Add user to request object
        req.user = {
            id: user.id,
            email: user.email || "Unknown", // Provide a default email if missing
            name: ((_a = user.user_metadata) === null || _a === void 0 ? void 0 : _a.name) || "Unknown", // Provide a default name if missing
            role: (_b = user.user_metadata) === null || _b === void 0 ? void 0 : _b.role,
        };
        next();
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        next(error);
    }
});
exports.authenticateUser = authenticateUser;
