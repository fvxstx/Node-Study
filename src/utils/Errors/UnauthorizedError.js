"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppGeneralError_1 = __importDefault(require("./AppGeneralError"));
class UnauthorizedError extends AppGeneralError_1.default {
    constructor(message = "Não autorizado") {
        super(message, 401);
    }
}
exports.default = UnauthorizedError;
