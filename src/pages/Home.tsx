import React, { Dispatch, FC, SetStateAction, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoLists from "../components/TodoLists";
import { Todo } from "../todoType";
import { CgProfile } from "react-icons/cg";
import { AiTwotoneSetting, AiOutlineLogout } from "react-icons/ai";
import { Navigate } from "react-router-dom";

interface Props {
  setToken: Dispatch<SetStateAction<string | null>>;
}
export const Home: FC<Props> = ({ setToken }) => {
  const [todo_username, setTodoUsername] = useState<string>("");
  const [todo_pass, setTodoPass] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [edited, setEdited] = useState<boolean>(false);
  const [indexEdit, setIndexEdit] = useState<number>();
  const [errUser, setErrUser] = useState<boolean>(false);
  const [errPass, setErrPass] = useState<boolean>(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (edited === false) {
      if (todo_pass && todo_username) {
        setTodos([
          ...todos,
          { id: Date.now(), username: todo_username, password: todo_pass },
        ]);
        setErrPass(false);
        setErrUser(false);
        setTodoUsername("");
        setTodoPass("");
      } else if (todo_pass === "" && todo_username !== "") {
        setErrPass(true);
      } else if (todo_pass !== "" && todo_username === "") {
        setErrUser(true);
      } else {
        setErrPass(true);
        setErrUser(true);
      }
    } else {
      let indexOfEditedTodo = todos.findIndex((todo) => todo.id === indexEdit);

      todos[indexOfEditedTodo].username = todo_username;
      todos[indexOfEditedTodo].password = todo_pass;

      if (todo_username && todo_pass) {
        setTodos([...todos]);
        setEdited(false);
        setTodoUsername("");
        setTodoPass("");
        setErrPass(false);
        setErrUser(false);
      }
    }
  };

  const editedFC = (id: number) => {
    setEdited(true);
    const edit = todos.find((todo) => todo.id === id);
    setIndexEdit(id);
    if (edit) {
      setTodoUsername(edit.username);
      setTodoPass(edit.password);
    }
  };

  const deleteTodo = (id: number) => {
    let newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <div className="home_container">
      <nav className="nav">
        <div className="logo_menu">
          <h3>Logo</h3>
        </div>
        <ul className="menu">
          <li className="menu_list">Products</li>
          <li className="user menu_list">
            User
            <ul className="user_profile">
              <li>
                <CgProfile className="user_icon" /> Profile
              </li>
              <li>
                <AiTwotoneSetting className="user_icon" /> Settings
              </li>
              <li onClick={logOut}>
                <AiOutlineLogout className="user_icon" />
                Sign-out
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="home">
        <TodoForm
          handleAdd={handleAdd}
          todo_username={todo_username}
          setTodoUsername={setTodoUsername}
          todo_pass={todo_pass}
          setTodoPass={setTodoPass}
          edited={edited}
          errUser={errUser}
          setErrUser={setErrUser}
          errPass={errPass}
          setErrPass={setErrPass}
        />
        <TodoLists todos={todos} editedFC={editedFC} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};
