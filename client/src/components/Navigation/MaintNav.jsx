import { Link } from "react-router-dom";
import auth from "../../utils/auth";

const MaintNav = ({ liftName }) => {
console.log("lift name in MaintNav:", liftName);
  return (
    <header
      className="maintNav"
      style={{ backgroundColor: "black" }}
    >
      <div className="link-container">
        <Link className="maintNav-buttons" to={`/lift/${liftName}/annual`}>
          <h1
            className=""
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
        <Link className="text-light p-2 maintNav-buttons" to={`/lift/${liftName}/bullwheels`}>
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
        <Link className="text-light p-2 maintNav-buttons" to={`/lift/${liftName}/chairs`}>
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
        <Link className="text-light p-2 maintNav-buttons" to={`/lift/${liftName}/auxillaryMotor`}>
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
        <Link className="text-light p-2 maintNav-buttons" to={`/lift/${liftName}/electricMotor`}>
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
        <Link className="maintNav-buttons" to={`/lift/${liftName}/brakes`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Brakes
          </h1>
        </Link>
        <Link className="maintNav-buttons" to={`/lift/${liftName}/emergencyDrive`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Emergency Drive
          </h1>
        </Link>
        <Link className="maintNav-buttons" to={`/lift/${liftName}/electrical`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Electrical
          </h1>
        </Link>
        <Link className="maintNav-buttons" to={`/lift/${liftName}/haulRope`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Haul Rope
          </h1>
        </Link>
        <Link className="maintNav-buttons" to={`/lift/${liftName}/returnTerminal`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Return Terminal
          </h1>
        </Link>
        <Link className="maintNav-buttons" to={`/lift/${liftName}/driveTerminal`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Drive Terminal
          </h1>
        </Link>
        <Link className="maintNav-buttons" to={`/lift/${liftName}/towers`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "white",
            }}
          >
            Towers
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default MaintNav;
