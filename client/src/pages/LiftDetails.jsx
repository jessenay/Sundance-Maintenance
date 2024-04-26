import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import MaintNav from '../components/Navigation/MaintNav';
import { useQuery } from '@apollo/client';
import { GET_LIFT_BY_ID } from '../utils/queries';

const LiftDetails = () => {
  const { liftId } = useParams(); // Get the lift ID from the URL

  // Execute the GraphQL query
  const { loading, error, data } = useQuery(GET_LIFT_BY_ID, {
    variables: { _id: liftId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Access lift name from the data
  const liftName = data.lift.name; // Adjust this according to the actual structure of your data

  return (
    <div className="navContainer">
      <h1>{liftName}</h1> {/* Display the lift name instead of the lift ID */}
      <MaintNav liftId={liftId} />
      <Outlet />
    </div>
  );
};

export default LiftDetails;
