import type { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";
import {
  GetTodo,
  GetTodos,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
  CustomError,
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  private handleError(res: Response, error: unknown) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public getTodos = async (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => this.handleError(res, error));
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    new GetTodo(this.todoRepository)
      .execute(Number(id))
      .then((todo) => res.status(200).json(todo))
      .catch((error) => this.handleError(res, error));
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ message: "Text is required" });
      return;
    }

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => this.handleError(res, error));
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body });

    if (error) {
      res.status(400).json({ error });
      return;
    }

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.status(200).json(todo))
      .catch((error) => this.handleError(res, error));
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;

    new DeleteTodo(this.todoRepository)
      .execute(Number(id))
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error));
  };
}
