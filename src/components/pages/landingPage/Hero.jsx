import React from 'react';

const Hero = () => {
  return (
    <div className='hero-bg text-white'>
      <div className='overlay w-100 h-100'>
        <div className='d-flex align-items-center h-100'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-12'>
                <div className='hero_text'>
                  <span className='text-uppercase  display-4'>
                    the best medical center
                  </span>
                  <h3 className='display-4'>
                    <span className='font-weight-bold text-capitalize'>
                      Bringing health
                    </span>
                    <br />
                    to life for the whole family.
                  </h3>
                  <a href='#' className='btn btn-transparent-blue font15  p-2 '>
                    Discover More
                  </a>
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
