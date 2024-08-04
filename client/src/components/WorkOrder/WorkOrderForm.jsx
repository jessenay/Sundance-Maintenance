import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { GET_LIFTS } from '../../utils/queries';
import { handleFormSubmit } from '../../utils/submitHandler';
import './WorkOrderForm.css';

function formatLabel(text) {
  return text.replace(/_/g, ' ')
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const WorkOrderForm = ({ refetch, setShowForm, handleFinishWorkOrder = () => {}, todo }) => {
  const [workOrder, setWorkOrder] = useState({
    lift: '', // New lift field
    job: '',
    personnel: [''],
    toolsRequired: [''],
    partsUsed: [{ name: '', cost: 0 }],
    timeWorked: '',
    dateCompleted: '' // Initialized with dateCompleted instead of date
  });
  const [submissionError, setSubmissionError] = useState(null); // State for submission error
  const [submissionSuccess, setSubmissionSuccess] = useState(false); // State for submission success

  const { loading: liftsLoading, error: liftsError, data: liftsData } = useQuery(GET_LIFTS);

  useEffect(() => {
    if (todo) {
      setWorkOrder((prevWorkOrder) => ({
        ...prevWorkOrder,
        job: todo.job // Set the job field to the job of the todo
      }));
    }
  }, [todo]);

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
      if (field === 'lift' || field === 'job' || field === 'timeWorked' || field === 'dateCompleted') {
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
    const formData = {
      lift: workOrder.lift,
      job: workOrder.job,
      personnel: workOrder.personnel,
      toolsRequired: workOrder.toolsRequired,
      partsUsed: workOrder.partsUsed.map(part => ({ name: part.name, cost: parseFloat(part.cost) })),
      timeWorked: workOrder.timeWorked,
      dateCompleted: workOrder.dateCompleted
    };

    const query = `
      mutation AddWorkOrder(
        $lift: ID!, $job: String!, $personnel: [String!]!, $toolsRequired: [String!]!, $partsUsed: [PartInput!]!, $timeWorked: String!, $dateCompleted: String!
      ) {
        addWorkOrder(
          lift: $lift, job: $job, personnel: $personnel, toolsRequired: $toolsRequired, partsUsed: $partsUsed, timeWorked: $timeWorked, dateCompleted: $dateCompleted
        ) {
          _id
        }
      }
    `;

    try {
      const result = await handleFormSubmit('/graphql', query, formData);
      console.log('Submission result:', result);
      setSubmissionSuccess(true); // Set submission success state
      setSubmissionError(null); // Clear any previous error
      setWorkOrder({
        lift: '',
        job: '',
        personnel: [''],
        toolsRequired: [''],
        partsUsed: [{ name: '', cost: 0 }],
        timeWorked: '',
        dateCompleted: '' // Reset dateCompleted field
      });
      setShowForm(false);
      refetch();
      handleFinishWorkOrder();
    } catch (error) {
      console.error('Submit failed; saving offline', error);
      setSubmissionError(error.message); // Set submission error state
    }
  };

  if (liftsLoading) return <p>Loading lifts...</p>;
  if (liftsError) return <p>Error loading lifts: {liftsError.message}</p>;

  return (
    <div className="work-order-form-container">
      <form className="work-order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='label' htmlFor='lift'>{formatLabel('lift')}</label>
          <select
            className="input"
            id='lift'
            name='lift'
            value={workOrder.lift}
            onChange={(e) => handleChange(e, 'lift')}
          >
            <option value="">Select Lift</option>
            {liftsData.lifts.map(lift => (
              <option key={lift._id} value={lift._id}>{lift.name}</option>
            ))}
          </select>
        </div>
        
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

        <div className="form-group">
          <label className='label' htmlFor='dateCompleted'>{formatLabel('dateCompleted')}</label>
          <input
            className="input"
            id='dateCompleted'
            name='dateCompleted'
            type="date"
            value={workOrder.dateCompleted}
            onChange={(e) => handleChange(e, 'dateCompleted')}
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

        <div className="work-order-button-group">
          <button className="submit-button" type="submit">Submit</button>
          <button className="close-button" type="button" onClick={() => setShowForm(false)}>Close</button>
        </div>
      </form>
      {submissionError && <div className="error-message">Error! {submissionError}</div>}
      {submissionSuccess && <div className="success-message">Work order added successfully!</div>}
    </div>
  );
};

export default WorkOrderForm;
