import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const data = {
    labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [
      {
        label: 'Income',
        data: [120, 150, 180, 170, 190, 200, 210, 220, 230, 240, 250],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Expense',
        data: [110, 140, 170, 160, 180, 190, 200, 210, 220, 230, 240],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income/Expense Report',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Amount',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
