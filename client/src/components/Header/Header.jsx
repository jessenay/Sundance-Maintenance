import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LIFTS } from "../../utils/queries";
import auth from "../../utils/auth";

const Header = () => {
  const { loading, error, data } = useQuery(GET_LIFTS);
  const [loggedIn, setLoggedIn] = useState(auth.loggedIn());

  useEffect(() => {
    // This effect will only re-check the login status when the component mounts,
    // which isn't perfect if login status can change while the component is mounted.
    // Consider a global state or context for a more robust solution.
    setLoggedIn(auth.loggedIn());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const lifts = data?.lifts || [];

  const handleLogout = () => {
    auth.logout();
    setLoggedIn(false); // Update state to reflect logout
  };

  const handleLogin = () => {
    // This should redirect to a login page where auth.login() can be called
    setLoggedIn(true); // This line may be unnecessary depending on your login flow
  };

  return (
    <header className="header" style={{ backgroundColor: "red" }}>
      <div className="headerContainer">
        <Link to="/home">
          <h1 style={{ fontSize: "60px", fontFamily: "Playfair Display", fontWeight: 400, color: "#06052e" }}>
            Sundance
          </h1>
        </Link>
        <Link className="nav-buttons" to="/home">
          <h1 style={{ fontSize: "20px", fontFamily: "Poppins", fontWeight: 600, textTransform: "uppercase", color: "#06052e" }}>
            Home
          </h1>
        </Link>
        {lifts.map((lift) => (
          <Link key={lift._id} className="text-light p-2 nav-buttons" to={`/lift/${lift._id}`}>
            <h1 className="m-0" style={{ fontSize: "20px", fontFamily: "Poppins", fontWeight: 600, textTransform: "uppercase", color: "#06052e" }}>
              {lift.name}
            </h1>
          </Link>
        ))}
        {loggedIn ? (
          <button className="nav-buttons" onClick={handleLogout}>
            <h1 style={{ fontSize: "20px", fontFamily: "Poppins", fontWeight: 600, textTransform: "uppercase", color: "#06052e" }}>
              Logout
            </h1>
          </button>
        ) : (
          <Link className="nav-buttons" to="/" onClick={handleLogin}>
            <h1 style={{ fontSize: "20px", fontFamily: "Poppins", fontWeight: 600, textTransform: "uppercase", color: "#06052e" }}>
              Login
            </h1>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
