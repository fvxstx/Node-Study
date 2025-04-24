const supabase = require("../configs/supabase");
const { validationResult } = require("express-validator");

/**
 * Get all tasks for current user
 */
const getTasks = async (req, res) => {
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
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      tasks: data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
      },
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
    });
  }
};

/**
 * Get a single task by ID
 */
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id)
      .eq("user_id", req.user.id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      task: data,
    });
  } catch (error) {
    console.error("Get task by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve task",
    });
  }
};

/**
 * Create a new task
 */
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
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
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: data[0],
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

/**
 * Update an existing task
 */
const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
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
      return res.status(404).json({
        success: false,
        message: "Task not found or you do not have permission",
      });
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
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      task: data[0],
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};

/**
 * Delete a task
 */
const deleteTask = async (req, res) => {
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
      return res.status(404).json({
        success: false,
        message: "Task not found or you do not have permission",
      });
    }

    // Delete the task
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
