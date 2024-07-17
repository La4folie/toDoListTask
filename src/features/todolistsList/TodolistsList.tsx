import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { useAppDispatch } from "common/hooks";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTasks } from "./tasksSlice";
import { Todolist } from "./Todolist/Todolist";
import {
  selectTodolists,
  todolistsThunks,
} from "./todolistsSlice";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todolistsThunks.fetchTodolists());
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.addTodolist(title));
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
          const allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper variant="outlined" sx={{ p: "20px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
