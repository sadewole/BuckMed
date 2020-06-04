import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const textInputs = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

const Register = () => {
  const [input, setInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  return (
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
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </Form.Group>
        );
      })}
      <Button>Submit</Button>
    </Form>
  );
};

export default Register;
