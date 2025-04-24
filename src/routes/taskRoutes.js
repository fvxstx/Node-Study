const express = require("express");
const { body } = require("express-validator");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");
const { authenticateUser } = require("../middlewares/auth");

const router = express.Router();

// Apply auth middleware to all task routes
router.use(authenticateUser);

// Validation rules
const taskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("due_date")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date"),
  body("status")
    .optional()
    .isIn(["pending", "in_progress", "completed"])
    .withMessage("Status must be one of: pending, in_progress, completed"),
];

// Task routes
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", taskValidation, createTask);
router.put("/:id", taskValidation, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
