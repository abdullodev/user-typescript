import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import Button from "@mui/material/Button";

interface Props {
  todo_username: string;
  todo_pass: string;
  edited: boolean;
  errPass: boolean;
  errUser: boolean;
  setTodoUsername: React.Dispatch<React.SetStateAction<string>>;
  setTodoPass: React.Dispatch<React.SetStateAction<string>>;
  setErrPass: Dispatch<SetStateAction<boolean>>;
  setErrUser: Dispatch<SetStateAction<boolean>>;
  handleAdd: (e: React.FormEvent) => void;
}

const TodoForm: FC<Props> = ({
  handleAdd,
  todo_username,
  todo_pass,
  setTodoPass,
  setTodoUsername,
  edited,
  errPass,
  errUser,
  setErrPass,
  setErrUser,
}) => {
  const inputBlur = useRef<HTMLInputElement>(null);

  return (
    <form className="form_box" onSubmit={(e) => handleAdd(e)}>
      <div className="header_todo_form">
        {edited ? <h3>Edit User</h3> : <h3>Add User</h3>}
      </div>
      <div>
        <label htmlFor="todoUsername" className="form-label">
          User name
        </label>
        <input
          className={
            errUser
              ? "form-control form_input input_err"
              : "form-control form_input"
          }
          aria-describedby="emailHelp"
          id="todoUsername"
          type="text"
          // ref={inputBlur}
          value={todo_username}
          onChange={(e) => {
            setTodoUsername(e.target.value);

            if (e.target.value !== "") {
              setErrUser(false);
            } else setErrUser(true);
          }}
          placeholder="User name"
        />
        {errUser ? (
          <span className="err_todo">Sorry you should fill user input</span>
        ) : (
          ""
        )}
      </div>
      <div>
        <label htmlFor="todoPass" className="form-label">
          Password
        </label>
        <input
          ref={inputBlur}
          type="password"
          id="todoPass"
          className={
            errPass
              ? "form-control form_input input_err"
              : "form-control form_input"
          }
          value={todo_pass}
          onChange={(e) => {
            setTodoPass(e.target.value);
            if (e.target.value !== "") {
              setErrPass(false);
            } else setErrPass(true);
          }}
          placeholder="Password"
        />
        {errPass ? (
          <span className="err_todo">Sorry you should fill password input</span>
        ) : (
          ""
        )}
      </div>
      <Button
        type="submit"
        variant="contained"
        size="medium"
        className="form_add_btn"
      >
        {edited ? "Edit User" : "Add User"}
      </Button>
    </form>
  );
};

export default TodoForm;
