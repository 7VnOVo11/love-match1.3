import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import styles from './RadarChart.module.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: '匹配度',
        data: data.map(item => item.value),
        backgroundColor: 'rgba(var(--primary-color-rgb), 0.2)',
        borderColor: 'rgb(var(--primary-color-rgb))',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(var(--primary-color-rgb))',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(var(--primary-color-rgb))',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.container}>
      <Radar data={chartData} options={options} />
    </div>
  );
}; 