"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// Validation rules
const registerValidation = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Please provide a valid email"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
];
const loginValidation = [
    (0, express_validator_1.body)("email").isEmail().withMessage("Please provide a valid email"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
// Auth routes
router.post("/register", registerValidation, authController_1.registerUser);
router.post("/login", loginValidation, authController_1.loginUser);
router.post("/logout", auth_1.authenticateUser, authController_1.logoutUser);
router.get("/me", auth_1.authenticateUser, authController_1.getCurrentUser);
exports.default = router;
