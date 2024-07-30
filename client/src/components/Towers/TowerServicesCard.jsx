import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TOWER_SERVICE } from '../../utils/queries';
import './TowerServicesCard.css';

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

  return (
    <form onSubmit={handleSubmit} className="tower-services-form">
      <input
        type="date"
        name="dateCompleted"
        value={formData.dateCompleted}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="uphillOrDownhill"
        placeholder="Uphill or Downhill"
        value={formData.uphillOrDownhill}
        onChange={handleChange}
        required
      />
      <textarea
        name="workDescription"
        placeholder="Work Description"
        value={formData.workDescription}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="partsUsed"
        placeholder="Parts Used"
        value={formData.partsUsed}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="completedBy"
        placeholder="Completed By"
        value={formData.completedBy}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Tower Service</button>
      <button type="button" onClick={onClose}>Cancel</button>
      {loading && <p>Adding...</p>}
      {error && <p>An error occurred: {error.message}</p>}
    </form>
  );
};

export default TowerServicesForm;
