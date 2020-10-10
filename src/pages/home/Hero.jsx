import React from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery, useTheme, Typography } from '@material-ui/core';

const Hero = () => {
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <div className='hero-bg text-white'>
      <div className='overlay w-100 h-100'>
        <div className='d-flex align-items-center h-100'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-12'>
                <div className='hero_text' data-aos='fade-up'>
                  <Typography
                    variant={mobileDevice ? 'h4' : 'h2'}
                    className='text-uppercase text-white mb-2'
                  >
                    the best medical center
                  </Typography>
                  <Typography
                    variant={mobileDevice ? 'h5' : 'h3'}
                    className='font-weight-bold text-capitalize text-white mb-2'
                  >
                    Bringing health
                    <br />
                    to life for the whole family.
                  </Typography>
                  <Link
                    to='#'
                    className='btn btn-outline-primary btn-transparent-blue font15 p-2 '
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
