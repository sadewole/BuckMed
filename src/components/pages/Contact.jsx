import React, { Fragment } from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import Footer from '../layouts/Footer';

const Contact = () => {
  return (
    <Fragment>
      <div className='container mx-auto'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='contact-title'>Get in Touch</h1>
          </div>
          <div className='col-lg-8'>
            <Form className='row'>
              <Form.Group className='col-12'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='email' placeholder='Enter your name' />
              </Form.Group>
              <Form.Group className='col-md-6 col-12'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter your email' />
              </Form.Group>
              <Form.Group className='col-md-6 col-12'>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your phone number'
                />
              </Form.Group>
              <FormGroup className='col-12'>
                <Form.Label>Message</Form.Label>
                <Form.Control as='textarea' rows='3' />
              </FormGroup>
            </Form>
          </div>
          <div className='col-lg-3 offset-lg-1'>
            <div className='media contact-info'>
              <span className='contact-info__icon'>
                <i className='ti-home'></i>
              </span>
              <div className='media-body'>
                <h3>Location: </h3>
                <p>8/10 Victoria Island, Lagos, Nigeria.</p>
              </div>
            </div>
            <div className='media contact-info'>
              <span className='contact-info__icon'>
                <i className='ti-tablet'></i>
              </span>
              <div className='media-body'>
                <h3>Phone:</h3>
                <p>+1 253 565 2365</p>
                <p>
                  <span className='font-weight-bold'>Opening:</span> Mon to Fri
                  9am to 6pm
                </p>
              </div>
            </div>
            <div className='media contact-info'>
              <span className='contact-info__icon'>
                <i className='ti-email'></i>
              </span>
              <div className='media-body'>
                <h3>Email:</h3>
                <p>support@colorlib.com</p>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Contact;
