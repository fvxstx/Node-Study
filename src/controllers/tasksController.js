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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const tasksService_1 = __importDefault(require("../services/tasksService"));
/**
 * Get all tasks for current user
 */
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield tasksService_1.default.getAll(req);
        res.json(tasks);
    }
    catch (error) {
        next(error);
    }
});
exports.getTasks = getTasks;
/**
 * Get a single task by ID
 */
const getTaskById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksService_1.default.getById(req);
        res.json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.getTaskById = getTaskById;
/**
 * Create a new task
 */
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksService_1.default.create(req);
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.createTask = createTask;
/**
 * Update an existing task
 */
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield tasksService_1.default.update(req);
        res.json(tasks);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
/**
 * Delete a task
 */
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksService_1.default.delete(req);
        res.json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTask = deleteTask;
