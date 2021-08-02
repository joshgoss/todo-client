import { capitalize } from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "../../components";
import { createTodo } from "./todoSlice";

const priority = {
  NONE: "none",
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

const TodoForm = ({ onCancelClick }) => {
  const dispatch = useDispatch();
  const { register, formState, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      description: "test",
      priority: priority.NONE,
      completed: true,
      due_date: null,
    },
  });

  const { isValid, isSubmitting } = formState;

  const onSubmit = async (data) => {
    return await dispatch(createTodo(data));
  };
  const formStyle = {
    padding: "15px",
    background: "#f0f0f0",
    borderRadius: "5px",
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
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
};
