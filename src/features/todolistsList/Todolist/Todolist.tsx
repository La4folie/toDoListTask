import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { AddItemForm, EditableSpan } from "common/components";
import { useAppDispatch } from "common/hooks";
import React, { useCallback, useEffect } from "react";
import { tasksThunks } from "../tasksSlice";
import { TaskStatuses, TaskType } from "../todolistsApi";
import {
  TodolistDomainType,
  todolistsActions,
  todolistsThunks,
} from "../todolistsSlice";
import { Task } from "./Task/Task";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(function (props: PropsType) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id));
  }, []);

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.addTask({ title, todolistId: props.todolist.id }));
    },
    [dispatch, props.todolist.id],
  );

  const removeTodolist = () =>
    dispatch(todolistsThunks.removeTodolist(props.todolist.id));

  const changeTodolistTitle = useCallback(
    (title: string) => {
      dispatch(
        todolistsThunks.changeTodolistTitle({ id: props.todolist.id, title }),
      );
    },
    [dispatch, props.todolist.id],
  );

  const onAllClickHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.changeTodolistFilter({
          id: props.todolist.id,
          filter: "all",
        }),
      ),
    [dispatch, props.todolist.id],
  );
  const onActiveClickHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.changeTodolistFilter({
          id: props.todolist.id,
          filter: "active",
        }),
      ),
    [dispatch, props.todolist.id],
  );
  const onCompletedClickHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.changeTodolistFilter({
          id: props.todolist.id,
          filter: "completed",
        }),
      ),
    [dispatch, props.todolist.id],
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
          <Task key={t.id} task={t} todolistId={props.todolist.id} />
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
