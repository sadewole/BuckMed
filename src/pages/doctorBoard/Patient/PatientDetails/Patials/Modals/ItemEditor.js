import React, { useState } from 'react';
import {
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Divider,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import Icon from '@iconify/react';
import CloseIcon from '@iconify/icons-fa-solid/times';
import {
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const options = [
  'Treatment',
  'Laboratory test',
  'Consultant',
  'Material',
  'Drug',
  'Surgery related',
];

export default function ItemEditorDialog({ open, setOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [state, setState] = useState({
    name: '',
    quantity: '',
    price: '',
    type: '',
  });

  const handleClose = () => setOpen(false);

  const reset = () => {
    setState({
      id: Date.now().toString(),
      name: '',
      quantity: '',
      price: '',
      type: '',
    });
  };
  const handleFinish = (e) => {
    e.preventDefault();
    handleClose();
    reset();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
      style={{ minWidth: '700px' }}
    >
      <DialogTitle id='responsive-dialog-title'>
        <Typography variant='h6'>Item Editor</Typography>
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={handleClose}
        >
          <Icon icon={CloseIcon} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Form>
          <FormGroup>
            <FormLabel>Item Name</FormLabel>
            <Typeahead
              onChange={(selected) => {
                setState({ ...state, name: selected[0] });
              }}
              options={options}
              selected={state.name}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Type</FormLabel>
            <FormControl as='select'>
              <option value='none'>None</option>
              <option value='inventory_item'>Inventory Item</option>
              <option value='service_item'>Service Item</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Quantity</FormLabel>
            <FormControl type='number' />
          </FormGroup>
          <FormGroup>
            <FormLabel>Price</FormLabel>
            <FormControl type='number' />
          </FormGroup>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='primary'>
          Finish
        </Button>
        <Button onClick={handleClose} variant='warning'>
          + Add New
        </Button>
      </DialogActions>
    </Dialog>
  );
}
