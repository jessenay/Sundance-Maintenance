import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import AuthService from "../utils/auth";
import WorkOrderForm from "../components/WorkOrder/WorkOrderForm";
import { GET_WORK_ORDERS } from '../utils/queries';

const WorkOrders = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!AuthService.loggedIn()) {
            navigate("/login");
        }
    }, [navigate]);

    const { loading, error, data, refetch } = useQuery(GET_WORK_ORDERS, {
        notifyOnNetworkStatusChange: true,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.workOrders) return <p>No data found</p>;

    const reversedWorkOrders = [...data.workOrders].reverse();

    return (
        <div>
            <button className='add-service' onClick={() => setShowForm(!showForm)}>
                {showForm ? "Hide Work Order Form" : "Add Work Order"}
            </button>
            {showForm && <WorkOrderForm refetch={refetch} setShowForm={setShowForm} />}
            <h2>Work Orders</h2>
            <ul className="service-list">
                {reversedWorkOrders.map(order => (
                    <li key={order._id} className="service-item">
                        <p className="date-completed">Job: {order.job}</p>
                        <p>Personnel: {order.personnel.join(', ')}</p>
                        <p className="completed-by">Tools Required: {order.toolsRequired.join(', ')}</p>
                        <p className="test-values">Parts Used:</p>
                        <ul>
                            {order.partsUsed.map((part, index) => (
                                <li key={index}>{part.name}: ${part.cost.toFixed(2)}</li>
                            ))}
                        </ul>
                        <p>Time Worked: {order.timeWorked}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkOrders;