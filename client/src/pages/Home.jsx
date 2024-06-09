import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import Slideshow from "../components/Slideshow/Slideshow";
import { GET_TODOS, ADD_TODO, REMOVE_TODO } from "../utils/queries";
import WorkOrderForm from "../components/WorkOrder/WorkOrderForm";
import '../App.css'; // Import the CSS file

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
      <h1 className="home-page-background">
        Welcome to <span style={{ color: 'red' }}>Sundance</span> Lift Maintenance
      </h1>
      <div className="slideshow-container">
        <Slideshow />
        <button onClick={() => navigate("/work-orders")} className="work-orders">
          View Work Orders
        </button>
      </div>
      <div className="todo-container">
        <div className="todo-list">
          <h2>To-Do List</h2>
          <ul>
            {todosData?.todos.map(todo => (
              <li key={todo._id} onClick={() => handleTodoClick(todo)}>
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
            <button onClick={handleAddTodo}>Add To-Do</button>
          </div>
        </div>
        <div className="work-order-form-container">
          {showWorkOrderForm && (
            <WorkOrderForm
              refetch={refetchTodos}
              setShowForm={setShowWorkOrderForm}
              initialJob={selectedTodo?.job}
              handleFinishWorkOrder={handleFinishWorkOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
