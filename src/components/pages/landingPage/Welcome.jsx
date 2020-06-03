import React, { Fragment } from 'react';
import { about1, about2, aboutBusiness } from '../../../images/about';

const Welcome = () => (
  <Fragment>
    <div className='container mx-auto welcome_docmed_area p-4 mt-5'>
      <div className='row mb-4'>
        <div className='col-xl-6 col-lg-6'>
          <div className='welcome_thumb'>
            <div className='thumb_1'>
              <img src={about1} alt='' />
            </div>
            <div className='thumb_2'>
              <img src={about2} alt='' />
            </div>
          </div>
        </div>
        <div className='col-xl-6 col-lg-6'>
          <div className='welcome_docmed_info d-flex flex-column justify-content-center'>
            <h2>Welcome to BuckMed</h2>
            <h3>
              Best Care For Your <br />
              Good Health
            </h3>
            <p>
              Esteem spirit temper too say adieus who direct esteem. It esteems
              luckily or picture placing drawing. Apartments frequently or
              motionless on reasonable projecting expression.
            </p>
            <ul>
              <li>
                <i className='flaticon-right'></i> Apartments frequently or
                motionless.
              </li>
              <li>
                <i className='flaticon-right'></i> Duis aute irure dolor in
                reprehenderit in voluptate.
              </li>
              <li>
                <i className='flaticon-right'></i> Voluptatem quia voluptas sit
                aspernatur.
              </li>
            </ul>
            <a href='#' className='btn btn-transparent-blue'>
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className='row align-items-center my-4 business_expert_area'>
        <div className='col-xl-6 col-md-6'>
          <div className='business_info py-4'>
            <div className='icon'>
              <i className='fas fa-medkit'></i>
            </div>
            <h3>Leading edge care for Your family</h3>
            <p>
              Esteem spirit temper too say adieus who direct esteem. It esteems
              luckily picture placing drawing. Apartments frequently or
              motionless on reasonable projecting expression.
            </p>
          </div>
        </div>
        <div className='col-xl-6 col-md-6'>
          <div className='business_thumb'>
            <img src={aboutBusiness} alt='' />
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Welcome;
