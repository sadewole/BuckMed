import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, FormControl, Row, Col } from 'react-bootstrap';
import { dosageList, medicationTypeList, frequencyList } from './exports';
import {
  createPatientPrescription,
  updatePatientPrescriptionRecord,
} from 'src/slices/patient';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'src/store';

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
    drugType: '',
    startDate: '',
    period: '',
    note: '',
    errors: {},
  });
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
    console.log(content);
    //   setInputs((prevState) => ({
    //   ...prevState,
    //   recordId: content.id,
    //   roomNumber: content.roomNumber,
    //   bedNumber: content.bedNumber,
    // }))
  }, []);

  useEffect(() => {
    if (action === 'Edit') {
      updateForm(selectedContent);
    }
  }, [action, selectedContent, updateForm]);

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
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <FormControl
                  as='select'
                  name='drugType'
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
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <FormControl as='textarea' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-secondary' onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant='primary' type='submit' disabled={submitting}>
          {action === 'Edit' ? 'Edit & Save' : 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
