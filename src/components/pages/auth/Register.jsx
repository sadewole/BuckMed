import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthBase from '../../layouts/AuthBase';

const textInputs = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  return (
    <div>
      <AuthBase>
        <h1 className='my-3'>Register</h1>
        <Form>
          {textInputs.map((input) => {
            return (
              <Form.Group>
                <Form.Label>{input.label}</Form.Label>
                <Form.Control
                  name={input.name}
                  type={input.type}
                  placeholder={input.label}
                  onChange={(e) =>
                    setInputs({ ...inputs, [e.target.name]: e.target.value })
                  }
                />
              </Form.Group>
            );
          })}
          <Button
            variant='outline-primary'
            className='btn-block btn-transparent-blue'
          >
            Register
          </Button>
        </Form>
        <div>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      </AuthBase>
    </div>
  );
};

export default Register;
