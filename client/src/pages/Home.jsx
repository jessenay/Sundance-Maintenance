import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import Slideshow from "../components/Slideshow/Slideshow";
import { GET_TODOS, ADD_TODO, REMOVE_TODO } from "../utils/queries";
import WorkOrderForm from "../components/WorkOrder/WorkOrderForm";
import "./Home.css";
import "../components/ToDoList/ToDoList.css";

const Home = () => {
  const navigate = useNavigate();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showWorkOrderForm, setShowWorkOrderForm] = useState(false);
  const [newJob, setNewJob] = useState("");

  const { data: todosData, refetch: refetchTodos } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => {
      setNewJob("");
      refetchTodos();
    }
  });
  const [removeTodo] = useMutation(REMOVE_TODO, {
    onCompleted: () => {
      setSelectedTodo(null);
      refetchTodos();
    }
  });

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddTodo = () => {
    if (newJob) {
      addTodo({
        variables: { job: newJob }
      });
    }
  };

  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    setShowWorkOrderForm(true);
  };

  const handleFinishWorkOrder = () => {
    removeTodo({
      variables: { _id: selectedTodo._id }
    });
    setShowWorkOrderForm(false);
  };

  return (
    <div className="home-page">
      <Slideshow />
      <div className="home-overlay">
        <h1 className="home-page-background">
          Welcome to <span className="highlight">Sundance</span> Lift Maintenance
        </h1>
        <div className="content-container">
          <div className="todo-container">
            <div className="todo-list">
              <h2 className="todo-title">To-Do List</h2>
              <ul className="todo-items">
                {todosData?.todos.map(todo => (
                  <li key={todo._id} className="todo-item" onClick={() => handleTodoClick(todo)}>
                    {todo.job}
                  </li>
                ))}
              </ul>
              <div className="add-todo">
                <input
                  type="text"
                  placeholder="New job"
                  value={newJob}
                  onChange={(e) => setNewJob(e.target.value)}
                />
                <button onClick={handleAddTodo} className="add-todo-button">Add To-Do</button>
              </div>
              {showWorkOrderForm && (
                <div className="work-order-form-container">
                  <WorkOrderForm
                    refetch={refetchTodos}
                    setShowForm={setShowWorkOrderForm}
                    initialJob={selectedTodo?.job}
                    handleFinishWorkOrder={handleFinishWorkOrder}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="buttons-container">
            <button onClick={() => navigate("/work-orders")} className="maintNav-buttons">
              View Work Orders
            </button>
            <button onClick={() => navigate("/winter-checklist")} className="maintNav-buttons">
              Winter Checklist
            </button>
            <button onClick={() => navigate("/spring-checklist")} className="maintNav-buttons">
              Spring Checklist
            </button>
            <button onClick={() => navigate("/work-orders")} className="maintNav-buttons">
              Summer Checklist
            </button>
            <button onClick={() => navigate("/work-orders")} className="maintNav-buttons">
              Fall Checklist
            </button>
            <button onClick={() => navigate("/work-orders")} className="maintNav-buttons">
              Parts Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
