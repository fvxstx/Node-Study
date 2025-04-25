"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const globals_1 = require("@jest/globals");
let authToken = "";
let taskId;
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    // Login to get auth token
    const loginRes = yield (0, supertest_1.default)(app_1.default).post("/api/auth/login").send({
        email: "faustomultgamer@gmail.com",
        password: "bentocom",
    });
    authToken = loginRes.body.session.access_token;
}));
(0, globals_1.describe)("Tasks API", () => {
    (0, globals_1.it)("should create a new task", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
            title: "Test Task",
            description: "Test Description",
            status: "pending",
        });
        (0, globals_1.expect)(res.statusCode).toEqual(201);
        (0, globals_1.expect)(res.body).toHaveProperty("task");
        taskId = res.body.task.id;
    }));
    (0, globals_1.it)("should get all tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get("/api/tasks")
            .set("Authorization", `Bearer ${authToken}`);
        (0, globals_1.expect)(res.statusCode).toEqual(200);
        (0, globals_1.expect)(res.body).toHaveProperty("tasks");
        (0, globals_1.expect)(Array.isArray(res.body.tasks)).toBe(true);
    }));
});
