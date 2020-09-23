import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const SubHeader = () => {
  return (
    <Container className='my-4' fluid>
      <Row>
        <Col xs={12} md={3} sm={6}>
          <div className='info-box'>
            <span className='info-box-icon bg-info elevation-1'>
              <i className='fas fa-cog'></i>
            </span>

            <div className='info-box-content'>
              <span className='info-box-text'>Total Patients</span>
              <span className='info-box-number'>3,256</span>
            </div>
          </div>
        </Col>
        <Col xs={12} md={3} sm={6}>
          <div className='info-box mb-3'>
            <span className='info-box-icon bg-danger elevation-1'>
              <i className='fas fa-thumbs-up'></i>
            </span>

            <div className='info-box-content'>
              <span className='info-box-text'>Total Doctors</span>
              <span className='info-box-number'>41,410</span>
            </div>
          </div>
        </Col>
        <div className='clearfix hidden-md-up'></div>
        <Col xs={12} md={3} sm={6}>
          <div className='info-box mb-3'>
            <span className='info-box-icon bg-success elevation-1'>
              <i className='fas fa-shopping-cart'></i>
            </span>

            <div className='info-box-content'>
              <span className='info-box-text'>Total Staff</span>
              <span className='info-box-number'>1,420</span>
            </div>
          </div>
        </Col>
        <Col xs={12} md={3} sm={6}>
          <div className='info-box mb-3'>
            <span className='info-box-icon bg-warning elevation-1'>
              <i className='fas fa-users'></i>
            </span>

            <div className='info-box-content'>
              <span className='info-box-text'>Available cars</span>
              <span className='info-box-number'>56</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SubHeader;
