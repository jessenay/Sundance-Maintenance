import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
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
      setShowAlert(true);
    }

    setValidated(true);
  };

  return (
    <div className='login-page-wrapper'>
      <div className="login-page">
        <div className="login-form">
          <h1 className='login-title'>
            Welcome to <span className="sundance">Sundance</span> Lift Maintenance
          </h1>
          <h2 className='login-heading'>Please Login</h2>
          <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='login-text'>
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something went wrong with your login credentials!
            </Alert>

            <Form.Group>
              <Form.Label className='email' htmlFor='username'>Username</Form.Label>
              <Form.Control className='form-input login-form-input'
                type='text'
                placeholder='Your username'
                name='username'
                onChange={handleInputChange}
                value={userFormData.username}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className='email' htmlFor='password'>Password</Form.Label>
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
              className='loginButton'
              disabled={!(userFormData.username && userFormData.password)}
              type='submit'
              variant='success'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;