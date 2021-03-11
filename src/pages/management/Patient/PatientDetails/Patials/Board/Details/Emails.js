import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  makeStyles,
} from '@material-ui/core';
import MaiIcon from '@material-ui/icons/MailOutline';

const emailOptions = [
  'Resend last invoice',
  'Send password reset',
  'Send verification',
];

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 300,
  },
  cell: {
    padding: theme.spacing(1),
  },
}));

const Emails = ({ className, ...rest }) => {
  const classes = useStyles();
  const [emailOption, setEmailOption] = useState(emailOptions[0]);
  const [emails, setEmails] = useState([]); // this shows list of sent mails

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title='Send emails' />
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          name='option'
          onChange={(event) => setEmailOption(event.target.value)}
          select
          SelectProps={{ native: true }}
          value={emailOption}
          variant='outlined'
        >
          {emailOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
        <Box mt={2}>
          <Button variant='contained' startIcon={<MaiIcon />}>
            Send email
          </Button>
        </Box>
        <Box mt={2}>
          <Table>
            <TableBody>
              {emails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell className={classes.cell}>
                    {moment(email.createdAt).format('DD/MM/YYYY | HH:MM')}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {email.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
};

Emails.propTypes = {
  className: PropTypes.string,
};

export default Emails;
