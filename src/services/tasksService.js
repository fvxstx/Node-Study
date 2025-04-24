const supabase = require("../configs/supabase");
const NotFoundError = require("../utils/Errors/NotFoundError");
const { validationResult } = require("express-validator");
const ValidationError = require("../utils/Errors/ValidationError");

const taskService = {
  getAll: async (req, res) => {
    try {
      // Query parameters for filtering and pagination
      const { status, limit = 10, page = 1 } = req.query;
      const offset = (page - 1) * limit;

      // Build the query
      let query = supabase
        .from("tasks")
        .select("*")
        .eq("user_id", req.user.id)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      // Add status filter if provided
      if (status) {
        query = query.eq("status", status);
      }

      const { data, error, count } = await query;

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
    } catch (error) {
      console.error("Get tasks error:", error);
      throw new Error("Failed to retrieve tasks");
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .eq("user_id", req.user.id)
        .single();

      if (error) {
        throw new NotFoundError("Task não ecnontrada");
      }

      return {
        success: true,
        task: data,
      };
    } catch (error) {
      throw new Error("Failed to retrieve task");
    }
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    try {
      const { title, description, due_date, status = "pending" } = req.body;

      const { data, error } = await supabase
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
        throw new ValidationError(error.message);
      }

      return {
        success: true,
        message: "Task created successfully",
        task: data[0],
      };
    } catch (error) {
      console.error("Create task error:", error);
      throw new Error("Failed to create task");
    }
  },
  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array());
    }

    try {
      const { id } = req.params;
      const { title, description, due_date, status } = req.body;

      // Verify task belongs to user
      const { data: existingTask, error: checkError } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .eq("user_id", req.user.id)
        .single();

      if (checkError) {
        throw new NotFoundError(
          "Task não encontrada ou você não tem permissão"
        );
      }

      // Update the task
      const { data, error } = await supabase
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
        throw new ValidationError(error.message);
      }

      return {
        success: true,
        message: "Task updated successfully",
        task: data[0],
      };
    } catch (error) {
      console.error("Create task error:", error);
      throw new Error("Failed to create task");
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      // Verify task belongs to user
      const { data: existingTask, error: checkError } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .eq("user_id", req.user.id)
        .single();

      if (checkError) {
        throw new NotFoundError(
          "Task não encontrada ou você não tem permissão"
        );
      }

      // Delete the task
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id)
        .eq("user_id", req.user.id);

      if (error) {
        throw new ValidationError(error.message);
      }

      return {
        success: true,
        message: "Task deleted successfully",
      };
    } catch (error) {
      throw new Error("Failed to delete task");
    }
  },
};

module.exports = taskService;
