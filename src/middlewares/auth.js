const supabase = require("../configs/supabase");
const UnauthorizedError = require("../utils/Errors/UnauthorizedError");

/**
 * Authentication middleware to protect routes
 * Verifies JWT token from Authorization header
 */
const authenticateUser = async (req, res, next) => {
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

    if (error) {
      throw new UnauthorizedError("Invalid or expired token");
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    next(error);
  }
};

module.exports = { authenticateUser };
