import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import AuthService from "../utils/auth";
import ServiceForm from "../components/Services/ServiceForm";
import { GET_SERVICES, DELETE_SERVICE } from "../utils/queries";
import "../pages/Services.css";
import { FaTrash } from 'react-icons/fa'; // Importing delete icon

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
    const { liftName } = useOutletContext(); // Retrieve liftName from context
    const [showForm, setShowForm] = useState(false);
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [isAdmin, setIsAdmin] = useState(false); // State to track admin status
    const [deleteServiceId, setDeleteServiceId] = useState(null); // State to track the service to be deleted
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to track delete confirmation visibility
    const [deleteInput, setDeleteInput] = useState(''); // State to track delete confirmation input

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
        const profile = AuthService.getProfile();
        console.log("User profile:", profile);
        setIsAdmin(profile.data.role === 'admin'); // Check if the user is admin
    }, [componentId, navigate]);

    const { loading, error, data, refetch } = useQuery(GET_SERVICES, {
        variables: { componentId, month, year },
        notifyOnNetworkStatusChange: true,
    });

    const [deleteService] = useMutation(DELETE_SERVICE, {
        onCompleted: () => {
            refetch();
            setShowDeleteConfirmation(false);
            setDeleteInput('');
        },
        onError: (error) => {
            console.error("Error deleting service:", error);
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

    const handleDelete = (serviceId) => {
        setDeleteServiceId(serviceId);
        setShowDeleteConfirmation(true);
    };

    const confirmDelete = () => {
        if (deleteInput === 'delete' && deleteServiceId) {
            deleteService({ variables: { _id: deleteServiceId } });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.services) return <p>No data found</p>;

    const reversedServices = [...data.services].reverse();

    const handleViewProcedures = () => {
        navigate(`/lift/${liftId}/procedures/${componentId}`);
    };

    return (
        <div className="mid-terminal-container">
            <h1 className="lift-name">{liftName}</h1> {/* Display the lift name */}
            <div className="button-group">
                <button className='add-service' onClick={() => setShowForm(!showForm)}>
                    {showForm ? "Hide Form" : "Add Service"}
                </button>
                <button className='view-procedures' onClick={handleViewProcedures}>
                    View Procedures
                </button>
            </div>
            {showForm && <ServiceForm componentId={componentId} refetch={refetch} setShowForm={setShowForm} />}
            {!showForm && (
                <>
                    <h2>Mid Terminal Services</h2>
                    <div className="filter-container">
                        <label className="date-picker">Month:</label>
                        <select className="date-picker-select" value={monthNames[month - 1]} onChange={handleMonthChange}>
                            {monthNames.map((m, index) => (
                                <option key={index} value={m}>{m}</option>
                            ))}
                        </select>
                        <label className="date-picker">Year:</label>
                        <select className="date-picker-select" value={year} onChange={handleYearChange}>
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
                        <div className="service-content">
                            <p className="date-completed">Date Completed: {formatDate(service.dateCompleted)}</p>
                            <p>Reason: {service.reason}</p>
                            <p className="completed-by">Work Description: {service.workDescription}</p>
                            <p className="test-values">Parts Used: {service.partsUsed}</p>
                            <p>Completed By: {service.completedBy}</p>
                        </div>
                        {isAdmin && (
                            <div className="delete-icon" onClick={() => handleDelete(service._id)}>
                                <FaTrash />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {showDeleteConfirmation && (
                <div className="delete-confirmation">
                    <p>Are you sure you want to delete this service? Type 'delete' to confirm:</p>
                    <input type="text" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} />
                    <div className="confirmation-buttons">
                        <button onClick={confirmDelete} disabled={deleteInput !== 'delete'}>Delete</button>
                        <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MidTerminal;
