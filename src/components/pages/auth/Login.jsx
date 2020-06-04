import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const textInputs = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  return (
    <div>
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
                  setInput({
                    ...input,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Form.Group>
          );
        })}
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default Login;
