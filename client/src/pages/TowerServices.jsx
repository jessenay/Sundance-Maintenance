import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import TowerServicesForm from '../components/Towers/TowerServicesCard';
import { FETCH_SERVICES_BY_TOWER_ID, DELETE_TOWER_SERVICE } from '../utils/queries';
import './TowerServices.css';
import { FaTrash } from 'react-icons/fa'; // Importing delete icon

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const TowerServices = () => {
  const { towerId } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
  const [deleteServiceId, setDeleteServiceId] = useState(null); // State to track the service to be deleted
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to track delete confirmation visibility
  const [deleteInput, setDeleteInput] = useState(''); // State to track delete confirmation input

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if (!towerId) {
      console.error("Tower ID is missing.");
      return;
    }
    if (!AuthService.loggedIn()) {
      navigate("/login");
    }
    const profile = AuthService.getProfile();
    console.log("User profile:", profile);
    setIsAdmin(profile.data.role === 'admin'); // Check if the user is admin
  }, [towerId, navigate]);

  const { data, loading, error, refetch } = useQuery(FETCH_SERVICES_BY_TOWER_ID, {
    variables: { towerId, month, year },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteService] = useMutation(DELETE_TOWER_SERVICE, {
    onCompleted: () => {
      refetch();
      setShowDeleteConfirmation(false);
      setDeleteInput('');
    },
    onError: (error) => {
      console.error("Error deleting service:", error);
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

  const handleDelete = (serviceId) => {
    setDeleteServiceId(serviceId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (deleteInput === 'delete' && deleteServiceId) {
      deleteService({ variables: { _id: deleteServiceId } });
    }
  };

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error loading services: {error.message}</p>;
  if (!data || !data.tower || !data.tower.services) return <p>No services found for this tower.</p>;

  const reversedServices = [...data.tower.services].reverse();

  return (
    <div className="tower-services-container">
      <button className="back-button" onClick={() => navigate(-1)}>Back to Towers</button>
      <h2>{`Services for ${data.tower.name}`}</h2>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label>Month:</label>
        <select value={monthNames[month - 1]} onChange={handleMonthChange}>
          {monthNames.map((m, index) => (
            <option key={index} value={m}>{m}</option>
          ))}
        </select>
        <label>Year:</label>
        <select value={year} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <button className="toggle-form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Service'}
      </button>
      {showForm && <TowerServicesForm towerId={towerId} onClose={() => setShowForm(false)} />}
      <ul className="service-list">
        {reversedServices.map(service => (
          <li key={service._id} className="service-item">
            <div className="service-content">
              <p className="date-completed">Date Completed: {formatDate(service.dateCompleted)}</p>
              <p>Detail: {service.uphillOrDownhill}</p>
              <p>Work Description: {service.workDescription}</p>
              <p>Parts Used: {service.partsUsed}</p>
              <p>Completed By: {service.completedBy}</p>
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
          <input type="text" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} />
          <button onClick={confirmDelete}>Delete</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TowerServices;
