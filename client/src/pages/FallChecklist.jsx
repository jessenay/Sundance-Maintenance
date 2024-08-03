import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_FALL_TASKS, ADD_FALL_TASK, TOGGLE_FALL_TASK, UNCHECK_ALL_FALL_TASKS, DELETE_FALL_TASK } from '../utils/queries';
import { FaTrashAlt } from 'react-icons/fa';
import AuthService from '../utils/auth';
import './WinterChecklist.css';

const FallChecklist = () => {
  const [newTask, setNewTask] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [initials, setInitials] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');
  const [taskToComplete, setTaskToComplete] = useState(null);

  const { data, refetch } = useQuery(GET_FALL_TASKS);
  const [addTask] = useMutation(ADD_FALL_TASK, {
    onCompleted: () => {
      setNewTask('');
      refetch();
    }
  });
  const [toggleTask] = useMutation(TOGGLE_FALL_TASK, {
    onCompleted: () => refetch()
  });
  const [uncheckAllTasks] = useMutation(UNCHECK_ALL_FALL_TASKS, {
    onCompleted: () => {
      setShowConfirmation(false);
      refetch();
    }
  });
  const [deleteTask] = useMutation(DELETE_FALL_TASK, {
    onCompleted: () => {
      setShowDeleteConfirmation(false);
      refetch();
    }
  });

  const isAdmin = AuthService.loggedIn() && AuthService.getProfile().data.role === 'admin';

  const handleAddTask = () => {
    if (newTask) {
      addTask({ variables: { name: newTask } });
    }
  };

  const handleToggleTask = (taskId, completed) => {
    if (completed) {
      toggleTask({ variables: { _id: taskId, initials: '', dateCompleted: '' } });
    } else {
      setTaskToComplete(taskId);
    }
  };

  const handleCompleteTask = () => {
    if (initials && dateCompleted) {
      toggleTask({ variables: { _id: taskToComplete, initials, dateCompleted } });
      setInitials('');
      setDateCompleted('');
      setTaskToComplete(null);
    } else {
      alert('Please enter your initials and select a date.');
    }
  };

  const handleUncheckAll = () => {
    uncheckAllTasks();
  };

  const handleDeleteTask = (taskId) => {
    setDeleteTaskId(taskId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTask = () => {
    deleteTask({ variables: { _id: deleteTaskId } });
    setDeleteTaskId(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="winter-checklist-page">
      <h1>Fall Checklist</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add New Task</button>
      </div>
      <ul className="task-list">
        {data?.fallTasks.map(task => (
          <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task._id, task.completed)}
              />
              {task.name}
            </label>
            {task.completed && (
              <span className="task-details">
                {task.initials} - {formatDate(task.dateCompleted)}
              </span>
            )}
            {isAdmin && (
              <span className="checklist-delete-icon" onClick={() => handleDeleteTask(task._id)}>
                <FaTrashAlt />
              </span>
            )}
          </li>
        ))}
      </ul>
      <button className="uncheck-button" onClick={() => setShowConfirmation(true)}>Uncheck All Tasks</button>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to uncheck all tasks?</p>
          <button onClick={handleUncheckAll}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={confirmDeleteTask}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      )}
      {taskToComplete && (
        <div className="confirmation-dialog">
          <p>Please enter your initials and the date:</p>
          <input
            type="text"
            placeholder="Initials"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
          />
          <input
            type="date"
            value={dateCompleted}
            onChange={(e) => setDateCompleted(e.target.value)}
          />
          <button onClick={handleCompleteTask}>Confirm</button>
          <button onClick={() => setTaskToComplete(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FallChecklist;
