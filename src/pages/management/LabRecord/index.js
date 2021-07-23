import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import Page from 'src/components/Page';
import Results from './Results';
import { useDispatch, useSelector } from 'src/store';
import { fetchAllPatient } from 'src/slices/patient';
import { useParams } from "react-router-dom";

const History = () => {
  const dispatch = useDispatch();
  const { allPatient, allRecords } = useSelector((state) => state.patient);
  
  const { patientId } = useParams();
  useEffect(() => {
    dispatch(fetchAllPatient());
  }, [dispatch, patientId]);

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
        <Card className='mt-3' style={{ borderRadius: '1rem' }}>
          <Results patients={allPatient} />
          {
            console.log(allRecords)
          }
        </Card>
      </Container>
    </Page>
  );
};

export default History;
