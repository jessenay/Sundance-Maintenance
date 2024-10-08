import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WORK_ORDERS, GET_LIFTS, DELETE_WORK_ORDER } from '../utils/queries';
import AuthService from '../utils/auth';
import './WorkOrders.css';
import { FaTrash } from 'react-icons/fa';
import WorkOrderForm from '../components/WorkOrder/WorkOrderForm';

function formatDate(dateString) {
  console.log('Raw dateString:', dateString); // Debug log
  const date = new Date(parseInt(dateString));
  console.log('Parsed date:', date); // Debug log
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString();
  }
  return 'Invalid date';
}

const WorkOrders = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteWorkOrderId, setDeleteWorkOrderId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedLift, setSelectedLift] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_WORK_ORDERS, {
    variables: { liftId: selectedLift }
  });
  const { loading: liftsLoading, error: liftsError, data: liftsData } = useQuery(GET_LIFTS);

  const [deleteWorkOrder] = useMutation(DELETE_WORK_ORDER, {
    onCompleted: () => {
      refetch();
      setShowDeleteConfirmation(false);
      setConfirmationInput('');
    },
    onError: (error) => {
      console.error('Error deleting work order:', error);
    }
  });

  useEffect(() => {
    const profile = AuthService.getProfile();
    setIsAdmin(profile.data.role === 'admin');
  }, []);

  const handleDeleteClick = (workOrderId) => {
    setDeleteWorkOrderId(workOrderId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (confirmationInput === 'delete') {
      deleteWorkOrder({ variables: { _id: deleteWorkOrderId } });
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLiftChange = (e) => {
    setSelectedLift(e.target.value);
    refetch();
  };

  if (loading || liftsLoading) return <p>Loading...</p>;
  if (error || liftsError) return <p>Error: {error ? error.message : liftsError.message}</p>;

  return (
    <div>
      <h2>Work Orders</h2>
      <div className="filter-container">
        <label htmlFor="liftFilter">Filter by Lift:</label>
        <select id="liftFilter" value={selectedLift} onChange={handleLiftChange}>
          <option value="">All Lifts</option>
          {liftsData && liftsData.lifts.map(lift => (
            <option key={lift._id} value={lift._id}>{lift.name}</option>
          ))}
        </select>
      </div>
      <button className='add-service1' onClick={toggleForm}>
        {showForm ? "Hide Form" : "Add Work Order"}
      </button>
      {showForm && <WorkOrderForm refetch={refetch} setShowForm={setShowForm} />}
      <ul className="service-list1">
        {data.workOrders.map((workOrder) => (
          <li key={workOrder._id} className="service-item1">
            <div className="service-content1">
              <p className="date-completed">Date: {formatDate(workOrder.dateCompleted)}</p>
              <p>Job: {workOrder.job}</p>
              <p>Personnel: {workOrder.personnel.join(', ')}</p>
              <p>Tools Required: {workOrder.toolsRequired.join(', ')}</p>
              <p>Parts Used:</p>
              <ul>
                {workOrder.partsUsed.map((part, index) => (
                  <li key={`${part.name}-${index}`}>
                    {part.name}: ${part.cost.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Time Worked: {workOrder.timeWorked}</p>
              <p>Lift: {workOrder.lift ? workOrder.lift.name : 'No Lift Assigned'}</p>
            </div>
            {isAdmin && (
              <div className="delete-icon" onClick={() => handleDeleteClick(workOrder._id)}>
                <FaTrash />
              </div>
            )}
          </li>
        ))}
      </ul>
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this work order? Type 'delete' to confirm:</p>
          <input
            type="text"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
          />
          <button onClick={confirmDelete}>Delete</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default WorkOrders;