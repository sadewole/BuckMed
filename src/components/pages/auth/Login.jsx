import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthBase from '../../layouts/AuthBase';

const textInputs = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  return (
    <div>
      <AuthBase>
        <h1 className='my-3'>Login</h1>
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
                    setInputs({
                      ...inputs,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            );
          })}
          <Button
            variant='outline-primary'
            className='btn-block btn-transparent-blue'
          >
            Login
          </Button>
        </Form>
      </AuthBase>
    </div>
  );
};

export default Login;
