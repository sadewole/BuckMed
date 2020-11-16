import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import minusCircle from '@iconify/icons-fa-solid/minus-circle';
import { Typography } from '@material-ui/core';
import PatientBio from './Patials/PatientBio';
import PatientMedic from './Patials/PatientMedic';
import Page from 'src/components/Page';
import Header from './Header';
import Others from './Patials/Others';
import MedicHistory from './Patials/MedicHistory';

const NewPatient = () => {
  const match = useRouteMatch({
    path: '/doctor/management/patients/:patientId/edit',
    exact: true,
  });
  const [title, setTitle] = useState('new patient');
  const [showHistory, setShowHistory] = useState(false);
  const [showMorePatient, setShowMorePatient] = useState(false);

  useEffect(() => {
    if (match) {
      setTitle('Edit patient');
    }
  }, [match]);

  return (
    <Page
      title='New Patient'
      style={{
        minHeight: '100%',
        paddingTop: '1em',
        paddingBottom: '3em',
      }}
    >
      <Container fluid>
        <Header title={title} />
        <Form className='my-5'>
          <PatientBio />
          <PatientMedic />
          <div className='d-flex my-3'>
            <Typography variant='h6' className='mr-2'>
              More Patient Info
            </Typography>
            <InlineIcon
              icon={!showMorePatient ? plusCircle : minusCircle}
              className='fa-2x text-primary cursor-pointer'
              onClick={() => setShowMorePatient(!showMorePatient)}
            />
          </div>
          {showMorePatient ? <Others /> : null}
          <div className='d-flex my-3'>
            <Typography variant='h6' className='mr-2'>
              Medical History
            </Typography>
            <InlineIcon
              icon={!showHistory ? plusCircle : minusCircle}
              className='fa-2x text-primary cursor-pointer'
              onClick={() => setShowHistory(!showHistory)}
            />
          </div>
          {showHistory ? <MedicHistory /> : null}
          <Button variant='outline-primary' className='btn-transparent-blue'>
            Submit
          </Button>
        </Form>
      </Container>
    </Page>
  );
};

export default NewPatient;
