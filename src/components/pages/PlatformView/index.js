import React from 'react';
import Hero from './Home/Hero';
import Welcome from './Home/Welcome';
import SubFooter from './Home/SubFooter';
import PlatformBase from '../../layouts/PlatformBase';

const index = () => {
  return (
    <PlatformBase>
      <Hero />
      <Welcome />
      <SubFooter />
    </PlatformBase>
  );
};

export default index;
