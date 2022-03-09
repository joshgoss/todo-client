import "./TodoPage.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Header, Search, Spinner } from "../../components";
import { fetchTodos } from "./todoSlice";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    return state.todos.data.filter((t) => {
      if (
        searchTerm &&
        !(t.description.toUpperCase().indexOf(searchTerm.toUpperCase()) >= 0)
      ) {
        return false;
      }
      if (t.completed !== completed) {
        return false;
      }

      return true;
    });
  });

  useEffect(() => {
    setCompleted(false);
    setSearchTerm("");
    setLoading(true);
    dispatch(fetchTodos());
    setLoading(false);
  }, [dispatch, setCompleted, setSearchTerm]);

  const handleAddClick = (e) => {
    e.preventDefault();
    setShowAddForm(!showAddForm);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchTerm(text);
  };

  const handleButtonGroupChange = (v) => {
    setCompleted(v);
  };

  return (
    <div className="todo-page">
      <div className="header-bar">
        <Header>My Todos</Header>
        <Button active={showAddForm} icon="plus" onClick={handleAddClick}>
          Add Todo
        </Button>
      </div>

      {showAddForm && (
        <TodoForm
          onCancelClick={handleCloseForm}
          onSubmitted={handleCloseForm}
          style={{ marginBottom: "20px" }}
        />
      )}

      <section className="filter-bar">
        <Search onChange={handleSearchChange} />
        <ButtonGroup
          buttons={[
            { value: false, text: "Incomplete" },
            { value: true, text: "Complete" },
          ]}
          onChange={handleButtonGroupChange}
          selected={completed}
        />
      </section>

      {loading ? (
        <Spinner visible={loading} />
      ) : (
        <section>
          <TodoList todos={todos} />
        </section>
      )}
    </div>
  );
};

export default TodoPage;
