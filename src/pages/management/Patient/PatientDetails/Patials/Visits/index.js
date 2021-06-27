import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Results from './Results';
import { useDispatch, useSelector } from 'src/store';
import { fetchPatientAdmissionRecords } from 'src/slices/patient';

const Visits = () => {
  const [show, setShow] = useState(false);
  const [selectedContent, setSelectedContent] = useState({});
  const [action, setAction] = useState('Create');
  const dispatch = useDispatch();
  const { admissionRecord } = useSelector((state) => state.patient);
  const { patientId } = useParams();

  useEffect(() => {
    dispatch(fetchPatientAdmissionRecords(patientId));
  }, [dispatch, patientId]);

  return (
    <Container>
      <Header
        show={show}
        setShow={setShow}
        setAction={setAction}
        setSelectedContent={setSelectedContent}
      />
      <div className='mt-3' style={{ borderRadius: '1rem' }}>
        <Results
          datas={admissionRecord}
          show={show}
          setShow={setShow}
          action={action}
          setAction={setAction}
          setSelectedContent={setSelectedContent}
          selectedContent={selectedContent}
        />
      </div>
    </Container>
  );
};

export default Visits;
