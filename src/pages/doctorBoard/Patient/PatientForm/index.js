import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Box } from '@material-ui/core';
import PatientBio from './Patials/PatientBio';
import Page from 'src/components/Page';
import Header from './Header';

const NewPatient = (props) => {
  return (
    <Page>
      <Container fluid>
        <Header />
        <Box>
          <PatientBio />
        </Box>
      </Container>
    </Page>
  );
};

NewPatient.propTypes = {};

export default NewPatient;
