import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { getLastDays } from "../../lib/features";
import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales,
} from "chart.js";
import { orange, orangeLight, purple, purpleLight } from "../../contants/color";
ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);
const labels = getLastDays();
const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const LineCharts = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "revenue2",
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};
const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: 130,
};
const DoughnutCharts = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Total Chats Vs Group Chat",
        fill: true,
        backgroundColor: [purpleLight, orangeLight],
        hoverBackgroundColor: [purple, orange],
        borderColor: [purple, orange],
        offset: 30,
      },
    ],
  };
  return (
    <Doughnut
      style={{
        zIndex: 10,
      }}
      data={data}
      options={doughnutChartOptions}
    />
  );
};

export { LineCharts, DoughnutCharts };
