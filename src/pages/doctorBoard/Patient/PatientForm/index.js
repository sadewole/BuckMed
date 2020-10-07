import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import { Typography } from '@material-ui/core';
import PatientBio from './Patials/PatientBio';
import PatientMedic from './Patials/PatientMedic';
import Page from 'src/components/Page';
import Header from './Header';
import Others from './Patials/Others';
import MedicHistory from './Patials/MedicHistory';

const NewPatient = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showMorePatient, setShowMorePatient] = useState(false);

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
        <Header />
        <Form className='my-5'>
          <PatientBio />
          <PatientMedic />
          <div className='d-flex my-3'>
            <Typography variant='h6' className='mr-2'>
              More Patient Info
            </Typography>
            <InlineIcon
              icon={plusCircle}
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
              icon={plusCircle}
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
