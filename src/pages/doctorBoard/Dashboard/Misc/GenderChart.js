import React from 'react';
import { Card } from 'react-bootstrap';
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
    <Card className='elevation-1 chart'>
      <Card.Header>
        <Card.Title>Patients by Gender</Card.Title>
      </Card.Header>
      <div className='my-3'>
        <Doughnut data={data} options={{ legend: { display: false } }} />
      </div>
      <Card.Footer className='chart-footer d-flex'>
        <div className='mr-3 d-flex align-items-center'>
          <div className='dot dot-yellow'></div>
          <p>Male</p>
        </div>
        <div className='d-flex align-items-center'>
          <div className='dot dot-blue'></div>
          <p>Female</p>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default GenderChart;
