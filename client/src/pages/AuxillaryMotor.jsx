import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import AuthService from "../utils/auth";
import AuxillaryMotorForm from "../components/Auxillary/AuxillaryMotorCard";
import { GET_SERVICES } from "../utils/queries";

const AuxillaryMotor = () => {
    console.log("AuxillaryMotor component is rendering");
    const navigate = useNavigate();
    const { liftId, componentId } = useParams();
    const [showForm, setShowForm] = useState(false);

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
        notifyOnNetworkStatusChange: true,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.services) return <p>No data found</p>;

    const reversedServices = [...data.services].reverse();

    const handleViewProcedures = () => {
        navigate(`/lift/${liftId}/procedures/${componentId}`);
    };

    return (
        <div>
            <button className='add-service' onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Add Service"}
            </button>
            <button className='add-service' onClick={handleViewProcedures}>
                View Procedures
            </button>
            {showForm && <AuxillaryMotorForm componentId={componentId} refetch={refetch} setShowForm={setShowForm} />}
            <h2>Auxillary Motor Services</h2>
            <ul className="service-list">
                {reversedServices.map(service => (
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

export default AuxillaryMotor;