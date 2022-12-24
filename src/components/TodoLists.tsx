import React, { FC } from "react";
import { Todo } from "../todoType";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  editedFC: (id: number) => void;
  deleteTodo: (id: number) => void;
}
const TodoLists: FC<Props> = ({ todos, editedFC, deleteTodo }) => {
  return (
    <div className="todo_list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">User name</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <SingleTodo
              key={todo.id}
              todo={todo}
              editedFC={editedFC}
              deleteTodo={deleteTodo}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoLists;
