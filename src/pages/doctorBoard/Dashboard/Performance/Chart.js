import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Fade } from 'react-bootstrap';

const Chart = ({ data: dataProp, labels, ...rest }) => {
  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);

    gradient.addColorStop(0, '#6c757d', 0.2);
    gradient.addColorStop(0.9, 'rgba(255,255,255,0)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    return {
      datasets: [
        {
          data: dataProp,
          backgroundColor: gradient,
          borderColor: '#6c757d',
          pointBorderColor: '#007bff',
          pointBorderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: ' #6c757d',
        },
      ],
      labels,
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    legend: {
      display: false,
    },
    layout: {
      padding: 0,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            padding: 20,
            fontColor: '#343a40',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: '#6c757d',
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: '#6c757d',
          },
          ticks: {
            padding: 20,
            fontColor: '#343a40',
            beginAtZero: true,
            min: 0,
            maxTicksLimit: 7,
            callback: (value) => (value > 0 ? `${value}K` : value),
          },
        },
      ],
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: ' #6c757d',
      backgroundColor: '#007bff',
      titleFontColor: '#007bff',
      bodyFontColor: '#343a40',
      footerFontColor: '#343a40',
      callbacks: {
        title: () => {},
        label: (tooltipItem) => {
          let label = `Income: ${tooltipItem.yLabel}`;

          if (tooltipItem.yLabel > 0) {
            label += 'K';
          }

          return label;
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '100%' }} {...rest}>
      <Line data={data} options={options} />
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
};

export default Chart;
