import React, { Fragment } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Header from './Header';
import GenderChart from './GenderChart';
import Performance from './Performance';
import SubHeader from './SubHeader';

const Dashboard = () => {
  return (
    <Fragment>
      <Header />
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
        <Row>
          <Col md={6} sm={12}></Col>
          <Col md={6} sm={12}></Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
