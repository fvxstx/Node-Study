import { NextFunction, Request, Response } from "express";
import supabase from "../configs/supabase";
import UnauthorizedError from "../utils/Errors/UnauthorizedError";

/**
 * Authentication middleware to protect routes
 * Verifies JWT token from Authorization header
 */
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authorization token required");
    }

    const token = authHeader.split(" ")[1];

    // Verify the token with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedError("Invalid or expired token");
    }

    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email || "Unknown", // Provide a default email if missing
      name: user.user_metadata?.name || "Unknown", // Provide a default name if missing
      role: user.user_metadata?.role,
    };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    next(error);
  }
};
