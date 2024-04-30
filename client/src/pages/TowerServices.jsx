// TowerServices.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { FETCH_SERVICES_BY_TOWER_ID } from '../../../client/src/utils/queries';

const TowerServices = () => {
  const { towerId } = useParams();
  const { loading, error, data } = useQuery(FETCH_SERVICES_BY_TOWER_ID, { variables: { towerId } });

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error loading services: {error.message}</p>;

  return (
    <div>
      <h2>Services for Tower</h2>
      {data.tower.services.map(service => (
        <div key={service._id}>
          <p>Date: {service.dateCompleted}</p>
          <p>Detail: {service.uphillOrDownhill}</p>
          {/* Add more service details as needed */}
        </div>
      ))}
      <Link to={`/add-service/tower/${towerId}`}>Add New Service</Link>
    </div>
  );
};

export default TowerServices;
