import React, { ChangeEvent, useCallback } from "react";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskType } from "../../todolistsApi";
import { TaskPriorities } from "common/enums";
import { tasksThunks } from "features/todolistsList/tasksSlice";
import { useAppDispatch } from "common/hooks";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

const circleButtonStyles = {
  width: "15px",
  height: "15px",
  borderRadius: "100%",
  minWidth: "15px",
  margin: "0 3px",
  padding: "0",
};

const priorityStyles = {
  low: {
    backgroundColor: "yellow",
  },
  middle: {
    backgroundColor: "orange",
  },
  high: {
    backgroundColor: "red",
  },
};

export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useAppDispatch();

  const onClickHandler = useCallback(
    () =>
      dispatch(
        tasksThunks.removeTask({
          taskId: props.task.id,
          todolistId: props.todolistId,
        }),
      ),
    [dispatch, props.task.id, props.todolistId],
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      dispatch(
        tasksThunks.updateTask({
          taskId: props.task.id,
          domainModel: { status: newIsDoneValue },
          todolistId: props.todolistId,
        }),
      );
    },
    [dispatch, props.task.id, props.todolistId],
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      dispatch(
        tasksThunks.updateTask({
          taskId: props.task.id,
          domainModel: { title: newValue },
          todolistId: props.todolistId,
        }),
      );
    },
    [dispatch, props.task.id, props.todolistId],
  );

  const onPriorityChangeHandler = useCallback(
    (priority: TaskPriorities) => {
      dispatch(
        tasksThunks.updateTask({
          taskId: props.task.id,
          domainModel: { priority },
          todolistId: props.todolistId,
        }),
      );
    },
    [dispatch, props.task.id, props.todolistId],
  );

  return (
    <div
      key={props.task.id}
      style={{ display: "flex", alignItems: "center" }}
      className={props.task.status ? "is-done" : ""}
    >
      <Checkbox
        checked={props.task.status}
        color="primary"
        onChange={onChangeHandler}
      />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <div style={{ paddingLeft: "10px" }}>
        <Button
          style={{
            ...circleButtonStyles,
            ...priorityStyles.low,
            border:
              props.task.priority === TaskPriorities.Low
                ? "3px solid #367fc8"
                : "none",
          }}
          onClick={() => onPriorityChangeHandler(TaskPriorities.Low)}
        />
        <Button
          style={{
            ...circleButtonStyles,
            ...priorityStyles.middle,
            border:
              props.task.priority === TaskPriorities.Middle
                ? "3px solid #367fc8"
                : "none",
          }}
          onClick={() => onPriorityChangeHandler(TaskPriorities.Middle)}
        />
        <Button
          style={{
            ...circleButtonStyles,
            ...priorityStyles.high,
            border:
              props.task.priority === TaskPriorities.High
                ? "3px solid #367fc8"
                : "none",
          }}
          onClick={() => onPriorityChangeHandler(TaskPriorities.High)}
        />
      </div>
      <IconButton onClick={onClickHandler} size={"small"}>
        <Delete />
      </IconButton>
    </div>
  );
});
