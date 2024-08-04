import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PROCEDURE } from '../../utils/mutations';
import './ProcedureForm.css'; // Import the CSS file

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

    const formData = { ...procedure, componentId };
    addProcedure({
      variables: formData
    });
  };

  return (
    <div className='procedure-form-container'>
      <form className="procedure-annualForm" onSubmit={handleSubmit}>
        <div className="procedure-form-group">
          <label className='procedure-label' htmlFor='name'>Name</label>
          <input
            className="procedure-input"
            id='name'
            name='name'
            type="text"
            value={procedure.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="procedure-form-group">
          <label className='procedure-label' htmlFor='description'>Description</label>
          <textarea
            className="procedure-input procedure-description-input"
            id='description'
            name='description'
            value={procedure.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        <div className="procedure-button-group">
          <button className="procedure-submit-button" type="submit">Submit</button>
          <button className="procedure-close-button" type="button" onClick={() => setShowForm(false)}>Close</button>
        </div>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error! {error.message}</div>}
    </div>
  );
};

export default ProcedureForm;
