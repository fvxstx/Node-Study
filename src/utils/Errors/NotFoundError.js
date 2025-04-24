const AppError = require("./AppGeneralError");

class NotFoundError extends AppError {
  constructor(message = "Não encontrado") {
    super(message, 404);
  }
}

module.exports = NotFoundError;
