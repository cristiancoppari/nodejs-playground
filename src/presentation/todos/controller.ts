import type { Request, Response } from "express";

const todos = [
  { id: 1, text: "Todo 1", completedAt: new Date() },
  { id: 2, text: "Todo 2", completedAt: null },
  { id: 3, text: "Todo 3", completedAt: new Date() },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === Number(id));

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "Id is not a number" });
      return;
    }

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) {
      res.status(400).json({ message: "Text is required" });
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "Id is not a number" });
      return;
    }

    const { text, completedAt } = req.body;

    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    // referencia
    todo.text = text || todo.text;
    todo.completedAt =
      completedAt === "null" ? null : new Date(completedAt || todo.completedAt);

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "Id is not a number" });
      return;
    }

    const todo = todos.find((todo) => todo.id === Number(id));

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    // referencia
    // todos.splice(todos.indexOf(todo), 1);

    todos.filter((todo) => todo.id !== Number(id));

    res.json(todo);
  };
}
