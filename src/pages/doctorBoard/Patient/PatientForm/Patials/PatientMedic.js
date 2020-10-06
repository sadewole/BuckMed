import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormControl, FormLabel } from 'react-bootstrap';
import { Box, Card, CardContent } from '@material-ui/core';

const PatientMedic = (props) => {
  return (
    <Box className='my-4'>
      <Card>
        <CardContent>
          <Row>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Medic</FormLabel>
                <FormControl as='select' />
              </Form.Group>
              <Form.Group>
                <FormLabel>Family Medic</FormLabel>
                <FormControl as='select' />
              </Form.Group>
              <Form.Group>
                <FormLabel>Entry Date</FormLabel>
                <FormControl type='date' />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Parent No.</FormLabel>
                <FormControl type='text' placeholder='Enter parent number' />
              </Form.Group>
              <Form.Group>
                <FormLabel>Referer</FormLabel>
                <FormControl type='text' placeholder='Enter referer name' />
              </Form.Group>
              <Form.Group>
                <FormLabel>Release Date</FormLabel>
                <FormControl type='date' />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Transfer Letter</FormLabel>
                <FormControl type='text' placeholder='Enter transfer letter' />
              </Form.Group>
              <Form.Group>
                <FormLabel>Reference Number</FormLabel>
                <FormControl type='text' placeholder='Enter reference number' />
              </Form.Group>
              <Form.Group>
                <FormLabel>DOD</FormLabel>
                <FormControl type='date' />
              </Form.Group>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Box>
  );
};

PatientMedic.propTypes = {};

export default PatientMedic;
