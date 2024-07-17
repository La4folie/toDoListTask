import React, { ChangeEvent, useCallback } from "react";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "common/components";
import { TaskType } from "../../todolistsApi";
import { TaskPriorities } from "common/enums";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  changeTaskStatus: (id: string, status: boolean, todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string,
  ) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskPriorities: (
    taskId: string,
    priority: TaskPriorities,
    todolistId: string,
  ) => void;
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
  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props],
  );

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    },
    [props],
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },
    [props],
  );
  const onPriorityChangeHandler = useCallback(
    (priority: TaskPriorities) => {
      props.changeTaskPriorities(props.task.id, priority, props.todolistId);
    },
    [props],
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
