import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import AuthService from "../utils/auth";
import ProcedureForm from "../components/Procedure/ProcedureForm";
import { GET_PROCEDURES } from "../utils/queries";

const Procedures = () => {
    const navigate = useNavigate();
    const { componentId } = useParams();
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!componentId) {
            console.error("Component ID is missing.");
            return;
        }
        if (!AuthService.loggedIn()) {
            navigate("/login");
        }
    }, [componentId, navigate]);

    const { loading, error, data, refetch } = useQuery(GET_PROCEDURES, {
        variables: { componentId },
        notifyOnNetworkStatusChange: true,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.procedures) return <p>No data found</p>;

    const reversedProcedures = [...data.procedures].reverse();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div>
            <button className='add-service' onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Add Procedure"}
            </button>
            {showForm && <ProcedureForm componentId={componentId} refetch={refetch} setShowForm={setShowForm} />}
            <button className='add-service' onClick={handleGoBack}>
                Go Back
            </button>
            <h2>Procedures</h2>
            <ul className="service-list">
                {reversedProcedures.map(procedure => (
                    <li key={procedure._id} className="service-item">
                        <p className="name">Name: {procedure.name}</p>
                        <p className="description">Description: {procedure.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Procedures;