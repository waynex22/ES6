import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const BarChart = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ['', '', '', '', ''],
    datasets: [
      {
        label: 'Sales',
        data: [45, 59, 80, 81, 56],
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(0, 0, 0, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full h-64'>
      <Doughnut data={data} />
    </div>
  );
};

export default BarChart;