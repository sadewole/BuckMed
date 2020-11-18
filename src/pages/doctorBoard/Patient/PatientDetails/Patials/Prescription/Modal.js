import React from 'react';
import { Modal, Button, Form, FormControl, Row, Col } from 'react-bootstrap';
import { dosageList, medicationTypeList, frequencyList } from './exports';

export const PrescriptionModal = ({ showModal, setShowModal }) => {
  const handleCloseModal = () => setShowModal(false);

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop='static'
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Drug Prescription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md='4'>
              <Form.Group>
                <Form.Label>Drug Name</Form.Label>
                <FormControl type='text' />
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <Form.Label>Type</Form.Label>
                <FormControl as='select'>
                  <option value=''></option>
                  {medicationTypeList.map((list, index) => (
                    <option key={index} value={list.name}>
                      {list.name}
                    </option>
                  ))}
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='4'>
              <Form.Group>
                <Form.Label>Dosage</Form.Label>
                <FormControl as='select'>
                  <option value=''></option>
                  {dosageList.map((list, index) => (
                    <option value={list.name} key={index}>
                      {list.name}
                    </option>
                  ))}
                </FormControl>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <Form.Group>
                <Form.Label>
                  Period <small>(days)</small>
                </Form.Label>
                <FormControl as='select'>
                  <option value=''></option>
                  {frequencyList.map((list, index) => (
                    <option value={list.name} key={index}>
                      {list.name}
                    </option>
                  ))}
                </FormControl>
              </Form.Group>
            </Col>
            <Col md='6'>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <FormControl type='date' />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <FormControl as='textarea' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-secondary' onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant='primary'>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};
