import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ADD_ANNUAL_SERVICE } from '../../utils/mutations';
import './annualcard.css';

function formatLabel(text) {
    return text
        .replace(/_/g, ' ')
        .split(/(?=[A-Z])/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

const AnnualForm = ({ componentId, refetch, setShowForm }) => {
    const [annual, setAnnual] = useState({
        task: '', dateCompleted: new Date(), completedBy: '', testValues: '', notes: '', procedureLocations: ''
    });

    const [addAnnualService, { loading, error }] = useMutation(ADD_ANNUAL_SERVICE, {
        onCompleted: () => {
            alert('Annual service added successfully!');
            setAnnual({
                task: '', dateCompleted: new Date(), completedBy: '', testValues: '', notes: '', procedureLocations: ''
            });
            setShowForm(false);
            refetch();
        },
        onError: (err) => {
            alert(`Error! ${err.message}`);
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnual((prevAnnual) => ({
            ...prevAnnual,
            [name]: value,
        }));
    };

    const handleDateChange = (date) => {
        setAnnual((prevAnnual) => ({
            ...prevAnnual,
            dateCompleted: date,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!componentId) {
            console.error("Component ID is undefined, cannot submit the form.");
            alert("Component ID is missing, cannot submit the form.");
            return;
        }

        await addAnnualService({
            variables: { ...annual, componentId, dateCompleted: annual.dateCompleted.toISOString() }
        });
    };

    return (
        <div className='annual-form-container'>
            <form className="annualForm" onSubmit={handleSubmit}>
                {Object.keys(annual).map((key) => (
                    key !== 'dateCompleted' ? (
                        <div key={key}>
                            <label className='label' htmlFor={key}>
                                {formatLabel(key)}
                            </label>
                            <textarea
                                className="input textarea"
                                id={key}
                                name={key}
                                value={annual[key]}
                                onChange={handleChange}
                                required={key !== 'testValues' && key !== 'notes' && key !== 'procedureLocations'}
                                rows={key === 'notes' || key === 'procedureLocations' ? 4 : 2}
                            />
                        </div>
                    ) : (
                        <div key={key}>
                            <label className='label' htmlFor={key}>
                                {formatLabel(key)}
                            </label>
                            <DatePicker
                                selected={annual.dateCompleted}
                                onChange={handleDateChange}
                                className="input"
                            />
                        </div>
                    )
                ))}
                <button className="button" type="submit">Submit</button>
            </form>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">Error! {error.message}</div>}
        </div>
    );
};

export default AnnualForm;
