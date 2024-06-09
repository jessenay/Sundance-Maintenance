import React, { useState, useEffect } from "react";

const ToDoList = ({ onToDoClick }) => {
  const [todos, setTodos] = useState([]);

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
    onToDoClick(todo);
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
    </div>
  );
};

export default ToDoList;
