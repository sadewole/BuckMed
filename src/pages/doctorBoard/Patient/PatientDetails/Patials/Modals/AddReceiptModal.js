import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  TableRow,
  TableCell,
} from '@material-ui/core';
import Icon from '@iconify/react';
import CloseIcon from '@iconify/icons-fa-solid/times';
import trashIcon from '@iconify/icons-fa-solid/trash-alt';
import ItemEditorDialog from './ItemEditor';
import Table from 'src/components/CustomTable';
import { currencyFormatter } from 'src/utils/formatter';

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

export default function AddReceiptModal({ showModal, setShowModal, bill }) {
  const classes = useStyles();
  const [itemEditor, setItemEditor] = useState(false);
  const [items, setItems] = useState([]);
  const handleCloseModal = () => setShowModal(false);
  const handleItemEditor = () => setItemEditor(true);

  const header = ['name', 'quantity', 'price', 'type', '-'];

  const deleteItem = (id) => {
    let itemTemp = [...items];
    let filterItem = itemTemp.filter((temp) => temp.id !== id);
    setItems(filterItem);
  };

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
          <Typography
            variant='h6'
            className={`text-capitalize ${classes.title}`}
          >
            {bill}
          </Typography>
          <Button autoFocus color='inherit' onClick={handleCloseModal}>
            save {bill}
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
                <Form.Label>No. </Form.Label>
                <FormControl type='text' />
              </Form.Group>
              <Form.Group className='mr-1'>
                <Form.Label>Series </Form.Label>
                <FormControl type='text' />
              </Form.Group>
              {bill === 'receipt' && (
                <Form.Group className='mr-1'>
                  <Form.Label>Method</Form.Label>
                  <FormControl as='select'>
                    <option value='cash'>Cash</option>
                    <option value='credit_card'>Credit Card</option>
                    <option value='payment_order'>Payment Order</option>
                  </FormControl>
                </Form.Group>
              )}
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
        <div className='mt-3'>
          <Table header={header}>
            {items.length > 0 ? (
              items.map((item) => {
                return (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{currencyFormatter(item.price)}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell onClick={() => deleteItem(item.id)}>
                      <Icon icon={trashIcon} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan='100%'
                  align='center'
                  style={{ color: 'darkgray', padding: '30px' }}
                >
                  Create new item
                </TableCell>
              </TableRow>
            )}
          </Table>
        </div>
      </Container>

      {/** modal */}
      <ItemEditorDialog
        setOpen={setItemEditor}
        open={itemEditor}
        setItem={setItems}
      />
    </Dialog>
  );
}

AddReceiptModal.propTypes = {
  bill: PropTypes.oneOf(['receipt', 'invoice']),
};
