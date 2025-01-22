import type { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain/repositories/todo.repository";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await this.todoRepository.findById(Number(id));
      res.json(todo);
    } catch (error) {
      res.status(400).json({ message: "Todo not found or invalid id" });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) {
      res.status(400).json({ message: "Text is required" });
      return;
    }

    const newTodo = await this.todoRepository.create(createTodoDto!);

    res.status(201).json(newTodo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body });

    if (error) {
      res.status(400).json({ message: error });
      return;
    }

    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!);

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedTodo = await this.todoRepository.deleteById(Number(id));
    res.json(deletedTodo);
  };
}
