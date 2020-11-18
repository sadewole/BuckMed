import React from 'react';
import GenderChart from './Misc/GenderChart';
import ActivityChart from './Misc/ActivityChart';

const Chart = () => {
  return (
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
  );
};

export default Chart;
