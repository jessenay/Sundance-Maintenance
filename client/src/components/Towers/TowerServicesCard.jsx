import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TOWER_SERVICE } from '../../utils/queries'; // adjust the path as necessary

const TowerServicesForm = ({ towerId, onClose }) => {
    const [formData, setFormData] = useState({
        dateCompleted: '',
        uphillOrDownhill: '',
        workDescription: '',
        partsUsed: '',
        completedBy: ''
    });

    const [addTowerService, { loading, error }] = useMutation(ADD_TOWER_SERVICE, {
        variables: {
            ...formData,
            towerId
        },
        onCompleted: () => {
            onClose(); // close the form upon completion
        }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addTowerService();
    };

    if (loading) return <p>Adding...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <input type="date" name="dateCompleted" value={formData.dateCompleted} onChange={handleChange} required />
            <input type="text" name="uphillOrDownhill" value={formData.uphillOrDownhill} onChange={handleChange} required />
            <textarea name="workDescription" value={formData.workDescription} onChange={handleChange} required />
            <input type="text" name="partsUsed" value={formData.partsUsed} onChange={handleChange} required />
            <input type="text" name="completedBy" value={formData.completedBy} onChange={handleChange} required />
            <button type="submit">Add Tower Service</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
};

export default TowerServicesForm;