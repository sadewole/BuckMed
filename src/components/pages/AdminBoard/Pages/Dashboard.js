import React from 'react';
import AdminBase from '../Base';
import Welcome from './Doctor/Welcome';
import GenderChart from './Doctor/GenderChart';
import ActivityChart from './Doctor/ActivityChart';

const Dashboard = () => {
  return (
    <AdminBase>
      <Welcome />
      <section className='container-fluid my-4'>
        <div className='row'>
          <div className='col-12 col-sm-6 col-md-3'>
            <div className='info-box'>
              <span className='info-box-icon bg-info elevation-1'>
                <i className='fas fa-cog'></i>
              </span>

              <div className='info-box-content'>
                <span className='info-box-text'>Total Patients</span>
                <span className='info-box-number'>3,256</span>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-3'>
            <div className='info-box mb-3'>
              <span className='info-box-icon bg-danger elevation-1'>
                <i className='fas fa-thumbs-up'></i>
              </span>

              <div className='info-box-content'>
                <span className='info-box-text'>Total Doctors</span>
                <span className='info-box-number'>41,410</span>
              </div>
            </div>
          </div>

          <div className='clearfix hidden-md-up'></div>

          <div className='col-12 col-sm-6 col-md-3'>
            <div className='info-box mb-3'>
              <span className='info-box-icon bg-success elevation-1'>
                <i className='fas fa-shopping-cart'></i>
              </span>

              <div className='info-box-content'>
                <span className='info-box-text'>Total Staff</span>
                <span className='info-box-number'>1,420</span>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-3'>
            <div className='info-box mb-3'>
              <span className='info-box-icon bg-warning elevation-1'>
                <i className='fas fa-users'></i>
              </span>

              <div className='info-box-content'>
                <span className='info-box-text'>Available cars</span>
                <span className='info-box-number'>56</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/** Chart Boards */}
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-sm-6 col-md-3'>
            <GenderChart />
          </div>
          <div className='col-12 col-sm-6 col-md-9'>
            <ActivityChart />
          </div>
        </div>
      </div>
    </AdminBase>
  );
};

export default Dashboard;
