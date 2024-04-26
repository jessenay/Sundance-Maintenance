import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ANNUAL_SERVICE } from '../../utils/mutations';

const AnnualForm = ({ componentId }) => {
    const [annual, setAnnual] = useState({
        task: '', dateCompleted: '', completedBy: '', testValues: '', notes: '', procedureLocations: ''
    });

    const [addAnnualService, { loading, error }] = useMutation(ADD_ANNUAL_SERVICE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnnual((prevAnnual) => ({
            ...prevAnnual,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Component ID before submitting:", componentId);
        const submitData = { ...annual, componentId };
    console.log("Submitting Annual Service:", submitData);

        // Check if componentId is undefined
        if (!componentId) {
            console.error("Component ID is undefined, cannot submit the form.");
            alert("Component ID is missing, cannot submit the form.");
            return;
        }

        console.log("Submitting Annual Service:", { ...annual, componentId });
        try {
            const response = await addAnnualService({
                variables: { ...annual, componentId }
            });
            console.log("Mutation response:", response);
            alert('Annual service added successfully!');
            setAnnual({
                task: '', dateCompleted: '', completedBy: '', testValues: '', notes: '', procedureLocations: ''
            });
        } catch (error) {
            console.error("Error occurred while adding an annual service:", error);
            alert(`Error! ${error.message}`);
        }
    };

    return (
        <div className='form-container'>
            <form className="annualForm" onSubmit={handleSubmit}>
                <label className='label'>TASK:</label>
                <input className="input" type="text" name="task" value={annual.task} onChange={handleChange} required />
                <label className='label'>DATE COMPLETED:</label>
                <input className="input" type="text" name="dateCompleted" value={annual.dateCompleted} onChange={handleChange} required />
                <label className="label">COMPLETED BY:</label>
                <input className="input" type="text" name="completedBy" value={annual.completedBy} onChange={handleChange} required />
                <label className="label">TEST VALUES (If Applicable):</label>
                <input className="input" type="text" name="testValues" value={annual.testValues} onChange={handleChange} required />
                <label className="label">NOTES:</label>
                <input className="input" type="text" name="notes" value={annual.notes} onChange={handleChange} required />
                <label className="label">PROCEDURE LOCATIONS:</label>
                <input className="input" type="text" name="procedureLocations" value={annual.procedureLocations} onChange={handleChange} required />
                <button className="button" type="submit">Submit</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error! {error.message}</div>}
        </div>
    );
};

export default AnnualForm;
