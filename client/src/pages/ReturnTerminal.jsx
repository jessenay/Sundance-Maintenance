import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import ReturnTerminalForm from "../components/ReturnTerminal/ReturnTerminalCard";
import { GET_SERVICES, ADD_SERVICE } from "../utils/queries";

const ReturnTerminal = () => {
    console.log("ReturnTerminal component is rendering");
    const navigate = useNavigate();
    const { componentId, liftId } = useParams();
    const [showForm, setShowForm] = useState(false);
    const [forceUpdateKey, setForceUpdateKey] = useState(0);

    useEffect(() => {
        console.log("Running the query with component ID:", componentId);
        if (!componentId) {
            console.error("Component ID is missing.");
            return;
        }
        if (!AuthService.loggedIn()) {
            navigate("/login");
        }
    }, [componentId, navigate]);

    const { loading, error, data, refetch } = useQuery(GET_SERVICES, {
        variables: { componentId },
        onError: (error) => {
            console.error("Query error", error)
        },
        onCompleted: (data) => {
            console.log("Query completed with data:", data);
        },
        skip: !componentId,
        notifyOnNetworkStatusChange: true,
    });

    const [addService] = useMutation(ADD_SERVICE, {
        onCompleted: () => {
            refetch();
            setForceUpdateKey(forceUpdateKey + 1);
            setShowForm(false);
        },
    });

    const toggleForm = () => setShowForm(!showForm);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error("Error fetching services:", error);
        return <p>Error: {error.message}</p>;
    }
    if (!data || !data.services) return <p>No data found</p>;
    console.log("Services Data:", data.services);
    const reversedServices = [...data.services].reverse();

    const handleViewProcedures = () => {
        navigate(`/lift/${liftId}/procedures/${componentId}`);
    };

    return (
        <div>
            <button className='add-service' onClick={toggleForm}>
                {showForm ? "Hide Form" : "Add Service"}
            </button>
            <button className='add-service' onClick={handleViewProcedures}>
                View Procedures
            </button>
            {showForm && <ReturnTerminalForm componentId={componentId} />}
            <h2>Return Terminal Services</h2>
            <ul className="service-list">
                {data.services.map(service => (
                    <li key={service._id} className="service-item">
                        <p className="date-completed">Date Completed: {service.dateCompleted}</p>
                        <p>Reason: {service.reason}</p>
                        <p className="completed-by">Work Description: {service.workDescription}</p>
                        <p className="test-values">Parts Used: {service.partsUsed}</p>
                        <p>Completed By: {service.completedBy}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ReturnTerminal;
