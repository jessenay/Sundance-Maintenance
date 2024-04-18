import { Link } from "react-router-dom";
import auth from "../../utils/auth";

const Header = () => {

  return (
    <header
      className="bg-info mb-4 display-flex align-center"
      style={{ backgroundColor: "#aad15f" }}
    >
      <div className="container flex-row">
        <Link className="text-light mr-auto p-2" to="/home">
          <h1
            className="m-0"
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
        <Link className="text-light p-2 nav-buttons" to="/home">
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
            Home
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/outlaw`}>
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
        <Link className="text-light p-2 nav-buttons" to={`/jakes`}>
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
            Jakes
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/wildwood`}>
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
            Wildwood
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/flathead`}>
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
            Flathead
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/reds`}>
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
            Reds
          </h1>
        </Link>
        <Link className="text-light p-2 nav-buttons" to={`/stairway`}>
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
            Stairway
          </h1>
        </Link>
        {auth.loggedIn() ? (
          <Link
            className="text-light p-2 nav-buttons"
            to="/"
            onClick={() => auth.logout()}
          >
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
              Logout
            </h1>
          </Link>
        ) : (
          <Link
            className="text-light p-2"
            to="/"
            onClick={() => setLoggedIn(!loggedIn)}
          >
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
              Login
            </h1>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
