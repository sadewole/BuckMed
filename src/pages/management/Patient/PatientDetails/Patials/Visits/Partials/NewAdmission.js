import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import {
  createPatientAdmission,
  updatePatientAdmissionRecord,
} from 'src/slices/patient';
import { useSnackbar } from 'notistack';

const textInputs = [
  { name: 'admittedOn', label: 'Admitted date', type: 'date' },
  { name: 'dischargedOn', label: 'Discharged date', type: 'date' },
  { name: 'roomNumber', label: 'Room number', type: 'text' },
  { name: 'bedNumber', label: 'Bed number', type: 'text' },
];

const validate = Yup.object().shape({
  admittedOn: Yup.string().required('Admitted date is required'),
  dischargedOn: Yup.string().required('Discharged date is required'),
  roomNumber: Yup.string().required('Room number is required'),
  bedNumber: Yup.string().required('Bed number is required'),
});

const NewAdmission = ({ setShow, show, action, selectedContent }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    patientId: params.patientId,
    admittedOn: '',
    dischargedOn: '',
    roomNumber: '',
    bedNumber: '',
    submit: null,
  });

  // handle update form
  const updateForm = useCallback(
    (content) =>
      setInputs({
        patientId: params.patientId,
        admittedOn: content.admittedOn,
        dischargedOn: content.dischargedOn,
        roomNumber: content.roomNumber,
        bedNumber: content.bedNumber,
        submit: null,
      }),
    [params.patientId]
  );

  const cleanForm = useCallback(
    () =>
      setInputs({
        patientId: params.patientId,
        admittedOn: '',
        dischargedOn: '',
        roomNumber: '',
        bedNumber: '',
        submit: null,
      }),
    [params.patientId]
  );

  useEffect(() => {
    console.log(selectedContent);
    if (action === 'Edit' && selectedContent.hasOwnProperty('id')) {
      console.log('selectedContent', selectedContent);
      updateForm(selectedContent);
    } else {
      cleanForm();
    }
  }, [action, cleanForm, selectedContent, updateForm]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <ModalTitle>{`${action} Patient Admission`}</ModalTitle>
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

            let actionDispatch;

            if (action === 'Edit') {
              actionDispatch = dispatch(
                updatePatientAdmissionRecord(rest.patientId, rest)
              );
            } else {
              actionDispatch = dispatch(createPatientAdmission(rest));
            }

            actionDispatch
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
            <Form noValidate onSubmit={handleSubmit} className='p-3'>
              {textInputs.map((input, index) => {
                return (
                  <Form.Group key={index}>
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
                {`${action} Admission`}
              </Button>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

NewAdmission.defaultProps = {
  selectedContent: {},
};

NewAdmission.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  selectedContent: PropTypes.object,
};

export default NewAdmission;
