import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import AuthService from "../utils/auth";
import AnnualForm from "../components/Annual/AnnualCard";
import { GET_ANNUAL_SERVICES } from '../utils/queries';
import "./Services.css";

const Annual = () => {
    const navigate = useNavigate();
    const { componentId } = useParams();
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

    const { loading, error, data, refetch } = useQuery(GET_ANNUAL_SERVICES, {
        variables: { componentId, month, year },
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            console.log("Fetched annual services data:", data);
        },
        onError: (error) => {
            console.error("Error fetching annual services:", error);
        }
    });

    const handleMonthChange = (e) => {
        const selectedMonth = monthNames.indexOf(e.target.value) + 1;
        setMonth(selectedMonth);
        refetch();
    };

    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value, 10));
        refetch();
    };

    const formatDate = (dateString) => {
        const date = new Date(parseInt(dateString));
        console.log("Raw date string:", dateString);
        console.log("Parsed date:", date);
        return isNaN(date) ? "Invalid Date" : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.annualServices) return <p>No data found</p>;

    const reversedServices = [...data.annualServices].reverse();

    return (
        <div>
            <button className='add-service' onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Form" : "Add Service"}
            </button>
            {showForm && <AnnualForm componentId={componentId} refetch={refetch} setShowForm={setShowForm} />}
            {!showForm && (
                <>
                    <h2>Annual Services</h2>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
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
                        <p>Task: {service.task}</p>
                        <p className="completed-by">Completed By: {service.completedBy}</p>
                        <p className="test-values">Test Values: {service.testValues}</p>
                        <p>Notes: {service.notes}</p>
                        <p>Procedure Locations: {service.procedureLocations}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Annual;
