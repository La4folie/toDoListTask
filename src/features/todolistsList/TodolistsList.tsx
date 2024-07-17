import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { useAppDispatch } from "common/hooks";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTasks, tasksThunks } from "./tasksSlice";
import { Todolist } from "./Todolist/Todolist";
import {
  FilterValuesType,
  selectTodolists,
  todolistsActions,
  todolistsThunks,
} from "./todolistsSlice";
import { TaskPriorities } from "common/enums";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todolistsThunks.fetchTodolists());
  }, []);

  const removeTask = useCallback(
    function (taskId: string, todolistId: string) {
      dispatch(tasksThunks.removeTask({ taskId, todolistId }));
    },
    [dispatch],
  );

  const addTask = useCallback(
    function (title: string, todolistId: string) {
      dispatch(tasksThunks.addTask({ title, todolistId }));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    function (taskId: string, status: boolean, todolistId: string) {
      dispatch(
        tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }),
      );
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    function (taskId: string, title: string, todolistId: string) {
      dispatch(
        tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }),
      );
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    function (filter: FilterValuesType, id: string) {
      dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    function (id: string) {
      dispatch(todolistsThunks.removeTodolist(id));
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      dispatch(todolistsThunks.changeTodolistTitle({ id, title }));
    },
    [dispatch],
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.addTodolist(title));
    },
    [dispatch],
  );

  const changePriority = useCallback(
    function (taskId: string, priority: TaskPriorities, todolistId: string) {
      dispatch(
        tasksThunks.updateTask({
          taskId,
          domainModel: { priority },
          todolistId,
        }),
      );
    },
    [dispatch],
  );

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper variant="outlined" sx={{ p: "20px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  changeTaskPriorities={changePriority}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
