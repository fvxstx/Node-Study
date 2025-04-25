"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppGeneralError_1 = __importDefault(require("./AppGeneralError"));
class ValidationError extends AppGeneralError_1.default {
    constructor(message = "Erro de validação") {
        super(message, 400);
    }
}
exports.default = ValidationError;
