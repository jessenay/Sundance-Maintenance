import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ADD_TOWER_SERVICE } from '../../utils/mutations';
import './TowerServicesCard.css';

const TowerServicesForm = ({ towerId, refetch, onClose }) => {
  const [formData, setFormData] = useState({
    dateCompleted: '',
    uphillOrDownhill: '',
    workDescription: '',
    partsUsed: '',
    completedBy: ''
  });

  const [addTowerService, { loading, error }] = useMutation(ADD_TOWER_SERVICE, {
    onCompleted: () => {
      if (typeof refetch === 'function') {
        refetch();
      }
      onClose();
    },
    onError: (err) => {
      console.error('Mutation error:', err);
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, dateCompleted: date }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const submissionData = {
      ...formData,
      towerId,
      dateCompleted: formData.dateCompleted.toISOString(),
    };

    addTowerService({
      variables: submissionData
    });
  };

  return (
    <form onSubmit={handleSubmit} className="service-form">
      <label className='label' htmlFor="dateCompleted">
        Date Completed
      </label>
      <DatePicker
        selected={formData.dateCompleted ? new Date(formData.dateCompleted) : null}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        className="input"
        placeholderText="Select date"
        required
      />

      <label className='label' htmlFor="uphillOrDownhill">
        Uphill or Downhill
      </label>
      <input
        className="input"
        id="uphillOrDownhill"
        name="uphillOrDownhill"
        type="text"
        value={formData.uphillOrDownhill}
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
        value={formData.workDescription}
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
        value={formData.partsUsed}
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
        value={formData.completedBy}
        onChange={handleChange}
        required
      />

      <button className="button" type="submit">Add Tower Service</button>
      <button className="button cancel" type="button" onClick={onClose}>Cancel</button>
      {loading && <p>Adding...</p>}
      {error && <p className="error">An error occurred: {error.message}</p>}
    </form>
  );
};

export default TowerServicesForm;
