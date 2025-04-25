import AppError from "./AppGeneralError";

class ValidationError extends AppError {
  constructor(message = "Erro de validação") {
    super(message, 400);
  }
}

export default ValidationError;
