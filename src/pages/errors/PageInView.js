import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Page from 'src/components/Page';
import { logout } from 'src/slices/auth';
import { useDispatch } from 'src/store';

const PageInView = () => {
  const dispatch = useDispatch();
  return (
    <Page className='not-found' title='404: Under Construction'>
      <Container fluid className='text-center'>
        <h1 className='text-primary'>
          Oops!, This page is under construction.
        </h1>
        <p className='text-secondary'>
          This page is neither visited by mistake nor because you've tried some
          shady route.
          <br /> We're currently working on it. Please, check later.
          <br />
          <br /> And incase you're stuck on this page, kindly click the logout
          button to enable you access other routes.
        </p>
        <div className='d-flex justify-content-center mt-4'>
          <img
            alt='Under development'
            className='image-fluid'
            src='/static/under-construction.gif'
          />
        </div>
        <div className='d-flex justify-content-center'>
          <Link to='/login' onClick={() => dispatch(logout())}>
            <Button variant='primary'>Logout</Button>
          </Link>
        </div>
      </Container>
    </Page>
  );
};

export default PageInView;
