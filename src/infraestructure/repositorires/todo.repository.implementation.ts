import { TodoDatasource, TodoRepository } from "../../domain";
import { CreateTodoDto } from "../../domain/dtos/todos/create-todo.dto";
import { TodoEntity } from "../../domain/dtos/todo.entity";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";

export class TodoRepositoryImplementation implements TodoRepository {
  constructor(private readonly datasource: TodoDatasource) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }

  updateById(todoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(todoDto);
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}
