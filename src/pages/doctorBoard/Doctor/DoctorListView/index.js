import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card } from 'react-bootstrap';
// import axios from 'src/utils/axios';
import Page from 'src/components/Page';
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Results from './Results';

const DoctorListView = () => {
  //   const isMountedRef = useIsMountedRef();
  //   const [customers, setCustomers] = useState([]);

  //   const getCustomers = useCallback(async () => {
  //     try {
  //       const response = await axios.get('/api/customers');

  //       if (isMountedRef.current) {
  //         setCustomers(response.data.customers);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }, [isMountedRef]);

  //   useEffect(() => {
  //     getCustomers();
  //   }, [getCustomers]);

  return (
    <Page className={classes.root} title='Customer List'>
      <Container maxWidth={false}>
        <Header />
        <Card mt={3}>
          <Results />
        </Card>
      </Container>
    </Page>
  );
};

const classes = {
  root: {
    backgroundColor: '#333',
    minHeight: '100%',
    paddingTop: '3em',
    paddingBottom: '3em',
  },
};

export default DoctorListView;
