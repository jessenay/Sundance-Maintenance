import { Link } from "react-router-dom";
import auth from "../../utils/auth";

const MaintNav = ({ liftName }) => {
console.log("lift name in MaintNav:", liftName);
  return (
    <header
      className="bg-info mb-4 display-flex align-center"
      style={{ backgroundColor: "black" }}
    >
      <div className="container flex-row">
        <Link className="text-light p-2 nav-buttons" to={`/lift/${liftName}/annual`}>
          <h1
            className="m-0"
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Annual
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/lift/${liftName}/bullwheels`}>
          <h1
            className="m-0"
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Bullwheels
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/lift/${liftName}/chairs`}>
          <h1
            className="m-0"
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Chairs
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/lift/${liftName}/auxillaryMotor`}>
          <h1
            className="m-0"
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Auxillary Motor
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/lift/${liftName}/electricMotor`}>
          <h1
            className="m-0"
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Electric Motor
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default MaintNav;
