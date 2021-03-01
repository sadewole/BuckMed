import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

import 'src/__mocks__/patients';

const DoctorListView = () => {
  const isMountedRef = useIsMountedRef();
  const [patients, setPatients] = useState([]);

  const getAllPatients = useCallback(async () => {
    try {
      const response = await axios.get('/api/patients');

      if (isMountedRef.current) {
        setPatients(response.data.patients);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPatients();
  }, [getAllPatients]);

  return (
    <Page
      style={{
        minHeight: '100%',
        paddingTop: '1em',
        paddingBottom: '3em',
      }}
      title='Patients List'
    >
      <Container fluid>
        <Header />
        <Card className='mt-3' style={{ borderRadius: '1rem' }}>
          <Results patients={patients} />
        </Card>
      </Container>
    </Page>
  );
};

export default DoctorListView;
