import React, { useState, useEffect } from "react";
import WorkOrderForm from "./WorkOrderForm"; // Import your WorkOrderForm component

const ToDoList = ({ onToDoClick }) => {
  const [todos, setTodos] = useState([]);
  const [openedTodo, setOpenedTodo] = useState(null); // State to track the currently opened todo

  useEffect(() => {
    // Load initial todos from local storage or an API
    const savedToDos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedToDos);
  }, []);

  useEffect(() => {
    // Save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleToDoClick = (todo) => {
    setOpenedTodo(todo); // Set the clicked todo as the opened todo
    onToDoClick(todo);
  };

  const handleCloseClick = () => {
    setOpenedTodo(null); // Close the currently opened todo
  };

  return (
    <div className="todo-list">
      <h3>To Do List</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} onClick={() => handleToDoClick(todo)}>
            {todo.job}
          </li>
        ))}
      </ul>
      {openedTodo && (
        <div className="work-order-container">
          <WorkOrderForm
            todo={openedTodo}
            setShowForm={handleCloseClick}
            refetch={() => {}}
            handleFinishWorkOrder={handleCloseClick}
          />
        </div>
      )}
    </div>
  );
};

export default ToDoList;
