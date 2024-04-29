import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import AnnualForm from "../components/Annual/AnnualCard";
import { ADD_ANNUAL_SERVICE, GET_ANNUAL_SERVICES } from '../utils/queries';

const Annual = () => {
  const navigate = useNavigate();
  const { componentId } = useParams();
  const [showForm, setShowForm] = useState(false); // State to control the form visibility

  useEffect(() => {
    if (!componentId) {
      console.error("Component ID is missing.");
      return;
    }
  }, [componentId]);

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const { loading, error, data, refetch } = useQuery(GET_ANNUAL_SERVICES, {
    variables: { componentId },
    notifyOnNetworkStatusChange: true,
  });

  const [addAnnualService] = useMutation(ADD_ANNUAL_SERVICE, {
    onCompleted: () => {
      refetch();
      setShowForm(false); // Optionally hide the form again after submission
    },
  });

  const toggleForm = () => setShowForm(!showForm); // Toggle the form display

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.annualServices) return <p>No data found</p>;

  const reversedServices = [...data.annualServices].reverse();

  return (
    <div>
      <button onClick={toggleForm}>
        {showForm ? "Hide Form" : "Add Service"}
      </button>
      {showForm && <AnnualForm componentId={componentId} />}
      <h2>Annual Services</h2>
      <ul>
        {reversedServices.map(service => (
          <li key={service._id}>
            <p>Date Completed: {service.dateCompleted}</p>
            <p>Task: {service.task}</p>
            <p>Completed By: {service.completedBy}</p>
            <p>Test Values: {service.testValues}</p>
            <p>Notes: {service.notes}</p>
            <p>Procedure Locations: {service.procedureLocations}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Annual;
