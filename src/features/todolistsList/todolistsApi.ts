import { instance } from "common/instance";
import { TaskPriorities } from "common/enums";
import { UpdateDomainTaskModelType } from "./tasksSlice";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<TodolistType>("todo-lists", { title: title });
  },
  deleteTodolist(id: string) {
    return instance.delete<TodolistType>(`todo-lists/${id}`);
  },
  updateTodolist(arg: UpdateTodolistTitleArgType) {
    return instance.put<UpdateTodolistTitleArgType>(`todo-lists/${arg.id}`, {
      title: arg.title,
    });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: RemoveTaskArgType) {
    return instance.delete<TaskType>(
      `todo-lists/${arg.todolistId}/tasks/${arg.taskId}`,
    );
  },
  createTask(arg: AddTaskArgType) {
    return instance.post<TaskType>(`todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
      priority: TaskPriorities.Low,
    });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<TaskType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
};

// Types
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskType = {
  description: string;
  title: string;
  status: boolean;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: boolean;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
};

type GetTasksResponse = TaskType[];

export type AddTaskArgType = {
  title: string;
  todolistId: string;
};

export type UpdateTaskArgType = {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
};

export type RemoveTaskArgType = {
  todolistId: string;
  taskId: string;
};

export type UpdateTodolistTitleArgType = {
  id: string;
  title: string;
};

export const TaskStatuses = {
  InProgress: false,
  Completed: true,
} as const;
