import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

import "./TodoList.scss";

const TodoList = ({ todos }) => {
  const items = todos.map((t) => <TodoItem key={t.id} {...t} />);

  return (
    <>
      <section className="todo-list">
        <div className="todo-list-item">{items}</div>
      </section>
    </>
  );
};

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.array,
};
