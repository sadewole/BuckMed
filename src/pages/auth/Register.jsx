import React, { useState, Fragment } from 'react';
import { Button, Form, FormLabel, FormControl } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'src/store';
import { patientRegister } from 'src/slices/auth';

const textInputs = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'dateOfBirth', label: 'Date of birth', type: 'date' },
  { name: 'phoneNumber', label: 'Phone no.', type: 'text' },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: [
      { value: '', text: '' },
      { value: 'male', text: 'Male' },
      { value: 'female', text: 'Female' },
    ],
  },
  { name: 'occupation', label: 'Occupation', type: 'text' },
  { name: 'height', label: 'Height', type: 'text' },
  { name: 'weight', label: 'Weight', type: 'text' },
  {
    name: 'bloodGroup',
    label: 'Blood Group',
    type: 'select',
    options: [
      { value: '', text: '' },
      { value: 'AB', text: 'AB' },
      { value: 'A', text: 'A' },
      { value: 'B', text: 'B' },
      { value: 'O', text: 'O' },
    ],
  },
  {
    name: 'genotype',
    label: 'Genotype',
    type: 'select',
    options: [
      { value: '', text: '' },
      { value: 'AA', text: 'AA' },
      { value: 'AS', text: 'AS' },
      { value: 'SS', text: 'SS' },
    ],
  },
];

const validate = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
      'Must be a valid phone number'
    )
    .required('Phone number is required'),
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  firstName: Yup.string().max(255).required('First Name is required'),
  lastName: Yup.string().max(255).required('Last Name is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string()
    .min(5, 'Must be atleast 5 characters long')
    .required('Password is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const [initValues, setInitValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    occupation: '',
    height: '',
    weight: '',
    bloodGroup: '',
    genotype: '',
    submit: null,
  });

  return (
    <div>
      <h1 className='my-3'>Register</h1>
      <Formik
        initialValues={initValues}
        validationSchema={validate}
        onSubmit={(
          values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          const { submit, ...rest } = values;
          dispatch(patientRegister(rest))
            .then((res) => {
              console.log(res);
              setStatus({ success: true });
              // resetForm();
            })
            .catch((err) => {
              console.log(err);
              setErrors({ submit: err.message });
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
          isSubmitting,
          touched,
          values,
        }) => (
          <Form noValidate className='row' onSubmit={handleSubmit}>
            {textInputs.map((input, index) => {
              return (
                <Form.Group key={index} className='col-12 col-sm-6'>
                  <FormLabel>{input.label}</FormLabel>
                  {input.type === 'select' ? (
                    <Fragment>
                      <FormControl
                        as='select'
                        name={input.name}
                        value={values[input.name]}
                        onBlur={handleBlur}
                        className={
                          Boolean(touched[input.name] && errors[input.name])
                            ? 'border-danger border'
                            : ''
                        }
                        onChange={handleChange}
                      >
                        {input.options.map((option) => (
                          <option value={option.value} key={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </FormControl>
                      <p className='text-danger m-1'>
                        {touched[input.name] && errors[input.name]}
                      </p>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <FormControl
                        name={input.name}
                        type={input.type}
                        value={values[input.name]}
                        className={
                          Boolean(touched[input.name] && errors[input.name])
                            ? 'border-danger border'
                            : ''
                        }
                        placeholder={input.label}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <p className='text-danger m-1'>
                        {touched[input.name] && errors[input.name]}
                      </p>
                    </Fragment>
                  )}
                </Form.Group>
              );
            })}
            <Button
              variant='outline-primary'
              className='btn-block btn-transparent-blue'
              type='submit'
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <div className='mt-3'>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
