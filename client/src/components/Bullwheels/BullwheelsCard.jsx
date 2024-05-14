import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_SERVICE } from '../../utils/mutations';
function formatLabel(text) {
    return text.replace(/_/g, ' ')
        .split(/(?=[A-Z])/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

const BullwheelsForm = ({ componentId, refetch, setShowForm }) => {
    const [bullwheels, setBullwheels] = useState({
        dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
    });

    const [addService, { loading, error }] = useMutation(ADD_SERVICE, {
        onCompleted: () => {
            alert('Service added successfully!');
            setBullwheels({
                dateCompleted: '', reason: '', workDescription: '', partsUsed: '', completedBy: ''
            });
            setShowForm(false);
            refetch();
        },
        onError: (err) => {
            alert('Error! ${err.message}');
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBullwheels(prevBullwheels => ({
            ...prevBullwheels,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Attempting to submit with Component ID:", componentId);
        if (!componentId) {
            console.error("Component ID is undefined, cannot submit the form.");
            alert("Component ID is missing, cannot submit the form.");
            return;
        }

        await addService({
            variables: { ...bullwheels, componentId}
        });
    };

    return (
        <div className='form-container'>
            <form className="annualForm" onSubmit={handleSubmit}>
                {Object.keys(bullwheels).map((key) => (
                    <div key={key}>
                        <label className='label' htmlFor={key}>
                            {formatLabel(key)}
                        </label>
                        <textarea
                            className="input"
                            id={key}
                            name={key}
                            type="text"
                            value={bullwheels[key]}
                            onChange={handleChange}
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

export default BullwheelsForm;
