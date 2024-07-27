import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import AuthService from "../utils/auth";
import ServiceForm from "../components/Services/ServiceForm";
import { GET_SERVICES } from "../utils/queries";
import "../pages/Services.css";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

const MidTerminal = () => {
    const navigate = useNavigate();
    const { componentId, liftId } = useParams();
    const [showForm, setShowForm] = useState(false);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        if (!componentId) {
            console.error("Component ID is missing.");
            return;
        }
        if (!AuthService.loggedIn()) {
            navigate("/login");
        }
    }, [componentId, navigate]);

    const { loading, error, data, refetch } = useQuery(GET_SERVICES, {
        variables: { componentId, month, year },
        notifyOnNetworkStatusChange: true,
    });

    const handleMonthChange = (e) => {
        const selectedMonth = monthNames.indexOf(e.target.value) + 1;
        setMonth(selectedMonth);
    };

    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value, 10));
    };

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
            {showForm && <ServiceForm componentId={componentId} refetch={refetch} setShowForm={setShowForm} />}
            {!showForm && (
                <>
                    <h2>Mid Terminal Services</h2>
                    <div>
                        <label>Month:</label>
                        <select value={monthNames[month - 1]} onChange={handleMonthChange}>
                            {monthNames.map((m, index) => (
                                <option key={index} value={m}>{m}</option>
                            ))}
                        </select>
                        <label>Year:</label>
                        <select value={year} onChange={handleYearChange}>
                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </>
            )}
            <ul className="service-list">
                {reversedServices.map(service => (
                    <li key={service._id} className="service-item">
                        <p className="date-completed">Date Completed: {formatDate(service.dateCompleted)}</p>
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

export default MidTerminal;
