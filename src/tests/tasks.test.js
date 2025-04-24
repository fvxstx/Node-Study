const request = require("supertest");
const app = require("../../app");

let authToken;
let taskId;

beforeAll(async () => {
  // Login to get auth token
  const loginRes = await request(app).post("/api/auth/login").send({
    email: "faustomultgamer@gmail.com",
    password: "bentocom",
  });

  authToken = loginRes.body.session.access_token;
});

describe("Tasks API", () => {
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Test Task",
        description: "Test Description",
        status: "pending",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("task");
    taskId = res.body.task.id;
  });

  it("should get all tasks", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("tasks");
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });
});
