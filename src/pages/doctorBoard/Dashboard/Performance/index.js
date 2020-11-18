import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Chart from './Chart';

const Performance = ({ className, ...rest }) => {
  const performance = {
    thisWeek: {
      data: [],
      labels: [],
    },
    thisMonth: {
      data: [],
      labels: [],
    },
    thisYear: {
      data: [10, 5, 11, 20, 13, 28, 18, 4, 13, 12, 13, 5],
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
  };

  return (
    <Card>
      <CardHeader title='Performance Over Time' />
      <CardContent>
        <PerfectScrollbar>
          <Card style={{ height: 375, minWidth: 500 }}>
            <Chart
              data={performance.thisYear.data}
              labels={performance.thisYear.labels}
            />
          </Card>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

Performance.propTypes = {
  className: PropTypes.string,
};

export default Performance;
