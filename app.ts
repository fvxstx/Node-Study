import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/configs/swagger";

require("dotenv").config();

import authRoutes from "./src/routes/authRoutes";
import taskRoutes from "./src/routes/taskRoutes";

// Initialize express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Health check endpoint
app.get("/health", (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
interface ErrorWithStatus extends Error {
  statusCode?: number;
}

app.use(
  (
    err: ErrorWithStatus,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    const status = err.statusCode || 500;
    res.status(status).json({
      success: false,
      message: err.message || "Something went wrong!",
    });
  }
);

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

export default app;
