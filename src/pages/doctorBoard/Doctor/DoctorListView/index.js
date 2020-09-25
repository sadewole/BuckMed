import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

import 'src/__mocks__/doctors';

const DoctorListView = () => {
  const isMountedRef = useIsMountedRef();
  const [doctors, setDoctors] = useState([]);

  const getDoctors = useCallback(async () => {
    try {
      const response = await axios.get('/api/doctors');

      if (isMountedRef.current) {
        setDoctors(response.data.doctors);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);

  return (
    <Page
      style={{
        minHeight: '100%',
        paddingTop: '1em',
        paddingBottom: '3em',
      }}
      title='Doctor List'
    >
      <Container fluid>
        <Header />
        <Card className='mt-3' style={{ borderRadius: '1rem' }}>
          <Results doctors={doctors} />
        </Card>
      </Container>
    </Page>
  );
};

export default DoctorListView;
