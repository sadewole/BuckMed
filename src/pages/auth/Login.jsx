import { Paper, Tabs, Tab } from '@material-ui/core';
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'src/store';
import { patientLogin, staffLogin } from 'src/slices/auth';

const textInputs = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
];

const tabs = [
  { label: 'Patient', value: 'patient' },
  { label: 'Staff', value: 'staff' },
];

const Login = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('patient');

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    submit: null,
  });
  return (
    <div>
      <h1 className='my-3'>Login</h1>
      <Paper className='my-3'>
        <Tabs
          onChange={handleTabsChange}
          scrollButtons='auto'
          indicatorColor='primary'
          textColor='primary'
          value={currentTab}
          variant='scrollable'
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Paper>
      <Formik
        initialValues={inputs}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={(values, { ...formiks }) => {
          const { submit, ...rest } = values;

          if (currentTab === 'patient') {
            submitLogin(rest, patientLogin, { ...formiks, dispatch });
          }
          if (currentTab === 'staff') {
            submitLogin(rest, staffLogin, { ...formiks, dispatch });
          }
        }}
      >
        {({
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
          isSubmitting,
          setErrors,
          touched,
          values,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {textInputs.map((input, index) => {
              return (
                <Form.Group key={index}>
                  <Form.Label>{input.label}</Form.Label>
                  <Form.Control
                    name={input.name}
                    type={input.type}
                    placeholder={input.label}
                    value={values[input.name]}
                    className={
                      Boolean(touched[input.name] && errors[input.name])
                        ? 'border-danger border'
                        : ''
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <p className='text-danger m-1'>
                    {touched[input.name] && errors[input.name]}
                  </p>
                </Form.Group>
              );
            })}
            {errors.submit && (
              <Alert
                variant='danger'
                onClose={() => setErrors({ submit: null })}
                dismissible
              >
                {errors.submit}
              </Alert>
            )}
            <Button
              type='submit'
              variant='outline-primary'
              className='btn-block btn-transparent-blue'
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <div className='mt-3'>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

const submitLogin = (
  values,
  login,
  { setStatus, setSubmitting, setErrors, resetForm, dispatch }
) => {
  dispatch(login(values))
    .then((data) => {
      if (!(data instanceof Error)) {
        // resetForm();
        setStatus({ success: true });
      } else {
        throw new Error(data);
      }
    })
    .catch((err) => {
      setErrors({ submit: err.message });
    })
    .finally(() => setSubmitting(false));
};

export default Login;
