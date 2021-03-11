import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import PatientInfo from './PatientInfo';
import Emails from './Emails';
import Invoices from './Invoices';
import OtherActions from './OtherActions';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Details = ({ patient, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={7} md={6} xs={12}>
        <PatientInfo patient={patient} />
      </Grid>
      <Grid item lg={5} md={6} xs={12}>
        <Invoices patient={patient} />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <Emails />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <OtherActions />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  patient: PropTypes.object.isRequired,
};

Details.defaultProps = {
  patient: {},
};

export default Details;
