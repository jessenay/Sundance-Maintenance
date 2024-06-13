import React from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LIFT_BY_ID } from '../utils/queries';
import MaintNav from '../components/Navigation/MaintNav'; // Adjust the import path as necessary
import './LiftDetails.css';

// Example images mapping
const liftImages = {
  Outlaw: '/assets/Images/outlawPicture.png',
  Jakes: '/assets/Images/jakesPicture.png',
  Wildwood: '/assets/Images/wildwoodPicture.png',
  Flathead: '/assets/Images/flatheadPicture.png',
  Reds: '/assets/Images/redsPicture.png',
  Stairway: '/assets/Images/stairwayPicture.png',
};

const LiftDetails = () => {
  const { liftId } = useParams(); // Get the lift ID from the URL
  const location = useLocation(); // Get the current location

  console.log("Lift ID:", liftId); // Log the liftId to ensure it's being retrieved correctly

  // Execute the GraphQL query
  const { loading, error, data } = useQuery(GET_LIFT_BY_ID, {
    variables: { _id: liftId },
  });

  console.log("Query Variables:", { _id: liftId });
  console.log("Query Data:", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Access lift name from the data
  const liftName = data?.lift?.name || 'Unknown'; // Adjust this according to the actual structure of your data
  const liftImage = liftImages[liftName] || '/assets/Images/defaultLiftPicture.png'; // Fallback to a default image

  // Check if the current path includes a component route (excluding the main lift page)
  const isComponentPage = location.pathname !== `/lift/${liftId}`;

  return (
    <div className="lift-details-container">
      {!isComponentPage && <MaintNav liftId={liftId} />} {/* Conditionally render the MaintNav bar */}
      <div className="main-content">
        <h1>{liftName}</h1> {/* Display the lift name */}
        {!isComponentPage && liftImage && (
          <img src={liftImage} alt={liftName} className="lift-image" />
        )} {/* Conditionally render the lift image */}
        <Outlet />
      </div>
    </div>
  );
};

export default LiftDetails;
