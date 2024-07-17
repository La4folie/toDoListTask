import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);
  let [error, setError] = useState<string | null>(null);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = () => {
    if (title.trim() !== "") {
      setEditMode(false);
      props.onChange(title);
    } else {
      setError("Title is required");
    }
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (e.charCode === 13) {
      activateViewMode();
    }
  };

  return editMode ? (
    <TextField
      id={"outlined-basic"}
      value={title}
      size={"small"}
      variant="outlined"
      onChange={changeTitle}
      onBlur={activateViewMode}
      error={!!error}
      helperText={error}
      onKeyPress={onKeyPressHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
