import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const GenderChart = () => {
  const data = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        data: [50, 100],
        backgroundColor: ['#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  };
  return (
    <div className='elevation-1 py-3 chart'>
      <p className='font-weight-bold chart-title'>Patients by Gender</p>
      <div className='my-3'>
        <Doughnut data={data} options={{ legend: { display: false } }} />
      </div>

      <div className='chart-footer d-flex'>
        <div className='mr-3 d-flex align-items-center'>
          <div className='dot dot-yellow'></div>
          <p>Male</p>
        </div>
        <div className='d-flex align-items-center'>
          <div className='dot dot-blue'></div>
          <p>Female</p>
        </div>
      </div>
    </div>
  );
};

export default GenderChart;
