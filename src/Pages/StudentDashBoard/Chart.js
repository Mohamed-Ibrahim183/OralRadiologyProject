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
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = (props) => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    console.log("Chart props:", props); // Log the props

    if (props.Submission && Array.isArray(props.Submission)) {
      setLabels(
        props.Submission.map((assignment) => assignment.assignmentName)
      );
    }
  }, [props.Submission]);

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
    labels: props.Submission.map((assignment) => assignment.assignmentName),
    datasets: [
      {
        label: "Your Grades",
        data: props.Submission.map((assignment) => assignment.totalGrade),
        backgroundColor: "#FFD269",
        barThickness: 25,
      },
      {
        label: "Average Grades",
        data: [60, 90, 90], // Placeholder values; adjust according to your data
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
