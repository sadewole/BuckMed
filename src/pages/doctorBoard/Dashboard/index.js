import React, { Fragment } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Header from './Header';
import Gender from './Gender';
import Performance from './Performance';
import SubHeader from './SubHeader';

const Dashboard = () => {
  return (
    <Fragment>
      <Header />
      <SubHeader />
      <Container fluid>
        <Row>
          <Col xs={12} lg={4}>
            <Gender />
          </Col>
          <Col xs={12} lg={8}>
            <Performance />
          </Col>
        </Row>
        <Row className='my-2'>
          <Col md={6} sm={12}></Col>
          <Col md={6} sm={12}></Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
