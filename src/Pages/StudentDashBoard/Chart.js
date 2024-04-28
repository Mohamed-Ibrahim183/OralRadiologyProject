import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
    labels: [
      "Assignment 1",
      "Assignment 2",
      "Assignment 3",
      "Assignment 4",
      "Assignment 5",
    ],
    datasets: [
      {
        label: "Your Grades",
        data: [69, 99, 88, 12, 50],
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "#FFD269",
      },
      {
        label: "Average Grades",
        data: [60, 90, 90, 40, 50],
        // backgroundColor: "rgba(54, 162, 235, 0.5)",
        backgroundColor: "#A2D1FD",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income/Expense Report",
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Amount",
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Chart;
