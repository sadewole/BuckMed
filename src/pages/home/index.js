import React, { Fragment } from 'react';
import Hero from './Hero';
import Welcome from './Welcome';
import SubFooter from './SubFooter';

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Welcome />
      <SubFooter />
    </Fragment>
  );
};

export default Home;
