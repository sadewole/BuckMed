import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Page from 'src/components/Page';

const NotFoundView = () => {
  return (
    <Page className='not-found' title='404: Not found'>
      <Container fluid className='text-center'>
        <h1 className='text-primary'>
          404: The page you are looking for isn’t here
        </h1>
        <p className='text-secondary'>
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation.
        </p>
        <div className='d-flex justify-content-center mt-4'>
          <img
            alt='Under development'
            className='image-fluid'
            src='/static/404.png'
          />
        </div>
        <div mt={6} display='flex' justifyContent='center'>
          <Link to='/'>
            <Button variant='primary'>Back to home</Button>
          </Link>
        </div>
      </Container>
    </Page>
  );
};

export default NotFoundView;
