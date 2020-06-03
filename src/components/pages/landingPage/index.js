import React, { Fragment } from 'react';
import Hero from './Hero';
import Welcome from './Welcome';
import SubFooter from './SubFooter';
import Footer from '../../layouts/Footer';

const index = () => {
  return (
    <Fragment>
      <Hero />
      <Welcome />
      <SubFooter />
      <Footer />
    </Fragment>
  );
};

export default index;
