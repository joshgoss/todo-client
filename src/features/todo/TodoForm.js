import { capitalize } from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "../../components";
import { createTodo, priority } from "./todoSlice";

const TodoForm = ({ onCancelClick, onSubmitted, style }) => {
  const dispatch = useDispatch();
  const { register, formState, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      description: "",
      priority: priority.NONE,
      completed: false,
      due_date: null,
    },
  });

  const { isValid, isSubmitting } = formState;

  const onSubmit = async (data) => {
    await dispatch(createTodo(data));
    onSubmitted();
  };
  const formStyle = {
    padding: "15px",
    background: "#f0f0f0",
    borderRadius: "5px",
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={{ ...formStyle, ...style }}>
      <Form.Group>
        <Form.Input
          label="Description"
          placeholder="Description..."
          width={3}
          required
          {...register("description", { required: "This field is required" })}
        />

        <Form.Dropdown
          label="Priority"
          options={Object.keys(priority).map((key) => ({
            text: capitalize(key),
            value: priority[key],
          }))}
          width={3}
          {...register("priority")}
        />

        <Form.Input
          label="Due Date"
          type="date"
          width={3}
          {...register("due_date")}
        />

        <Form.Checkbox label="Completed" {...register("completed")} />
      </Form.Group>

      <Form.Button disabled={isSubmitting || !isValid} primary type="submit">
        Add Todo
      </Form.Button>
      <Form.Button onClick={onCancelClick}>Cancel</Form.Button>
    </Form>
  );
};

export default TodoForm;

TodoForm.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  priority: PropTypes.number,
  completed: PropTypes.bool,
  due_date: PropTypes.string,
  onCancelClick: PropTypes.func,
  onSubmitted: PropTypes.func,
  style: PropTypes.object,
};
