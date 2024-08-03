import React from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_LIFT_BY_ID } from '../utils/queries';
import MaintNav from '../components/Navigation/MaintNav';
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

  // Execute the GraphQL query
  const { loading, error, data } = useQuery(GET_LIFT_BY_ID, {
    variables: { _id: liftId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Check if data is available and access lift name from the data
  const lift = data?.lift;
  if (!lift) return <p>Lift not found</p>;

  const liftName = lift.name || 'Unknown';
  const liftImage = liftImages[liftName] || '/assets/Images/defaultLiftPicture.png'; // Fallback to a default image

  // Check if the current path includes a component route (excluding the main lift page)
  const isComponentPage = location.pathname !== `/lift/${liftId}`;

  console.log("LiftDetails - liftName:", liftName);

  return (
    <div className="lift-details-container">
      {!isComponentPage && (
        <>
          <MaintNav liftId={liftId} /> {/* Conditionally render the MaintNav bar */}
          <div className="image-container">
            <img src={liftImage} alt={liftName} className="lift-image" />
            <div className="overlay">
              <h1 className='lift-name'>{liftName}</h1> {/* Display the lift name */}
            </div>
          </div>
        </>
      )}
      <Outlet context={{ liftName }} /> {/* Pass liftName to nested routes */}
    </div>
  );
};

export default LiftDetails;
