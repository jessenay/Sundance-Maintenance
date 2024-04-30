import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import AnnualForm from "../components/Annual/AnnualCard";
import { ADD_ANNUAL_SERVICE, GET_ANNUAL_SERVICES } from '../utils/queries';

const Annual = () => {
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

    const { loading, error, data, refetch } = useQuery(GET_ANNUAL_SERVICES, {
        variables: { componentId },
        notifyOnNetworkStatusChange: true,
    });

    const [addAnnualService] = useMutation(ADD_ANNUAL_SERVICE, {
        onCompleted: () => {
            refetch();
            setShowForm(false);
            setForceUpdateKey(prevKey => prevKey + 1);  // Force a re-render of the component
        },
    });

    const toggleForm = () => setShowForm(!showForm);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.annualServices) return <p>No data found</p>;

    const reversedServices = [...data.annualServices].reverse();

    return (
      <div>
          <button className='add-service' onClick={toggleForm}>
              {showForm ? "Hide Form" : "Add Service"}
          </button>
          {showForm && <AnnualForm componentId={componentId} />}
          <h2>Annual Services</h2>
          <ul className="service-list">
              {data.annualServices.map(service => (
                  <li key={service._id} className="service-item">
                      <p className="date-completed">Date Completed: {service.dateCompleted}</p>
                      <p>Task: {service.task}</p>
                      <p className="completed-by">Completed By: {service.completedBy}</p>
                      <p className="test-values">Test Values: {service.testValues}</p>
                      <p>Notes: {service.notes}</p>
                      <p>Procedure Locations: {service.procedureLocations}</p>
                  </li>
              ))}
          </ul>
      </div>
  );
  
};

export default Annual;
