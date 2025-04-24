const supabase = require("../configs/supabase");
const { validationResult } = require("express-validator");
const taskService = require("../services/tasksService");

/**
 * Get all tasks for current user
 */
const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAll(req);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single task by ID
 */
const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getById(req);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new task
 */
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.create(req, res);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing task
 */
const updateTask = async (req, res) => {
  try {
    const tasks = await taskService.update(req);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task
 */
const deleteTask = async (req, res) => {
  try {
    const task = await taskService.delete(req);
    res.json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
