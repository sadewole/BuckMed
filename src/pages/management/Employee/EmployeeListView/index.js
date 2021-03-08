import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import { useDispatch, useSelector } from 'src/store';
import { fetchEmployee } from 'src/slices/user';

const DoctorListView = () => {
  const dispatch = useDispatch();
  const { allEmployee } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

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
          <Results doctors={allEmployee} />
        </Card>
      </Container>
    </Page>
  );
};

export default DoctorListView;
