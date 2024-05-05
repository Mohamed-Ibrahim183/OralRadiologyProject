import React, { useEffect, useState } from "react";
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

const ChartComponent = () => {
  // State variables for colors
  const [labelColor, setLabelColor] = useState("#283747");
  const [titleColor, setTitleColor] = useState("#5D6D7E");

  // useEffect to set the color based on the theme
  useEffect(() => {
    const theme = localStorage.getItem("Theme");
    if (theme === "Dark") {
      setLabelColor("#283747");
      setTitleColor("white");
    } else {
      setLabelColor("#0082e6");
      setTitleColor("black");
    }
  }, []);

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
        backgroundColor: "#FFD269",
        barThickness: 25,
      },
      {
        label: "Average Grades",
        data: [60, 90, 90, 40, 50],
        backgroundColor: "#A2D1FD",
        barThickness: 25,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: labelColor,
        },
      },
      title: {
        display: true,
        text: "Income/Expense Report",
        color: titleColor,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Year",
          color: titleColor,
        },
        ticks: {
          color: labelColor,
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Amount",
          color: titleColor,
        },
        ticks: {
          color: labelColor,
        },
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default ChartComponent;
