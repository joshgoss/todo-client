import "./TodoPage.scss";
import { useState } from "react";
import { Button, Header } from "../../components";
import TodoForm from "./TodoForm";

const TodoPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault();
    setShowAddForm(!showAddForm);
  };

  const handleFormCancelClick = (e) => {
    e.preventDefault();
    setShowAddForm(false);
  };

  return (
    <div className="todo-page">
      <div className="header-bar">
        <Header>My Todos</Header>
        <Button active={showAddForm} onClick={handleAddClick}>
          Add Todo
        </Button>
      </div>

      {showAddForm && <TodoForm onCancelClick={handleFormCancelClick} />}
    </div>
  );
};

export default TodoPage;
