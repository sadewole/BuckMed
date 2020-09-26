import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import HorizontalScrollbar from 'src/components/HorizontalScrollbar';
import { Card } from 'react-bootstrap';
// import GenericMoreButton from 'src/components/GenericMoreButton';
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
      <Card.Header>
        <Card.Title>Performance Over Time</Card.Title>
      </Card.Header>
      <Card.Body>
        <HorizontalScrollbar>
          <Card style={{ height: 375, minWidth: 500 }}>
            <Chart
              data={performance.thisYear.data}
              labels={performance.thisYear.labels}
            />
          </Card>
        </HorizontalScrollbar>
      </Card.Body>
    </Card>
  );
};

const Divider = styled.hr`
  margin: 10px 0;
`;

Performance.propTypes = {
  className: PropTypes.string,
};

export default Performance;
