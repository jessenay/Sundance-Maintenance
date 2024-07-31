import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ADD_SERVICE } from '../../utils/mutations';
import './ServiceForm.css';

function formatLabel(text) {
    return text.replace(/_/g, ' ')
               .split(/(?=[A-Z])/)
               .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
               .join(' ');
}

const ServiceForm = ({ componentId, refetch, setShowForm }) => {
    const [service, setService] = useState({
        dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
    });

    const [addService, { loading, error }] = useMutation(ADD_SERVICE, {
        onCompleted: () => {
            alert('Service added successfully!');
            setService({
                dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
            });
            setShowForm(false);
            refetch();
        },
        onError: (err) => {
            alert(`Error! ${err.message}`);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prevService => ({
            ...prevService,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setService(prevService => ({
            ...prevService,
            dateCompleted: date,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!componentId) {
            alert("Component ID is missing, cannot submit the form.");
            return;
        }

        await addService({
            variables: { ...service, componentId, dateCompleted: service.dateCompleted.toISOString() }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="service-form">
            <label className='label' htmlFor="dateCompleted">
                Date Completed
            </label>
            <DatePicker
                selected={service.dateCompleted ? new Date(service.dateCompleted) : null}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                className="input"
                placeholderText="Select date"
                required
            />

            <label className='label' htmlFor="reason">
                Reason
            </label>
            <input
                className="input"
                id="reason"
                name="reason"
                type="text"
                value={service.reason}
                onChange={handleChange}
                required
            />

            <label className='label' htmlFor="workDescription">
                Work Description
            </label>
            <textarea
                className="input textarea"
                id="workDescription"
                name="workDescription"
                value={service.workDescription}
                onChange={handleChange}
                required
            />

            <label className='label' htmlFor="partsUsed">
                Parts Used
            </label>
            <input
                className="input"
                id="partsUsed"
                name="partsUsed"
                type="text"
                value={service.partsUsed}
                onChange={handleChange}
                required
            />

            <label className='label' htmlFor="completedBy">
                Completed By
            </label>
            <input
                className="input"
                id="completedBy"
                name="completedBy"
                type="text"
                value={service.completedBy}
                onChange={handleChange}
                required
            />

            <button className="button" type="submit">Add Service</button>
            <button className="button cancel" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            {error && <p className="error">An error occurred: {error.message}</p>}
        </form>
    );
};

export default ServiceForm;
