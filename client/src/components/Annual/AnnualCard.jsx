import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ANNUAL_SERVICE } from '../../utils/mutations';
function formatLabel(text) {
    return text
        .replace(/_/g, ' ')
        .split(/(?=[A-Z])/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}


const AnnualForm = ({ componentId, refetch, setShowForm }) => {
    const [annual, setAnnual] = useState({
        task: '', dateCompleted: '', completedBy: '', testValues: '', notes: '', procedureLocations: ''
    });

    const [addAnnualService, { loading, error }] = useMutation(ADD_ANNUAL_SERVICE, {
        onCompleted: () => {
            alert('Annual service added successfully!');
            setAnnual({
                task: '', dateCompleted: '', completedBy: '', testValues: '', notes: '', procedureLocations: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!componentId) {
            console.error("Component ID is undefined, cannot submit the form.");
            alert("Component ID is missing, cannot submit the form.");
            return;
        }

        await addAnnualService({
            variables: { ...annual, componentId }
        });
    };


    return (
        <div className='form-container'>
            <form className="annualForm" onSubmit={handleSubmit}>
                {Object.keys(annual).map((key) => (
                    <div key={key}>
                        <label className='label' htmlFor={key}>
                            {formatLabel(key)}
                        </label>
                        <textarea
                            className="input"
                            id={key}
                            name={key}
                            value={annual[key]}
                            onChange={handleChange}
                            required={key !== 'testValues' && key !== 'notes' && key !== 'procedureLocations'}
                            rows={key === 'notes' || key === 'procedureLocations' ? 4 : 2}
                        />
                    </div>
                ))}
                <button className="button" type="submit">Submit</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error! {error.message}</div>}
        </div>
    );

};


export default AnnualForm;
