import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '../utils/mutations';
import './CreateAccount.css';

const CreateAccount = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    role: 'user',
  });
  const [createAccount, { error }] = useMutation(CREATE_ACCOUNT);
  const [confirmationMessage, setConfirmationMessage] = useState(null); // State for confirmation message
  const [isError, setIsError] = useState(false); // State to track if the message is an error

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await createAccount({
        variables: { ...formState },
      });
      setFormState({
        username: '',
        password: '',
        role: 'user',
      });
      setConfirmationMessage('Account successfully created!');
      setIsError(false); // Set isError to false for success message
    } catch (e) {
      console.error(e);
      setConfirmationMessage('Failed to create account. Please try again.');
      setIsError(true); // Set isError to true for error message
    }
  };

  return (
    <div className="create-account-page">
      <h1>Create Account</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formState.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
        <select
          name="role"
          value={formState.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Create Account</button>
      </form>
      {confirmationMessage && (
        <div className={`confirmation-message ${isError ? 'error' : ''}`}>
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default CreateAccount;