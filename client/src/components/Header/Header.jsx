import { Link } from "react-router-dom";
import auth from "../../utils/auth";

const Header = () => {

  return (
    <header
      className="header"
      style={{ backgroundColor: "red" }}
    >
      <div className="headerContainer">
        <Link className="" to="/home">
          <h1
            className=""
            style={{
              fontSize: "60px",
              fontFamily: "Playfair Display",
              fontWeight: 400,
              color: "#06052e",
            }}
          >
            Sundance
          </h1>
        </Link>
        <Link className="nav-buttons" to="/home">
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#06052e",
            }}
          >
            Home
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/lift/outlaw`}>
          <h1
            className="m-0"
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#06052e",
            }}
          >
            Outlaw
          </h1>
        </Link>
        <Link className="nav-buttons" to={`/lift/jakes`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#06052e",
            }}
          >
            Jakes
          </h1>
        </Link>
        <Link className="nav-buttons" to={`/lift/wildwood`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#06052e",
            }}
          >
            Wildwood
          </h1>
        </Link>
        <Link className="nav-buttons" to={`/lift/flathead`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#06052e",
            }}
          >
            Flathead
          </h1>
        </Link>
        <Link className="nav-buttons" to={`/lift/reds`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#06052e",
            }}
          >
            Reds
          </h1>
        </Link>
        <Link className="nav-buttons" to={`/lift/stairway`}>
          <h1
            className=""
            style={{
              fontSize: "20px",
              fontFamily: "Poppins",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "#06052e",
            }}
          >
            Stairway
          </h1>
        </Link>
        {auth.loggedIn() ? (
          <Link
            className="nav-buttons"
            to="/"
            onClick={() => auth.logout()}
          >
            <h1
              className=""
              style={{
                fontSize: "20px",
                fontFamily: "Poppins",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "#06052e",
              }}
            >
              Logout
            </h1>
          </Link>
        ) : (
          <Link
            className="nav-buttons"
            to="/"
            onClick={() => setLoggedIn(!loggedIn)}
          >
            <h1
              className=""
              style={{
                fontSize: "20px",
                fontFamily: "Poppins",
                fontWeight: 600,
                textTransform: "uppercase",
                color: "#06052e",
              }}
            >
              Login
            </h1>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
