import { Router } from "express";
import { TodosController } from "../todos/controller";
import { TodoRepositoryImplementation } from "../../infraestructure/repositorires/todo.repository.implementation";
import { TodoDatasourceImplementation } from "../../infraestructure/datasource/todo.datasource.implementation";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new TodoDatasourceImplementation();
    const todoRepository = new TodoRepositoryImplementation(datasource);
    const todosController = new TodosController(todoRepository);

    // router.get("/api/todos", (req, res) => todosController.getTodos(req, res));
    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);

    return router;
  }
}
