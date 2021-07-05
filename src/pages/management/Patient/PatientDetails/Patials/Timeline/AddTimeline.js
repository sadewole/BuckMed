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
import Formik from 'formik';
import * as Yup from 'yup';

const AddTimeline = ({ showModal }) => {
  const handleCloseModal = () => {};
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Timeline</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            patientId: 'string',
            title: '',
            description: '',
            date: '',
            document: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('Title is required'),
            date: Yup.string().required('Date is required'),
          })}
          onSubmit={(values, { ...formiks }) => {
            const { submit, ...rest } = values;
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
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <FormControl
                  type='text'
                  name='title'
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    Boolean(touched.title && errors.title)
                      ? 'border-danger border'
                      : ''
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <FormControl
                  type='date'
                  name='title'
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    Boolean(touched.date && errors.date)
                      ? 'border-danger border'
                      : ''
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <FormControl
                  as='textarea'
                  name='description'
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Document</Form.Label>
                <FormControl
                  type='file'
                  name='document'
                  value={values.document}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Group>
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
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddTimeline;
