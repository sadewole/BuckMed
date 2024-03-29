import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Modal,
  Button,
  Form,
  FormControl,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import { dosageList, medicationTypeList, frequencyList } from './exports';
import {
  createPatientPrescription,
  updatePatientPrescriptionRecord,
} from 'src/slices/patient';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'src/store';
import moment from 'moment';

export const PrescriptionModal = ({
  showModal,
  action,
  setAction,
  setShowModal,
  selectedContent,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const [inputs, setInputs] = useState({
    drugName: '',
    dosage: '',
    patientId: params.patientId,
    recordId: '',
    drugType: '',
    startDate: '',
    period: '',
    note: '',
    errors: {},
  });
  const [isFieldError, setIsFieldError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setAction();
    cleanForm();
  };

  // Validation
  const validate = (values) => {
    let errors = {};
    let matches = false;

    if (values.drugName === '') {
      errors.drugName = 'Drug name is required';
      matches = true;
    }

    if (values.dosage === '') {
      errors.dosage = 'Dosage is required';
      matches = true;
    }

    if (values.drugType === '') {
      errors.drugType = 'Drug type is required';
      matches = true;
    }

    if (values.startDate === '') {
      errors.startDate = 'Start date is required';
      matches = true;
    }

    if (values.period === '') {
      errors.period = 'Period is required';
      matches = true;
    }

    if (values.note === '') {
      errors.note = 'Note is required';
      matches = true;
    }

    setInputs((prevState) => ({
      ...prevState,
      errors: { ...prevState.errors, ...errors },
    }));

    setIsFieldError(matches);

    return matches;
  };

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

  const cleanForm = useCallback(
    () =>
      setInputs({
        drugName: '',
        dosage: '',
        patientId: params.patientId,
        recordId: '',
        drugType: '',
        startDate: '',
        period: '',
        note: '',
        errors: {},
      }),
    [params.patientId]
  );

  // handle update form
  const updateForm = useCallback((content) => {
    setInputs((prevState) => ({
      ...prevState,
      recordId: content.id,
      drugName: content.drugName,
      drugType: content.drugType,
      dosage: content.dosage,
      startDate: moment(content.startDate).format('YYYY-MM-DD'),
      period: content.period,
      note: content.note,
    }));
  }, []);

  useEffect(() => {
    if (action === 'Edit') {
      updateForm(selectedContent);
    }
  }, [action, selectedContent, updateForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, ...rest } = inputs;

    if (validate(rest)) {
      return;
    }

    let actionDispatch;

    if (action === 'Edit') {
      actionDispatch = dispatch(
        updatePatientPrescriptionRecord(rest.recordId, rest)
      );
    } else {
      actionDispatch = dispatch(createPatientPrescription(rest));
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
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{action} Drug Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col md='4'>
              <Form.Group>
                <Form.Label>Drug Name</Form.Label>
                <FormControl
                  type='text'
                  name='drugName'
                  value={inputs.drugName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    Boolean(inputs.errors['drugName'])
                      ? 'border-danger border'
                      : ''
                  }
                />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <FormControl
                  as='select'
                  name='drugType'
                  value={inputs.drugType}
                  className={
                    Boolean(inputs.errors['drugType'])
                      ? 'border-danger border'
                      : ''
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value=''></option>
                  {medicationTypeList.map((list, index) => (
                    <option key={index} value={list.name}>
                      {list.name}
                    </option>
                  ))}
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <Form.Label>Dosage</Form.Label>
                <FormControl
                  as='select'
                  name='dosage'
                  value={inputs.dosage}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    Boolean(inputs.errors['dosage'])
                      ? 'border-danger border'
                      : ''
                  }
                >
                  <option value=''></option>
                  {dosageList.map((list, index) => (
                    <option value={list.name} key={index}>
                      {list.name}
                    </option>
                  ))}
                </FormControl>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <Form.Group>
                <Form.Label>
                  Period <small>(days)</small>
                </Form.Label>
                <FormControl
                  as='select'
                  name='period'
                  value={inputs.period}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    Boolean(inputs.errors['period'])
                      ? 'border-danger border'
                      : ''
                  }
                >
                  <option value=''></option>
                  {frequencyList.map((list, index) => (
                    <option value={list.name} key={index}>
                      {list.name}
                    </option>
                  ))}
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='6'>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <FormControl
                  type='date'
                  name='startDate'
                  value={inputs.startDate}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    Boolean(inputs.errors['startDate'])
                      ? 'border-danger border'
                      : ''
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <FormControl
              as='textarea'
              name='note'
              value={inputs.note}
              onBlur={handleBlur}
              onChange={handleChange}
              className={
                Boolean(inputs.errors['note']) ? 'border-danger border' : ''
              }
            />
          </Form.Group>
          {isFieldError && (
            <p className='text-danger m-1'>Missing field is required</p>
          )}
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
            {action === 'Edit' ? 'Edit & Save' : 'Submit'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
