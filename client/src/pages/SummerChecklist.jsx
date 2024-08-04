import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SUMMER_TASKS, ADD_SUMMER_TASK, TOGGLE_SUMMER_TASK, UNCHECK_ALL_SUMMER_TASKS, DELETE_SUMMER_TASK } from '../utils/queries';
import { handleFormSubmit as handleSubmitUtility } from '../utils/submitHandler';
import { FaTrashAlt } from 'react-icons/fa';
import AuthService from '../utils/auth';
import './WinterChecklist.css';

const SummerChecklist = () => {
  const [newTask, setNewTask] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [initials, setInitials] = useState('');
  const [dateCompleted, setDateCompleted] = useState('');
  const [taskToComplete, setTaskToComplete] = useState(null);

  const { data, refetch } = useQuery(GET_SUMMER_TASKS);
  const [addTask] = useMutation(ADD_SUMMER_TASK, {
    onCompleted: () => {
      setNewTask('');
      refetch();
    }
  });
  const [toggleTask] = useMutation(TOGGLE_SUMMER_TASK, {
    onCompleted: () => refetch()
  });
  const [uncheckAllTasks] = useMutation(UNCHECK_ALL_SUMMER_TASKS, {
    onCompleted: () => {
      setShowConfirmation(false);
      refetch();
    }
  });
  const [deleteTask] = useMutation(DELETE_SUMMER_TASK, {
    onCompleted: () => {
      setShowDeleteConfirmation(false);
      refetch();
    }
  });

  const isAdmin = AuthService.loggedIn() && AuthService.getProfile().data.role === 'admin';

  const handleAddTask = async () => {
    if (newTask) {
      const formData = { name: newTask };
      const query = `
        mutation AddSummerTask($name: String!) {
          addSummerTask(name: $name) {
            _id
          }
        }
      `;
      await handleSubmitUtility('/graphql', query, formData);
      setNewTask(''); // Clear the text box
      refetch();
    }
  };

  const handleToggleTask = async (taskId, completed) => {
    const query = `
      mutation ToggleSummerTask($_id: ID!, $initials: String!, $dateCompleted: String!) {
        toggleSummerTask(_id: $_id, initials: $initials, dateCompleted: $dateCompleted) {
          _id
        }
      }
    `;

    if (completed) {
      const formData = { _id: taskId, initials: '', dateCompleted: '' };
      await handleSubmitUtility('/graphql', query, formData);
      refetch();
    } else {
      setTaskToComplete(taskId);
    }
  };

  const handleCompleteTask = async () => {
    if (initials && dateCompleted) {
      const formData = { _id: taskToComplete, initials, dateCompleted };
      const query = `
        mutation ToggleSummerTask($_id: ID!, $initials: String!, $dateCompleted: String!) {
          toggleSummerTask(_id: $_id, initials: $initials, dateCompleted: $dateCompleted) {
            _id
          }
        }
      `;
      await handleSubmitUtility('/graphql', query, formData);
      refetch();
      setInitials('');
      setDateCompleted('');
      setTaskToComplete(null);
    } else {
      alert('Please enter your initials and select a date.');
    }
  };

  const handleUncheckAll = async () => {
    const query = `
      mutation {
        uncheckAllSummerTasks {
          _id
        }
      }
    `;
    await handleSubmitUtility('/graphql', query, {});
    setShowConfirmation(false); // Hide the confirmation dialog
    refetch();
  };

  const handleDeleteTask = (taskId) => {
    setDeleteTaskId(taskId);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteTask = async () => {
    const formData = { _id: deleteTaskId };
    const query = `
      mutation DeleteSummerTask($_id: ID!) {
        deleteSummerTask(_id: $_id) {
          _id
        }
      }
    `;
    await handleSubmitUtility('/graphql', query, formData);
    setShowDeleteConfirmation(false); // Hide the confirmation dialog
    refetch();
    setDeleteTaskId(null);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="winter-checklist-page">
      <h1>Summer Checklist</h1>
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
        {data?.summerTasks.map(task => (
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

export default SummerChecklist;
