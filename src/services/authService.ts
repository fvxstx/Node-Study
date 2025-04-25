import { IAuthRequest } from "../types/IValidation";

import supabase from "../configs/supabase";
import { validationResult } from "express-validator";
import ValidationError from "../utils/Errors/ValidationError";

const authService = {
  register: async (req: IAuthRequest) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      );
    }

    try {
      const { email, password, name } = req.body;
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        throw new ValidationError(authError.message);
      }
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user.id,
            name,
            email,
          },
        ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
        }
      }

      return {
        success: true,
        message:
          "Registration successful. Please check your email to confirm your account.",
        user: authData.user,
      };
    } catch (error) {
      console.error("Error during registration:", error);
      throw new ValidationError("Registration failed. Please try again.");
    }
  },
  login: async (req: IAuthRequest) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      );
    }

    try {
      const { email, password } = req.body;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new ValidationError(error.message);
      }

      return {
        success: true,
        message: "Login successful",
        session: data.session,
        user: data.user,
      };
    } catch (error) {
      console.error("Error during login:", error);
      throw new ValidationError("Login failed. Please try again.");
    }
  },
  getCurrentUserProfile: async (req: IAuthRequest) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", req.user.id)
        .single();

      if (error) {
        throw new Error("User profile not found");
      }

      return {
        success: true,
        profile: data,
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw new ValidationError("Failed to fetch user profile.");
    }
  },
  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new ValidationError(error.message);
      }

      return {
        success: true,
        message: "Logout successful",
      };
    } catch (error) {
      console.error("Error during logout:", error);
      throw new ValidationError("Logout failed. Please try again.");
    }
  },
};

module.exports = authService;
