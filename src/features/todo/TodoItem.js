import "./TodoItem.scss";
import { capitalize } from "lodash";
import PropTypes from "prop-types";
import { priority } from "./todoSlice";

const priorityColor = {
  [priority.NONE]: "#bbb",
  [priority.LOW]: "#22dee8",
  [priority.MEDIUM]: "#2f6ae0",
  [priority.HIGH]: "#ea2323",
};

const TodoItem = (props) => {
  const style = {
    borderLeft: `10px solid ${priorityColor[props.priority]}`,
  };

  return (
    <div className="todo-item" style={style}>
      <h3 className="description">{capitalize(props.description)}</h3>

      <div className="body group">
        <p className="field">
          <span>Priority: </span> {props.priority}
        </p>

        {!!props.due_date && (
          <p className="field">
            <span>Due Date: </span>
            {props.due_date}
          </p>
        )}

        <p className="created-at">{props.created_at}</p>
      </div>
    </div>
  );
};

export default TodoItem;

TodoItem.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  priority: PropTypes.string,
  due_date: PropTypes.string,
  completed: PropTypes.bool,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};
