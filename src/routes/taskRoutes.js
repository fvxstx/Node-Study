"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const tasksController_1 = require("../controllers/tasksController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// Apply auth middleware to all task routes
router.use(auth_1.authenticateUser);
// Validation rules
const taskValidation = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),
    (0, express_validator_1.body)("description")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),
    (0, express_validator_1.body)("due_date")
        .optional()
        .isISO8601()
        .withMessage("Due date must be a valid date"),
    (0, express_validator_1.body)("status")
        .optional()
        .isIn(["pending", "in_progress", "completed"])
        .withMessage("Status must be one of: pending, in_progress, completed"),
];
// Task routes
router.get("/", tasksController_1.getTasks);
router.get("/:id", tasksController_1.getTaskById);
router.post("/", taskValidation, tasksController_1.createTask);
router.put("/:id", taskValidation, tasksController_1.updateTask);
router.delete("/:id", tasksController_1.deleteTask);
exports.default = router;
