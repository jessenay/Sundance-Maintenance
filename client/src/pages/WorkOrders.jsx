import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_WORK_ORDERS, DELETE_WORK_ORDER } from '../utils/queries';
import AuthService from '../utils/auth';
import './WorkOrders.css';
import { FaTrash } from 'react-icons/fa';
import WorkOrderForm from '../components/WorkOrder/WorkOrderForm'; // Assuming you have a WorkOrderForm component

const WorkOrders = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteWorkOrderId, setDeleteWorkOrderId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState('');
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const { loading, error, data, refetch } = useQuery(GET_WORK_ORDERS);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Work Orders</h2>
      <button className='add-service1' onClick={toggleForm}>
        {showForm ? "Hide Form" : "Add Work Order"}
      </button>
      {showForm && <WorkOrderForm refetch={refetch} setShowForm={setShowForm} />}
      <ul className="service-list1">
        {data.workOrders.map((workOrder) => (
          <li key={workOrder._id} className="service-item1">
            <div className="service-content1">
              <p className="date-completed">Date: {new Date(workOrder.date).toLocaleDateString()}</p>
              <p>Job: {workOrder.job}</p>
              <p>Personnel: {workOrder.personnel}</p>
              <p>Tools Required: {workOrder.toolsRequired}</p>
              <p>Parts Used:</p>
              <ul>
                {workOrder.partsUsed.map((part, index) => (
                  <li key={`${part.name}-${index}`}>
                    {part.name}: {part.cost}
                  </li>
                ))}
              </ul>
              <p>Time Worked: {workOrder.timeWorked}</p>
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
