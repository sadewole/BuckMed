import { Container } from '@material-ui/core';
import React from 'react';
import Header from './Header';
import Results from './Results';

const Visits = () => {
  return (
    <Container>
      <Header />
      <div className='mt-3' style={{ borderRadius: '1rem' }}>
        <Results datas={[]} />
      </div>
    </Container>
  );
};

export default Visits;
