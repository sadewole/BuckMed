import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormControl, Row, Col } from 'react-bootstrap';
import {
  Slide,
  Toolbar,
  Typography,
  Dialog,
  AppBar,
  makeStyles,
  IconButton,
  Container,
  Box,
} from '@material-ui/core';
import Icon from '@iconify/react';
import CloseIcon from '@iconify/icons-fa-solid/times';
import ItemEditorDialog from './ItemEditor';
import Table from 'src/components/Table';
import TableRow from 'src/components/TableRow';
import TableCell from 'src/components/TableCell';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: '#fff !important',
    color: '#000 !important',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const AddReceiptModal = ({ showModal, setShowModal }) => {
  const classes = useStyles();
  const [itemEditor, setItemEditor] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleItemEditor = () => setItemEditor(true);

  const header = ['name', 'quantity', 'price', 'type', '-'];

  return (
    <Dialog
      fullScreen
      open={showModal}
      onClose={handleCloseModal}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleCloseModal}
            aria-label='close'
          >
            <Icon icon={CloseIcon} />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Receipt
          </Typography>
          <Button autoFocus color='inherit' onClick={handleCloseModal}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Container className='my-4'>
        <Form>
          <Row>
            <Col md='6'>
              <div className='row mb-3'>
                <h4 className='col-4'>Patient Name:</h4>
                <h4 className='col-8'>{'Obafemi Obaseki'}</h4>
              </div>
              <div className='row'>
                <h4 className='col-4'>Address:</h4>
                <h4 className='col-8'>
                  <span>9/12 Agege</span>
                  <span>Ipaja</span>
                  <span>Ajah Island</span>
                  <span> Abeokuta</span>
                </h4>
              </div>
            </Col>
            <Col md='6' className='d-flex'>
              <Form.Group className='mr-1'>
                <Form.Label>Date </Form.Label>
                <FormControl type='date' />
              </Form.Group>
              <Form.Group className='mr-1'>
                <Form.Label>No </Form.Label>
                <FormControl type='text' />
              </Form.Group>
              <Form.Group className='mr-1'>
                <Form.Label>Series </Form.Label>
                <FormControl type='text' />
              </Form.Group>
              <Form.Group className='mr-1'>
                <Form.Label>Method</Form.Label>
                <FormControl as='select'>
                  <option value='cash'>Cash</option>
                  <option value='credit_card'>Credit Card</option>
                  <option value='payment_order'>Payment Order</option>
                </FormControl>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Button
          variant='outlined-primary'
          className='btn btn-transparent-blue'
          onClick={handleItemEditor}
        >
          Add Item
        </Button>
        <div className="mt-3">
        
        <Table header={header}>
          <TableRow>
            <TableCell empty>Create new item</TableCell>
          </TableRow>
        </Table>
        </div>
      </Container>

      {/** modal */}
      <ItemEditorDialog setOpen={setItemEditor} open={itemEditor} />
    </Dialog>
  );
};
