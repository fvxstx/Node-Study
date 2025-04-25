import AppError from "./AppGeneralError";

class NotFoundError extends AppError {
  constructor(message = "Não encontrado") {
    super(message, 404);
  }
}

export default NotFoundError;
