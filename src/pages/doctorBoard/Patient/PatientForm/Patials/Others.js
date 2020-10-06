import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormControl, FormLabel } from 'react-bootstrap';
import { Box, Card, CardContent, Divider } from '@material-ui/core';

const Others = (props) => {
  return (
    <Box className='my-4'>
      <Card>
        <CardContent>
          <Row>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Street</FormLabel>
                <FormControl as='textarea' placeholder='Enter street address' />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>City</FormLabel>
                <FormControl type='text' placeholder='Enter city' />
              </Form.Group>
              <Form.Group>
                <FormLabel>Zip Code</FormLabel>
                <FormControl type='text' placeholder='Enter zip code' />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>State/Province</FormLabel>
                <FormControl type='text' placeholder='Enter state' />
              </Form.Group>
              <Form.Group>
                <FormLabel>Country/Region</FormLabel>
                <FormControl type='text' placeholder='Enter country' />
              </Form.Group>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Phone</FormLabel>
                <FormControl type='text' placeholder='Enter city' />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Email</FormLabel>
                <FormControl type='email' placeholder='Enter city' />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Fax</FormLabel>
                <FormControl type='text' placeholder='Enter city' />
              </Form.Group>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Language </FormLabel>
                <FormControl type='text' placeholder='Enter language' />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Blood Type</FormLabel>
                <FormControl as='select'>
                  <option value='AB'>AB</option>
                  <option value='A'>A</option>
                  <option value='B'>B</option>
                  <option value='O'>O</option>
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>RH Factor</FormLabel>
                <FormControl as='select'>
                  <option value='plus'>+</option>
                  <option value='minus'>-</option>
                </FormControl>
              </Form.Group>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Box>
  );
};

Others.propTypes = {};

export default Others;
