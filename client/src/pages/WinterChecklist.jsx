import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WINTER_TASKS, ADD_WINTER_TASK, TOGGLE_WINTER_TASK, UNCHECK_ALL_WINTER_TASKS } from '../utils/queries';
import './WinterChecklist.css';

const WinterChecklist = () => {
  const [newTask, setNewTask] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data, refetch } = useQuery(GET_WINTER_TASKS);
  const [addTask] = useMutation(ADD_WINTER_TASK, {
    onCompleted: () => {
      setNewTask('');
      refetch();
    }
  });
  const [toggleTask] = useMutation(TOGGLE_WINTER_TASK, {
    onCompleted: () => refetch()
  });
  const [uncheckAllTasks] = useMutation(UNCHECK_ALL_WINTER_TASKS, {
    onCompleted: () => {
      setShowConfirmation(false);
      refetch();
    }
  });

  const handleAddTask = () => {
    if (newTask) {
      addTask({ variables: { name: newTask } });
    }
  };

  const handleToggleTask = (taskId) => {
    toggleTask({ variables: { _id: taskId } });
  };

  const handleUncheckAll = () => {
    uncheckAllTasks();
  };

  return (
    <div className="winter-checklist-page">
      <h1>Winter Checklist</h1>
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
        {data?.winterTasks.map(task => (
          <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task._id)}
              />
              {task.name}
            </label>
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
    </div>
  );
};

export default WinterChecklist;
