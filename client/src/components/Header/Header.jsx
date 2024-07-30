import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LIFTS } from "../../utils/queries";
import auth from "../../utils/auth";
import "./Header.css";

const Header = () => {
  const { loading, error, data } = useQuery(GET_LIFTS);
  const [loggedIn, setLoggedIn] = useState(auth.loggedIn());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.loggedIn()) {
      const user = auth.getProfile();
      setIsAdmin(user.data.role === 'admin');
    }
    setLoggedIn(auth.loggedIn());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const lifts = data?.lifts || [];

  const handleLogout = () => {
    auth.logout();
    setLoggedIn(false);
    navigate("/login");
  };

  const slugify = (text) => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const liftNameFontSize = windowWidth <= 1382 ? '25px' : '30px';

  return (
    <header className="header">
      <div className="headerContainer">
        <Link to="/home" className="header-link">
          <h1 className="header-title">Sundance</h1>
        </Link>
        <div className="desktop-nav">
          {lifts.map((lift) => (
            <div className="lift-link-container" key={lift._id}>
              <Link className="nav-buttons" to={`/lift/${lift._id}`}>
                <h1 
                  className="lift-name" 
                  style={{ fontSize: liftNameFontSize, fontFamily: "Poppins", fontWeight: 450, textTransform: "uppercase", color: "white" }}
                >
                  {lift.name}
                </h1>
              </Link>
              <div className="dropdown-content">
                {lift.components.map((component) => {
                  const linkPath = component.name === 'Towers'
                    ? `/lift/${lift._id}/towers`
                    : `/lift/${lift._id}/${slugify(component.name)}/${component._id}`;

                  return (
                    <Link key={component._id} to={linkPath}>
                      {component.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
          {loggedIn ? (
            <>
              {isAdmin && (
                <button className="create-account-button" onClick={() => navigate('/create-account')}>
                  Create Account
                </button>
              )}
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="nav-buttons" to="/login">
              <h1 className="login-text">Login</h1>
            </Link>
          )}
        </div>
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {lifts.map((lift) => (
            <Link className="nav-buttons" to={`/lift/${lift._id}`} key={lift._id} onClick={() => setIsMobileMenuOpen(false)}>
              <h1 
                className="lift-name" 
                style={{ fontSize: liftNameFontSize, fontFamily: "Poppins", fontWeight: 450, textTransform: "uppercase", color: "white" }}
              >
                {lift.name}
              </h1>
            </Link>
          ))}
          {loggedIn && (
            <>
              {isAdmin && (
                <button className="create-account-button" onClick={() => navigate('/create-account')}>
                  Create Account
                </button>
              )}
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
