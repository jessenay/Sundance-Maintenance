import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROCEDURE } from '../../utils/mutations';

const ProcedureForm = ({ componentId, refetch, setShowForm }) => {
    const [procedure, setProcedure] = useState({
        name: '',
        description: ''
    });

    const [addProcedure, { loading, error }] = useMutation(ADD_PROCEDURE, {
        onCompleted: () => {
            alert('Procedure added successfully!');
            setProcedure({
                name: '',
                description: ''
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
        setProcedure((prevProcedure) => ({
            ...prevProcedure,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!componentId) {
            console.error("Component ID is undefined, cannot submit the form.");
            alert("Component ID is missing, cannot submit the form.");
            return;
        }

        await addProcedure({
            variables: { ...procedure, componentId }
        });
    };

    return (
        <div className='form-container'>
            <form className="annualForm" onSubmit={handleSubmit}>
                <div>
                    <label className='label' htmlFor='name'>Name</label>
                    <input
                        className="input"
                        id='name'
                        name='name'
                        type="text"
                        value={procedure.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className='label' htmlFor='description'>Description</label>
                    <textarea
                        className="input description-input"
                        id='description'
                        name='description'
                        value={procedure.description}
                        onChange={handleChange}
                        rows={4}
                        required
                    />
                </div>
                <button className="button" type="submit">Submit</button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error! {error.message}</div>}
        </div>
    );
};

export default ProcedureForm;