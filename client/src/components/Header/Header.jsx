import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LIFTS } from "../../utils/queries";
import auth from "../../utils/auth";

const Header = () => {
  const { loading, error, data } = useQuery(GET_LIFTS);
  const [loggedIn, setLoggedIn] = useState(auth.loggedIn());

  useEffect(() => {
    setLoggedIn(auth.loggedIn());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const lifts = data?.lifts || [];

  const handleLogout = () => {
    auth.logout();
    setLoggedIn(false);
  };

  const slugify = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <header className="header" style={{ backgroundColor: "black" }}>
      <div className="headerContainer">
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontSize: "60px", fontFamily: "Playfair Display", fontWeight: 400, color: "red" }}>
            Sundance
          </h1>
        </Link>
        {lifts.map((lift) => (
          <div className="lift-link-container" key={lift._id}>
            <Link className="nav-buttons" to={`/lift/${lift._id}`}>
              <h1 style={{ fontSize: "20px", fontFamily: "Poppins", fontWeight: 600, textTransform: "uppercase", color: "white" }}>
                {lift.name}
              </h1>
            </Link>
            <div className="dropdown-content">
              {lift.components.map((component) => {
                const linkPath = component.name === 'Towers'
                  ? `/lift/${lift._id}/towers`  // Path for tower grid
                  : `/lift/${lift._id}/${slugify(component.name)}/${component._id}`; // General path for other components

                return (
                  <Link key={component._id} to={linkPath} style={{ textDecoration: 'none', color: 'black' }}>
                    {component.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        {loggedIn ? (
          <button className="nav-buttons" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="nav-buttons" to="/">
            <h1 style={{ fontSize: "20px", fontFamily: "Poppins", fontWeight: 600, textTransform: "uppercase" }}>
              Login
            </h1>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;