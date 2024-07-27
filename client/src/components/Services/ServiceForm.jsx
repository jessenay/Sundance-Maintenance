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
        <div className='form-container'>
            <form className="annualForm" onSubmit={handleSubmit}>
                {Object.keys(service).map((key) => (
                    <div key={key}>
                        <label className='label' htmlFor={key}>
                            {formatLabel(key)}
                        </label>
                        {key === 'dateCompleted' ? (
                            <DatePicker
                                selected={service.dateCompleted ? new Date(service.dateCompleted) : null}
                                onChange={handleDateChange}
                                dateFormat="yyyy/MM/dd"
                                className="input"
                                placeholderText="Select date"
                            />
                        ) : (
                            <textarea
                                className="input textarea"
                                id={key}
                                name={key}
                                type="text"
                                value={service[key]}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                ))}
                <button className="button" type="submit">Submit</button>
            </form>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">Error! {error.message}</div>}
        </div>
    );
};

export default ServiceForm;
