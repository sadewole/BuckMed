import React, { useState } from 'react';
import {
  Card,
  Modal,
  Button,
  Form,
  FormControl,
  Row,
  Col,
} from 'react-bootstrap';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar';
import { InlineIcon } from '@iconify/react';
import plusCircle from '@iconify/icons-fa-solid/plus-circle';
import Table from 'src/components/Table';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';

const header = [
  'Drug Name',
  'Drug quality',
  'Dosage',
  'Start date',
  'Period',
  'Note',
  'Actions',
];

const Prescription = ({ drugs }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Button variant='primary' onClick={handleShowModal} className='my-3'>
        <InlineIcon icon={plusCircle} className='mr-1' />
        Add Drug Precription
      </Button>
      <Card>
        <HorizontalScrollbar>
          <div style={{ minWidth: '700px' }}>
            <Table header={header}>
              {drugs.map((drug) => {
                return (
                  <TableRow hover key={drug.id}>
                    <TableCell>{drug.drug_name}</TableCell>
                    <TableCell>{drug.drug_quality}</TableCell>
                    <TableCell>{drug.dosage}</TableCell>
                    <TableCell>{drug.start_date}</TableCell>
                    <TableCell>{drug.period}</TableCell>
                    <TableCell>{drug.note}</TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </div>
        </HorizontalScrollbar>
      </Card>

      {/** add Modal */}
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
                  <Form.Label>Drug Quality</Form.Label>
                  <FormControl as='select'>
                    <option value=''></option>
                    <option value='400mg'>400 micro g</option>
                    <option value='fctb200mg'>f.c.tb 200mg</option>
                    <option value='tb100mg'>tb 100mg</option>
                    <option value='tb50mg'>tb 50mg</option>
                    <option value='tb30mg'>tb 30mg</option>
                    <option value='tb25mg'>tb 25mg</option>
                    <option value='tb20mg'>tb 20mg</option>
                    <option value='tb5mg'>tb 5mg</option>
                    <option value='vial80mg'>vial 80mg</option>
                  </FormControl>
                </Form.Group>
              </Col>
              <Col md='4'>
                <Form.Group>
                  <Form.Label>Dosage</Form.Label>
                  <FormControl as='select'>
                    <option value=''></option>
                    <option value='1tb'>1 tb</option>
                    <option value='2tb'>2 tbs</option>
                    <option value='3tb'>3 tbs</option>
                    <option value='1vial'>1 vial</option>
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
                  <FormControl type='text' />
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
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='primary'>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Prescription.defaultProps = {
  drugs: [],
};

export default Prescription;
