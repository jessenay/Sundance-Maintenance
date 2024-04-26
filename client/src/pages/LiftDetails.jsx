import { Outlet, useParams } from "react-router-dom";
import MaintNav from "../components/Navigation/MaintNav";

const LiftDetails = () => {
  const { liftName } = useParams(); // Get the lift name from the URL

  // Fetch the lift data based on liftName, here's a mock function to simulate
//   const liftData = getLiftData(liftName); // Implement this function based on your data source
console.log("lift name in liftDetails:", liftName);
  return (
    <div className="navContainer">
      <h1>{liftName}</h1>
      < MaintNav liftName={liftName} />
      <Outlet />
    </div>
  );
};

export default LiftDetails;
