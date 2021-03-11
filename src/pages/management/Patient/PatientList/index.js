import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import { useDispatch, useSelector } from 'src/store';
import { fetchAllPatient } from 'src/slices/patient';

const DoctorListView = () => {
  const dispatch = useDispatch();
  const { allPatient } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(fetchAllPatient());
  }, [dispatch]);

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
          <Results patients={allPatient} />
        </Card>
      </Container>
    </Page>
  );
};

export default DoctorListView;
