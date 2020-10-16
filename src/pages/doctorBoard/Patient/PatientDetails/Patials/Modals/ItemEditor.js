import React from 'react';
import {
  useTheme,
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Divider,
  Typography,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import Icon from '@iconify/react';
import CloseIcon from '@iconify/icons-fa-solid/times';

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

export default function ItemEditorDialog({ open, setOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
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
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color='primary'>
          Disagree
        </Button>
        <Button onClick={handleClose} color='primary' autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
