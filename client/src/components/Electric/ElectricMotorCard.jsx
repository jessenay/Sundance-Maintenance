import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SERVICE } from '../../utils/mutations';
function formatLabel(text) {
    // Split the text on each capital letter or underscore and capitalize the first letter
    return text
        // Replace underscores with spaces and split into words
        .replace(/_/g, ' ')
        // Split at capital letters (for camelCase), ensure first letter is capitalized
        .split(/(?=[A-Z])/)
        // Combine all the transformations
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        // Join into a single string with spaces
        .join(' ');
}


const ElectricMotorForm = ({ componentId }) => {
    const [electricMotor, setElectricMotor] = useState({
        dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
    });

    const [addService, { loading, error }] = useMutation(ADD_SERVICE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setElectricMotor((prevElectricMotor) => ({
            ...prevElectricMotor,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Component ID before submitting:", componentId);
        const submitData = { ...electricMotor, componentId };
    console.log("Submitting Electric Motor Service:", submitData);

        // Check if componentId is undefined
        if (!componentId) {
            console.error("Component ID is undefined, cannot submit the form.");
            alert("Component ID is missing, cannot submit the form.");
            return;
        }
        try {
            const response = await addService({
                variables: { ...electricMotor, componentId }
            });
            console.log("Mutation response:", response);
            alert('service added successfully!');
            setElectricMotor({
                dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
            });
        } catch (error) {
            console.error("Error occurred while adding an annual service:", error);
            alert(`Error! ${error.message}`);
        }
    };

    return (
        <div className='form-container'>
            <form className="annualForm" onSubmit={handleSubmit}>
                {Object.keys(electricMotor).map((key) => (
                    <div key={key}>
                        <label className='label' htmlFor={key}>
                            {formatLabel(key)}
                        </label>
                        <textarea
                            className="input"
                            id={key}
                            name={key}
                            value={electricMotor[key]}
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


export default ElectricMotorForm;
