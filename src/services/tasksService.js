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
const NotFoundError_1 = __importDefault(require("../utils/Errors/NotFoundError"));
const express_validator_1 = require("express-validator");
const ValidationError_1 = __importDefault(require("../utils/Errors/ValidationError"));
const taskService = {
    getAll: (req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Query parameters for filtering and pagination
            const { status, limit = 10, page = 1 } = req.query;
            const offset = (parseInt(page) - 1) * parseInt(limit);
            // Build the query
            let query = supabase_1.default
                .from("tasks")
                .select("*")
                .eq("user_id", req.user.id)
                .order("created_at", { ascending: false })
                .range(offset, parseInt(offset) + parseInt(limit) - 1);
            // Add status filter if provided
            if (status) {
                query = query.eq("status", status);
            }
            const { data, error, count } = yield query;
            if (error) {
                throw new Error(error.message);
            }
            return {
                success: true,
                tasks: data,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: count,
                },
            };
        }
        catch (error) {
            console.error("Get tasks error:", error);
            throw new Error("Failed to retrieve tasks");
        }
    }),
    getById: (req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { data, error } = yield supabase_1.default
                .from("tasks")
                .select("*")
                .eq("id", id)
                .eq("user_id", req.user.id)
                .single();
            if (error) {
                throw new NotFoundError_1.default("Task não ecnontrada");
            }
            return {
                success: true,
                task: data,
            };
        }
        catch (error) {
            throw new Error("Failed to retrieve task");
        }
    }),
    create: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new ValidationError_1.default(errors
                .array()
                .map((err) => err.msg)
                .join(", "));
        }
        try {
            const { title, description, due_date, status = "pending" } = req.body;
            const { data, error } = yield supabase_1.default
                .from("tasks")
                .insert([
                {
                    title,
                    description,
                    due_date,
                    status,
                    user_id: req.user.id,
                },
            ])
                .select();
            if (error) {
                throw new ValidationError_1.default(error.message);
            }
            return {
                success: true,
                message: "Task created successfully",
                task: data[0],
            };
        }
        catch (error) {
            console.error("Create task error:", error);
            throw new Error("Failed to create task");
        }
    }),
    update: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            throw new ValidationError_1.default(errors
                .array()
                .map((err) => err.msg)
                .join(", "));
        }
        try {
            const { id } = req.params;
            const { title, description, due_date, status } = req.body;
            // Verify task belongs to user
            const { data: existingTask, error: checkError } = yield supabase_1.default
                .from("tasks")
                .select("*")
                .eq("id", id)
                .eq("user_id", req.user.id)
                .single();
            if (checkError) {
                throw new NotFoundError_1.default("Task não encontrada ou você não tem permissão");
            }
            // Update the task
            const { data, error } = yield supabase_1.default
                .from("tasks")
                .update({
                title,
                description,
                due_date,
                status,
                updated_at: new Date().toISOString(),
            })
                .eq("id", id)
                .eq("user_id", req.user.id)
                .select();
            if (error) {
                throw new ValidationError_1.default(error.message);
            }
            return {
                success: true,
                message: "Task updated successfully",
                task: data[0],
            };
        }
        catch (error) {
            console.error("Create task error:", error);
            throw new Error("Failed to create task");
        }
    }),
    delete: (req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // Verify task belongs to user
            const { data: existingTask, error: checkError } = yield supabase_1.default
                .from("tasks")
                .select("*")
                .eq("id", id)
                .eq("user_id", req.user.id)
                .single();
            if (checkError) {
                throw new NotFoundError_1.default("Task não encontrada ou você não tem permissão");
            }
            // Delete the task
            const { error } = yield supabase_1.default
                .from("tasks")
                .delete()
                .eq("id", id)
                .eq("user_id", req.user.id);
            if (error) {
                throw new ValidationError_1.default(error.message);
            }
            return {
                success: true,
                message: "Task deleted successfully",
            };
        }
        catch (error) {
            throw new Error("Failed to delete task");
        }
    }),
};
exports.default = taskService;
