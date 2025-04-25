import taskService from "../services/tasksService";
import { NextFunction, Request, Response } from "express";

/**
 * Get all tasks for current user
 */
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await taskService.create(req);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing task
 */
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await taskService.delete(req);
    res.json(task);
  } catch (error) {
    next(error);
  }
};
