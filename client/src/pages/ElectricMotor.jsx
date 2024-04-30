import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import ElectricMotorForm from "../components/Electric/ElectricMotorCard";
import { ADD_SERVICE, GET_SERVICES } from '../utils/queries';

const ElectricMotor = () => {
    const navigate = useNavigate();
    const { componentId } = useParams();
    const [showForm, setShowForm] = useState(false);
    const [forceUpdateKey, setForceUpdateKey] = useState(0);

    useEffect(() => {
        if (!componentId) {
            console.error("Component ID is missing.");
            return;
        }
        if (!AuthService.loggedIn()) {
            navigate("/login");
        }
    }, [componentId, navigate]);

    const { loading, error, data, refetch } = useQuery(GET_SERVICES, {
        variables: { componentId },
        notifyOnNetworkStatusChange: true,
    });

    const [addService] = useMutation(ADD_SERVICE, {
        onCompleted: () => {
            refetch();
            setShowForm(false);
            setForceUpdateKey(prevKey => prevKey + 1);  // Force a re-render of the component
        },
    });

    const toggleForm = () => setShowForm(!showForm);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.services) return <p>No data found</p>;

    const reversedServices = [...data.services].reverse();

    return (
      <div>
          <button className='add-service' onClick={toggleForm}>
              {showForm ? "Hide Form" : "Add Service"}
          </button>
          {showForm && <ElectricMotorForm componentId={componentId} />}
          <h2>Electric Motor Services</h2>
          <ul className="service-list">
                {data.services.map(service => (
                    <li key={service._id} className="service-item">
                        <p className="date-completed">Date Completed: {service.dateCompleted}</p>
                        <p>Reason: {service.reason}</p>
                        <p className="completed-by">Work Description: {service.workDescription}</p>
                        <p className="test-values">Parts Used: {service.partsUsed}</p>
                        <p>Completed By: {service.completedBy}</p>
                    </li>
                ))}
            </ul>
      </div>
  );
  
};

export default ElectricMotor;
