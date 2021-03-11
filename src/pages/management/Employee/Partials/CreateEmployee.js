import React, { useState, Fragment } from 'react';
import {
  Modal,
  ModalBody,
  ModalTitle,
  Form,
  FormControl,
  Button,
  Alert,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'src/store';
import { createEmployee } from 'src/slices/user';
import { useSnackbar } from 'notistack';

const textInputs = [
  { name: 'firstname', label: 'First Name', type: 'text' },
  { name: 'lastname', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  {
    name: 'specialty',
    label: 'Specialty',
    type: 'select',
    options: [
      { value: '', text: '' },
      { value: 'doctor', text: 'Doctor' },
      { value: 'nurse', text: 'Nurse' },
      { value: 'lab technician', text: 'Lab Technician' },
      { value: 'radiologist', text: 'Radiologist' },
    ],
  },
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
  { name: 'address', label: 'Address', type: 'textarea' },
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
  firstname: Yup.string().max(255).required('First Name is required'),
  lastname: Yup.string().max(255).required('Last Name is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string()
    .min(5, 'Must be atleast 5 characters long')
    .required('Password is required'),
  specialty: Yup.string().required('Specialty is required'),
  address: Yup.string().required('Address is required'),
});

const CreateDoctor = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    specialty: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    address: '',
    submit: null,
  });

  return (
    <Modal size='lg' show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <ModalTitle>Create Employee</ModalTitle>
      </Modal.Header>
      <ModalBody>
        <Formik
          initialValues={inputs}
          validationSchema={validate}
          onSubmit={(
            values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            const { submit, ...rest } = values;

            dispatch(createEmployee(rest))
              .then((res) => {
                if (res.success === true) {
                  setStatus({ success: true });
                  resetForm();

                  enqueueSnackbar(res.message, {
                    variant: 'success',
                  });
                } else {
                  throw new Error(res.message);
                }
              })
              .catch((err) => {
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
            setErrors,
            touched,
            values,
          }) => (
            <Form noValidate onSubmit={handleSubmit} className='row p-3'>
              {textInputs.map((input, index) => {
                return (
                  <Form.Group key={index} className='col-12 col-sm-6'>
                    <Form.Label>{input.label}</Form.Label>
                    {['text', 'email', 'password', 'date'].includes(
                      input.type
                    ) ? (
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
                    ) : input.type === 'select' ? (
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
                          as='textarea'
                          name={input.name}
                          value={values[input.name]}
                          onBlur={handleBlur}
                          className={
                            Boolean(touched[input.name] && errors[input.name])
                              ? 'border-danger border'
                              : ''
                          }
                          onChange={handleChange}
                          row={3}
                        />
                        <p className='text-danger m-1'>
                          {touched[input.name] && errors[input.name]}
                        </p>
                      </Fragment>
                    )}
                  </Form.Group>
                );
              })}
              {errors.submit && (
                <Alert
                  className='w-100'
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
                Create Employee
              </Button>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default CreateDoctor;
