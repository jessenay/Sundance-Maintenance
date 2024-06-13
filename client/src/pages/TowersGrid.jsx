import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import { FETCH_TOWERS_BY_LIFT_ID } from '../../src/utils/queries';
import "./TowersGrid.css";

const TowersGrid = () => {
  const { liftId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_TOWERS_BY_LIFT_ID, { variables: { liftId } });

  if (loading) return <p>Loading towers...</p>;
  if (error) return <p>Error loading towers: {error.message}</p>;
  if (!data || !data.lift || !data.lift.towers) return <p>No towers found.</p>;

  const handleTowerClick = (towerId) => {
    navigate(`/lift/${liftId}/towers/${towerId}`);
  };

  const handleViewProcedures = () => {
    navigate(`/lift/${liftId}/procedures/${componentId}`);
  };

  return (
    <div>
      <button className='add-service' onClick={handleViewProcedures}>
        View Procedures
      </button>
      <div className="grid-container">
        {data.lift.towers.map(tower => (
          <div key={tower._id} className="tower-card" onClick={() => handleTowerClick(tower._id)}>
            <h3>{tower.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TowersGrid;