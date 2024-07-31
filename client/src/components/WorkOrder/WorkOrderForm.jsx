import React, { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { ADD_WORK_ORDER } from '../../utils/mutations';
import './WorkOrderForm.css';

function formatLabel(text) {
  return text.replace(/_/g, ' ')
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const WorkOrderForm = ({ refetch, setShowForm, handleFinishWorkOrder, todo }) => {
  const [workOrder, setWorkOrder] = useState({
    job: '',
    personnel: [''],
    toolsRequired: [''],
    partsUsed: [{ name: '', cost: 0 }],
    timeWorked: '',
    date: '' // New date field
  });

  useEffect(() => {
    if (todo) {
      setWorkOrder((prevWorkOrder) => ({
        ...prevWorkOrder,
        job: todo.job // Set the job field to the job of the todo
      }));
    }
  }, [todo]);

  const [addWorkOrder, { loading, error }] = useMutation(ADD_WORK_ORDER, {
    onCompleted: () => {
      alert('Work order added successfully!');
      setWorkOrder({
        job: '',
        personnel: [''],
        toolsRequired: [''],
        partsUsed: [{ name: '', cost: 0 }],
        timeWorked: '',
        date: '' // Reset date field
      });
      setShowForm(false);
      refetch();
      handleFinishWorkOrder();
    },
    onError: (err) => {
      alert(`Error! ${err.message}`);
    },
  });

  const handleAddField = (field) => {
    setWorkOrder((prev) => {
      const newState = { ...prev };
      if (field === "toolsRequired" || field === "personnel") {
        newState[field].push('');
      } else if (field === "partsUsed") {
        newState[field].push({ name: '', cost: 0 });
      }
      return newState;
    });
  };

  const handleChange = (e, field, index, subField = null) => {
    const { value } = e.target;
    setWorkOrder((prev) => {
      const newState = { ...prev };
      if (field === 'job' || field === 'timeWorked' || field === 'date') {
        newState[field] = value;
      } else if (subField) {
        newState[field][index][subField] = value;
      } else {
        newState[field][index] = value;
      }
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWorkOrder({
      variables: {
        job: workOrder.job,
        personnel: workOrder.personnel,
        toolsRequired: workOrder.toolsRequired,
        partsUsed: workOrder.partsUsed.map(part => ({ name: part.name, cost: parseFloat(part.cost) })),
        timeWorked: workOrder.timeWorked,
        date: workOrder.date // Include date in the submission
      }
    });
  };

  return (
    <div className="work-order-form-container">
      <form className="work-order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='label' htmlFor='job'>{formatLabel('job')}</label>
          <input
            className="input"
            id='job'
            name='job'
            placeholder="Job"
            type="text"
            value={workOrder.job}
            onChange={(e) => handleChange(e, 'job')}
          />
        </div>
        {workOrder.personnel.map((person, index) => (
          <div className="form-group" key={index}>
            <label className='label'>{formatLabel('personnel')}</label>
            <input
              type="text"
              placeholder="Personnel"
              value={person}
              onChange={(e) => handleChange(e, 'personnel', index)}
              className="input"
            />
          </div>
        ))}
        <button className="add-button" type="button" onClick={() => handleAddField('personnel')}>
          Add Personnel
        </button>

        {workOrder.toolsRequired.map((tool, index) => (
          <div className="form-group" key={index}>
            <label className='label'>{formatLabel('toolsRequired')}</label>
            <input
              type="text"
              placeholder="Tool Required"
              value={tool}
              onChange={(e) => handleChange(e, 'toolsRequired', index)}
              className="input"
            />
          </div>
        ))}
        <button className="add-button" type="button" onClick={() => handleAddField('toolsRequired')}>
          Add Tool
        </button>

        {workOrder.partsUsed.map((part, index) => (
          <div className="form-group" key={index}>
            <label className='label'>{formatLabel('partsUsed')}</label>
            <input
              type="text"
              placeholder="Part Used"
              value={part.name}
              onChange={(e) => handleChange(e, 'partsUsed', index, 'name')}
              className="input"
            />
            <input
              type="number"
              placeholder="Cost"
              value={part.cost}
              onChange={(e) => handleChange(e, 'partsUsed', index, 'cost')}
              className="input"
            />
          </div>
        ))}
        <button className="add-button" type="button" onClick={() => handleAddField('partsUsed')}>
          Add Part
        </button>

        <div className="form-group">
          <label className='label' htmlFor='timeWorked'>{formatLabel('timeWorked')}</label>
          <input
            className="input"
            id='timeWorked'
            name='timeWorked'
            placeholder="Time Worked"
            type="text"
            value={workOrder.timeWorked}
            onChange={(e) => handleChange(e, 'timeWorked')}
          />
        </div>

        <div className="form-group">
          <label className='label' htmlFor='date'>{formatLabel('date')}</label>
          <input
            className="input"
            id='date'
            name='date'
            type="date" // Date picker input type
            value={workOrder.date}
            onChange={(e) => handleChange(e, 'date')}
          />
        </div>

        <div className="button-group">
          <button className="submit-button" type="submit">Submit</button>
          <button className="close-button" type="button" onClick={() => setShowForm(false)}>Close</button>
        </div>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error! {error.message}</div>}
    </div>
  );
};

export default WorkOrderForm;
