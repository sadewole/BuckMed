import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const PatientInfo = ({ patient, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title='Patient info' />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Email</TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient['login_details'] && patient['login_details'].email}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Phone</TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient.phoneNumber}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Gender</TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient.gender}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Date of birth
            </TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {moment(patient.dateOfBirth).format('DD MMM, YYYY')}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Genotype</TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient.genotype}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Blood group
            </TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient.bloodGroup}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Height</TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient.height}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Weight</TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient.weight}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>
              Occupation
            </TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient.occupation}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Address</TableCell>
            <TableCell>
              <Typography variant='body2' color='textSecondary'>
                {patient.address}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box p={1} display='flex' flexDirection='column' alignItems='flex-start'>
        <Button startIcon={<LockOpenIcon />}>Reset &amp; Send Password</Button>
        <Button startIcon={<PersonIcon />}>Login as Patient</Button>
      </Box>
    </Card>
  );
};

PatientInfo.defaultProps = {
  patient: {},
};

PatientInfo.propTypes = {
  className: PropTypes.string,
  patient: PropTypes.object.isRequired,
};

export default PatientInfo;
