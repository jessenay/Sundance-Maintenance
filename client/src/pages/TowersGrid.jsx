// TowersGrid.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { FETCH_TOWERS_BY_LIFT_ID } from '../../src/utils/queries';

const TowersGrid = () => {
  const { liftId } = useParams(); // Assuming you're using React Router and the lift ID is part of the URL
  const { loading, error, data } = useQuery(FETCH_TOWERS_BY_LIFT_ID, { variables: { liftId } });

  if (loading) return <p>Loading towers...</p>;
  if (error) return <p>Error loading towers: {error.message}</p>;

  return (
    <div className="grid-container">
      {data && data.lift && data.lift.towers.map(tower => (
        <div key={tower._id} className="tower-card">
          <h3>{tower.name}</h3>
          <Link to={`/lifts/${liftId}/towers/${tower._id}`}>View Services</Link>
        </div>
      ))}
    </div>
  );
};

export default TowersGrid;
