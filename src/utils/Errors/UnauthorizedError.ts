import AppError from "./AppGeneralError";

class UnauthorizedError extends AppError {
  constructor(message = "Não autorizado") {
    super(message, 401);
  }
}

export default UnauthorizedError;
