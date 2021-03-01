import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormControl, FormLabel } from 'react-bootstrap';
import { Box, Card, CardContent, Divider } from '@material-ui/core';

const MedicHistory = (props) => {
  return (
    <Box className='my-4'>
      <Card>
        <CardContent>
          <Row>
            <Col md='4'>
              <Form.Group>
                <FormLabel>High Blood Pressure</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>High Cholesterol</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Vein Trouble</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Kidney Disease</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Nervous Disorder</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Pulmonary Embolus</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='4'>
              {' '}
              <Form.Group>
                <FormLabel>Asthma</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Asthma</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Tuberculosis</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Asthma</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Asthma</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Heart Trouble</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Cancer</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Stroke</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Pneumonia</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>HIV</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Bleeding Tendencies</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Lung Diease</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col md='4'>
              {' '}
              <Form.Group>
                <FormLabel>Alcohol use</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Tobacco use</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Exercise</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
              <Form.Group>
                <FormLabel>Sleep</FormLabel>
                <FormControl as='select'>
                  <option value=''></option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <FormLabel>Other</FormLabel>
                <FormControl type='text' />
              </Form.Group>
            </Col>
          </Row>
        </CardContent>
      </Card>
    </Box>
  );
};

MedicHistory.propTypes = {};

export default MedicHistory;
