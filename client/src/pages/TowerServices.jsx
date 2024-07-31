import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FETCH_SERVICES_BY_TOWER_ID } from '../utils/queries'; 
import TowerServicesForm from '../components/Towers/TowerServicesCard';
import './TowerServices.css';

const TowerServices = () => {
    const { towerId } = useParams();
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    const { data, loading, error } = useQuery(FETCH_SERVICES_BY_TOWER_ID, {
        variables: { towerId }
    });

    const toggleForm = () => setShowForm(!showForm);

    if (loading) return <p>Loading services...</p>;
    if (error) return <p>Error loading services: {error.message}</p>;
    if (!data || !data.tower || !data.tower.services) return <p>No services found for this tower.</p>;

    return (
        <div className="tower-services-container">
            <button className="back-button" onClick={() => navigate(-1)}>Back to Towers</button>
            <h2>{`Services for ${data.tower.name}`}</h2>
            <button className="toggle-form-button" onClick={toggleForm}>{showForm ? 'Hide Form' : 'Add New Service'}</button>
            {showForm && <TowerServicesForm towerId={towerId} onClose={() => setShowForm(false)} />}
            <ul className="service-list">
                {data.tower.services.map(service => (
                    <li key={service._id} className="service-item">
                        <p className="date-completed">Date Completed: {service.dateCompleted}</p>
                        <p>Detail: {service.uphillOrDownhill}</p>
                        <p>Work Description: {service.workDescription}</p>
                        <p>Parts Used: {service.partsUsed}</p>
                        <p>Completed By: {service.completedBy}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TowerServices;
