import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";
import { Todo } from "@prisma/client";

describe("todo route testing", () => {
  beforeEach(async () => {
    await testServer.start();
  });

  afterEach(async () => {
    testServer.close();
  });

  const todo1 = {
    text: "todo 1",
  };

  const todo2 = {
    text: "todo 2",
  };

  const todo3 = {
    text: "",
  };

  it("should return TODOs /api/todos", async () => {
    await prisma.todo.deleteMany();
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body, status } = await request(testServer.app)
      .get("/api/todos")
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
  });

  it("should return a TODO /api/todos/:id", async () => {
    await prisma.todo.deleteMany();
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body, status } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
    });
  });

  it("should return a 404 not found /api/todos/:id", async () => {
    const { body, status } = await request(testServer.app)
      .get("/api/todos/999")
      .expect(404);

    // expect(status).toBe(400);
    expect(body).toEqual({ error: "findById: Todo not found" });
  });

  it("should return a new TODO /api/todos/", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos/")
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
    });
  });

  it("should return a error new TODO /api/todos/", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos/")
      .send(todo3)
      .expect(400);

    expect(body).toEqual({ message: "Text is required" });
  });

  it("should return an updated TODO /api/todos/:id", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({
        text: "updated todo",
        completedAt: "2023-10-21",
      })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: "updated todo",
      completedAt: "2023-10-21T00:00:00.000Z",
    });
  });

  it("should return a 404 not found /api/todos/:id", async () => {
    const { body, status } = await request(testServer.app)
      .put("/api/todos/999")
      .send({
        text: "updated todo",
      })
      .expect(404);
  });

  it("should delete a TODO /api/todos/:id", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
    });
  });

  it("should return a 404 not found /api/todos/:id", async () => {
    const { body, status } = await request(testServer.app)
      .delete("/api/todos/999")
      .expect(404);

    expect(body).toEqual({ error: "findById: Todo not found" });
  });
});
