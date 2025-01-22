import type { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "Id is not a number" });
      return;
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ message: "Text is required" });
      return;
    }

    const newTodo = await prisma.todo.create({
      data: {
        text: createTodoDto!.text,
      },
    });

    res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body });

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "Id is not a number" });
      return;
    }

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: updateTodoDto!.id,
      },
    });

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: updateTodoDto!.id,
      },
      data: updateTodoDto!.values,
    });

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ message: "Id is not a number" });
      return;
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    const deleted = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });

    if (deleted) {
      res.status(200).json({ deleted });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  };
}
