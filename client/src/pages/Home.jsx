import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import RecipeList from "../components/RecipeList";
import AuthService from "../utils/auth";
import AnnualForm from "../components/Annual/AnnualCard"
// import { NewRecipe } from "../components/RecipeCards/NewRecipe";

const Home = () => {
  const navigate = useNavigate();

//   useEffect(() => {
//     if (!AuthService.loggedIn()) {
//       navigate("/");
//     }
//   }, [navigate]);

  const handleAddRecipeClick = () => {
    navigate("/add-recipe");
  };

  return (
    <div>
        <h1>
        Hello Twink
        </h1>
    </div>
  )};

export default Home;
