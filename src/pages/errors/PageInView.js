import React from 'react';
import { Container } from 'react-bootstrap';
import Page from 'src/components/Page';

const PageInView = () => {
  return (
    <Page className='not-found' title='404: Under Construction'>
      <Container fluid className='text-center'>
        <h1 className='text-primary'>
          Oops!, This page is under construction.
        </h1>
        <p className='text-secondary'>
          This page is neither visited by mistake nor because you've tried some
          shady route.
          <br /> We're currently working on it. Please, check later
        </p>
        <div className='d-flex justify-content-center mt-4'>
          <img
            alt='Under development'
            className='image-fluid'
            src='/static/under-construction.gif'
          />
        </div>
      </Container>
    </Page>
  );
};

export default PageInView;
