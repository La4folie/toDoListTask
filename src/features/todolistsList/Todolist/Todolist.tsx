import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { AddItemForm, EditableSpan } from "common/components";
import { useAppDispatch } from "common/hooks";
import React, { useCallback, useEffect } from "react";
import { tasksThunks } from "../tasksSlice";
import { TaskStatuses, TaskType } from "../todolistsApi";
import { FilterValuesType, TodolistDomainType } from "../todolistsSlice";
import { Task } from "./Task/Task";
import { TaskPriorities } from "common/enums";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: boolean, todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string,
  ) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  changeTaskPriorities: (
    taskId: string,
    priority: TaskPriorities,
    todolistId: string,
  ) => void;
};

export const Todolist = React.memo(function (props: PropsType) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props],
  );

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id);
  };

  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    },
    [props],
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.todolist.id),
    [props],
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.todolist.id),
    [props],
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.todolist.id),
    [props],
  );

  const tasksForTodolist = React.useMemo(() => {
    if (props.todolist.filter === "active") {
      return props.tasks.filter((t) => t.status === TaskStatuses.InProgress);
    }
    if (props.todolist.filter === "completed") {
      return props.tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    return props.tasks;
  }, [props.tasks, props.todolist.filter]);

  const sortedTasksByPriority = React.useMemo(
    () => tasksForTodolist.toSorted((a, b) => b.priority - a.priority),
    [tasksForTodolist],
  );

  return (
    <div>
      <h3>
        <EditableSpan
          value={props.todolist.title}
          onChange={changeTodolistTitle}
        />
        <IconButton
          onClick={removeTodolist}
          disabled={props.todolist.entityStatus === "loading"}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTask}
        disabled={props.todolist.entityStatus === "loading"}
      />
      <div style={{ paddingTop: "15px" }}>
        {sortedTasksByPriority?.map((t) => (
          <Task
            key={t.id}
            task={t}
            todolistId={props.todolist.id}
            removeTask={props.removeTask}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskPriorities={props.changeTaskPriorities}
          />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={props.todolist.filter === "all" ? "outlined" : "text"}
          onClick={onAllClickHandler}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={props.todolist.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.todolist.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
