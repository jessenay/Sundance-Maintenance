import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [login] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      auth.login(data.login.token);
    } catch (err) {
      console.error(err);

    }


  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2 className='login-heading'>Login</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='login-text'>
          <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
            Something went wrong with your login credentials!
          </Alert>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control className='form-input login-form-input'
              type='email'
              placeholder='Your email'
              name='email'
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control className='form-input login-form-input'
              type='password'
              placeholder='Your password'
              name='password'
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
          </Form.Group>

          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type='submit'
            variant='success'>
            Submit
          </Button>
        </Form>
      </div>
      <div className="right-section">
        <div className='top-section'>
          <img src='' alt="" className="login-picture" />
        </div>
        <div className="logo-section">
          <span>Sundance Lift Maintenance</span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
