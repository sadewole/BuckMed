import React, { Fragment } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Welcome from './Welcome';
import GenderChart from './GenderChart';
import Performance from './Performance';

import Chart from './Chart';
import SubHeader from './SubHeader';

const Dashboard = () => {
  return (
    <Fragment>
      <Welcome />
      <SubHeader />
      <Container fluid>
        <Row>
          <Col xs={12} lg={3}>
            <GenderChart />
          </Col>
          <Col xs={12} lg={9}>
            <Performance />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
