import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, NetworkStatus } from '@apollo/client';
import AuthService from "../utils/auth";
import AnnualForm from "../components/Annual/AnnualCard";
import { ADD_ANNUAL_SERVICE } from '../utils/queries';
import { GET_ANNUAL_SERVICES } from '../utils/queries';

const Annual = () => {
  const { liftId, componentId } = useParams();
  useEffect(() => {
    if (!componentId) {
      console.error("Component ID is missing.");
      return;
    }

    // Further code to fetch data or anything else
  }, [componentId]);
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_ANNUAL_SERVICES, {
    variables: { componentId },
    notifyOnNetworkStatusChange: true,
  });

  console.log("Query Loading:", loading); // Debug loading
  console.log("Query Error:", error); // Debug error
  console.log("Query Data:", data); // Debug data

  // Handle authentication redirection
  // useEffect(() => {
  //   if (!AuthService.loggedIn()) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  // Refresh data after mutation
  const [addAnnualService] = useMutation(ADD_ANNUAL_SERVICE, {
    onCompleted: () => refetch(), // Refetch services after a successful mutation
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.annualServices) return <p>No data found</p>;

  return (
    <div>
      <h1>Add a Service</h1>
      <AnnualForm componentId={componentId} />
      <h2>Annual Services</h2>
      <ul>
        {data.annualServices.map(service => (
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
