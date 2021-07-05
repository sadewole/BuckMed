import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, FormControl, Alert } from 'react-bootstrap';
import { createTimelineRecord } from 'src/slices/patient';

import { useSnackbar } from 'notistack';
import { useDispatch } from 'src/store';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AddTimeline = ({ openModal, setOpenModal }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [docFile, setDocFile] = useState();
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Modal
      show={openModal}
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
            patientId: params.patientId,
            title: '',
            description: '',
            date: '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('Title is required'),
            date: Yup.string().required('Date is required'),
          })}
          onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
            const formData = new FormData();
            formData.append('patientId', values.patientId);
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('date', values.date);
            formData.append('document', docFile);

            dispatch(createTimelineRecord(formData))
              .then((res) => {
                if (res.success === true) {
                  handleCloseModal();
                  resetForm();
                  enqueueSnackbar('Created successfully', {
                    variant: 'success',
                  });
                }
              })
              .catch(console.log)
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
            <Form
              noValidate
              onSubmit={handleSubmit}
              encType='multipart/form-data'
            >
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
                <p className='text-danger m-1'>{errors.title}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <FormControl
                  type='date'
                  name='date'
                  value={values.date}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={
                    Boolean(touched.date && errors.date)
                      ? 'border-danger border'
                      : ''
                  }
                />
                <p className='text-danger m-1'>{errors.date}</p>
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
                  onChange={(e) => setDocFile(e.target.files[0])}
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
                disabled={isSubmitting}
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
