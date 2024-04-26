import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import RecipeList from "../components/RecipeList";
import AuthService from "../utils/auth";
import EmergencyDriveForm from "../components/EmergencyDrive/EmergencyDriveCard";
// import { NewRecipe } from "../components/RecipeCards/NewRecipe";

const emergencyDrive = () => {
    const navigate = useNavigate();

    //   useEffect(() => {
    //     if (!AuthService.loggedIn()) {
    //       navigate("/");
    //     }
    //   }, [navigate]);

    //   const handleAddRecipeClick = () => {
    //     navigate("/add-recipe");
    //   };

    return (
        <main className="annualContainer">
            <h1>Emergency Drive</h1>
            <h2>
                Reason Codes: 1-Regular Preventative Maintenance 2-Failure of unit or component 3-Inspection 4-Damage/Accident/Incident 5-Other(explain in work description)
            </h2>
            <div>
                <EmergencyDriveForm />
            </div>
        </main>
    )
};

export default emergencyDrive;
