import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../utils/auth";
import Slideshow from "../components/Slideshow/Slideshow";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthService.loggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleViewWorkOrdersClick = () => {
    navigate("/work-orders");
  };

  return (
    <div className="home-page">
      <h1 className="home-page-background">
        Welcome to <span style={{ color: 'red' }}>Sundance</span> Lift Maintenance
      </h1>
      <Slideshow />
      <button onClick={handleViewWorkOrdersClick} className="work-orders">
        View Work Orders
      </button>
    </div>
  );
};

export default Home;