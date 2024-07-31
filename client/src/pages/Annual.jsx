import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import AnnualForm from "../components/Annual/AnnualCard";
import { GET_ANNUAL_SERVICES, DELETE_ANNUAL_SERVICE } from '../utils/queries';
import "./Services.css";
import { FaTrash } from 'react-icons/fa'; // Importing delete icon

const Annual = () => {
  const navigate = useNavigate();
  const { componentId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const [deleteServiceId, setDeleteServiceId] = useState(null); // State to track the service to be deleted
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to track delete confirmation visibility
  const [confirmationText, setConfirmationText] = useState(''); // State to track the input text for confirmation

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if (!componentId) {
      console.error("Component ID is missing.");
      return;
    }
    if (!AuthService.loggedIn()) {
      navigate("/login");
    }
    const profile = AuthService.getProfile();
    console.log("User profile:", profile);
    setIsAdmin(profile.data.role === 'admin'); // Check if the user is admin
  }, [componentId, navigate]);

  const { loading, error, data, refetch } = useQuery(GET_ANNUAL_SERVICES, {
    variables: { componentId, month, year },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      console.log("Fetched annual services data:", data);
    },
    onError: (error) => {
      console.error("Error fetching annual services:", error);
    }
  });

  const [deleteService] = useMutation(DELETE_ANNUAL_SERVICE, {
    onCompleted: () => {
      refetch();
      setShowDeleteConfirmation(false);
    },
    onError: (error) => {
      console.error("Error deleting annual service:", error);
    }
  });

  const handleMonthChange = (e) => {
    const selectedMonth = monthNames.indexOf(e.target.value) + 1;
    setMonth(selectedMonth);
    refetch();
  };

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value, 10));
    refetch();
  };

  const formatDate = (dateString) => {
    const date = new Date(parseInt(dateString));
    console.log("Raw date string:", dateString);
    console.log("Parsed date:", date);
    return isNaN(date) ? "Invalid Date" : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleDelete = (serviceId) => {
    setDeleteServiceId(serviceId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (deleteServiceId && confirmationText === 'delete') {
      deleteService({ variables: { _id: deleteServiceId } });
      setConfirmationText(''); // Clear the input field after deletion
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.annualServices) return <p>No data found</p>;

  const reversedServices = [...data.annualServices].reverse();

  return (
    <div>
      <button className='add-service' onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Service"}
      </button>
      {showForm && <AnnualForm componentId={componentId} refetch={refetch} setShowForm={setShowForm} />}
      {!showForm && (
        <>
          <h2>Annual Services</h2>
          <div style={{ textAlign: 'center', marginBottom: '20px', color: 'whitesmoke'}}>
            <label className="date-picker">Month:</label>
            <select value={monthNames[month - 1]} onChange={handleMonthChange}>
              {monthNames.map((m, index) => (
                <option key={index} value={m}>{m}</option>
              ))}
            </select>
            <label className="date-picker">Year:</label>
            <select value={year} onChange={handleYearChange}>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </>
      )}
      <ul className="service-list">
        {reversedServices.map(service => (
          <li key={service._id} className="service-item">
            <div className="service-content">
              <p className="date-completed">Date Completed: {formatDate(service.dateCompleted)}</p>
              <p>Task: {service.task}</p>
              <p className="completed-by">Completed By: {service.completedBy}</p>
              <p className="test-values">Test Values: {service.testValues}</p>
              <p>Notes: {service.notes}</p>
              <p>Procedure Locations: {service.procedureLocations}</p>
            </div>
            {isAdmin && (
              <div className="delete-icon" onClick={() => handleDelete(service._id)}>
                <FaTrash />
              </div>
            )}
          </li>
        ))}
      </ul>
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this service? Type 'delete' to confirm:</p>
          <input type="text" value={confirmationText} onChange={(e) => setConfirmationText(e.target.value)} />
          <button onClick={confirmDelete} disabled={confirmationText !== 'delete'}>Delete</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Annual;
