import { FC } from "react";
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";
import { Todo } from "../todoType";

interface Props {
  todo: Todo;
  editedFC: (id: number) => void;
  deleteTodo: (id: number) => void;
}
const SingleTodo: FC<Props> = ({ todo, editedFC, deleteTodo }) => {
  let newId = todo.id.toString().substring(9, todo.id - 1);
  return (
    <tr>
      <td scope="row">{newId}</td>
      <td>{todo.username}</td>
      <td>{todo.password}</td>
      <td className="icon_box">
        <MdModeEdit className="icon" onClick={() => editedFC(todo.id)} />
        <MdDeleteOutline className="icon" onClick={() => deleteTodo(todo.id)} />
      </td>
    </tr>
  );
};

export default SingleTodo;
