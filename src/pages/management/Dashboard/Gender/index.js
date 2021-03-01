import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core';
// import GenericMoreButton from 'src/components/GenericMoreButton';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    textAlign: 'center',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(3, 2),
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const EarningsSegmentation = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const earnings = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        data: [50, 100],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };

  if (!earnings) {
    return null;
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        // action={<GenericMoreButton />}
        title='Total Patients'
      />
      <Divider />
      <Box p={3} position='relative' minHeight={300}>
        <Chart data={earnings} />
      </Box>
      <Divider />
      <Box display='flex'>
        {earnings.labels.map((label, i) => (
          <div key={label} className={classes.item}>
            <Typography variant='h4' color='textPrimary'>
              {earnings.datasets[0].data[i]}%
            </Typography>
            <Typography variant='overline' color='textSecondary'>
              {label}
            </Typography>
          </div>
        ))}
      </Box>
    </Card>
  );
};

EarningsSegmentation.propTypes = {
  className: PropTypes.string,
};

export default EarningsSegmentation;
