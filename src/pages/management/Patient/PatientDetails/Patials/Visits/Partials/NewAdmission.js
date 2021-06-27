import React, { useState, useEffect, useCallback } from 'react';
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
import { useDispatch } from 'src/store';
import {
  createPatientAdmission,
  updatePatientAdmissionRecord,
} from 'src/slices/patient';
import { useSnackbar } from 'notistack';
import moment from 'moment';

const textInputs = [
  { name: 'admittedOn', label: 'Admitted date', type: 'date' },
  { name: 'dischargedOn', label: 'Discharged date', type: 'date' },
  { name: 'roomNumber', label: 'Room number', type: 'text' },
  { name: 'bedNumber', label: 'Bed number', type: 'text' },
];

const NewAdmission = ({
  setShow,
  show,
  action,
  selectedContent,
  setAction,
}) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [inputs, setInputs] = useState({
    patientId: params.patientId,
    recordId: '',
    admittedOn: '',
    dischargedOn: '',
    roomNumber: '',
    bedNumber: '',
    errors: {},
    submit: null,
  });
  const [submitting, setSubmitting] = useState(false);

  // Validation
  const validate = (values) => {
    let errors = {};
    let matches = false;

    if (values.admittedOn === '') {
      errors.admittedOn = 'Admitted date is required';
      matches = true;
    }

    if (values.dischargedOn === '') {
      errors.dischargedOn = 'Discharged date is required';
      matches = true;
    }

    if (values.roomNumber === '') {
      errors.roomNumber = 'Room number is required';
      matches = true;
    }

    if (values.bedNumber === '') {
      errors.bedNumber = 'Bed number is required';
      matches = true;
    }

    setInputs((prevState) => ({
      ...prevState,
      errors: { ...prevState.errors, ...errors },
    }));

    return matches;
  };

  const handleCloseModal = () => {
    setShow(false);
    setAction();
    cleanForm();
  };

  // handle update form
  const updateForm = useCallback(
    (content) =>
      setInputs((prevState) => ({
        ...prevState,
        recordId: content.id,
        admittedOn: moment(content.admittedOn).format('YYYY-MM-DD'),
        dischargedOn: moment(content.dischargedOn).format('YYYY-MM-DD'),
        roomNumber: content.roomNumber,
        bedNumber: content.bedNumber,
      })),
    []
  );

  const cleanForm = useCallback(
    () =>
      setInputs({
        patientId: params.patientId,
        recordId: '',
        admittedOn: '',
        dischargedOn: '',
        roomNumber: '',
        bedNumber: '',
        errors: {},
        submit: null,
      }),
    [params.patientId]
  );

  useEffect(() => {
    if (action === 'Edit') {
      updateForm(selectedContent);
    }
  }, [action, selectedContent, updateForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
      errors: { [name]: '' },
    }));
  };

  // handle input onBlur / onFocus
  const handleBlur = (e) => {
    const value = { [e.target.name]: e.target.value };
    validate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { submit, ...rest } = inputs;

    if (validate(rest)) {
      return;
    }

    console.log(rest);

    let actionDispatch;

    if (action === 'Edit') {
      actionDispatch = dispatch(
        updatePatientAdmissionRecord(rest.recordId, rest)
      );
    } else {
      actionDispatch = dispatch(createPatientAdmission(rest));
    }

    setSubmitting(true);
    actionDispatch
      .then((res) => {
        if (res.success === true) {
          handleCloseModal();
          enqueueSnackbar(res.message, {
            variant: 'success',
          });
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        setInputs((prevState) => ({
          ...prevState,
          errors: { ...prevState.errors, submit: err.message },
        }));
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <ModalTitle>{`${action} Patient Admission`}</ModalTitle>
      </Modal.Header>
      <ModalBody>
        <Form noValidate onSubmit={handleSubmit} className='p-3'>
          {textInputs.map((input, index) => {
            return (
              <Form.Group key={index}>
                <Form.Label>{input.label}</Form.Label>
                <FormControl
                  name={input.name}
                  type={input.type}
                  value={inputs[input.name]}
                  className={
                    Boolean(inputs.errors[input.name])
                      ? 'border-danger border'
                      : ''
                  }
                  placeholder={input.label}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className='text-danger m-1'>{inputs.errors[input.name]}</p>
              </Form.Group>
            );
          })}
          {inputs['errors'].submit && (
            <Alert
              className='w-100'
              variant='danger'
              onClose={() =>
                setInputs((prevState) => ({
                  ...prevState,
                  errors: { ...prevState.errors, submit: null },
                }))
              }
              dismissible
            >
              {inputs['errors'].submit}
            </Alert>
          )}
          <Button
            type='submit'
            variant='outline-primary'
            className='btn-block btn-transparent-blue'
            disabled={submitting}
          >
            {`${action} Admission`}
          </Button>
        </Form>
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
