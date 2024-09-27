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

import { getAllAssignmentsData } from "../../Slices/PorfessorSlice";
import { studentReport } from "../../Slices/StudentSlice";
import { getSession } from "../Controller";

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

  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getAllAssignmentsData().then((res) => setAssignments(res.msg));
  }, []);
  // console.log(assignments);
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
  useEffect(() => {
    studentReport(getSession("userId")).then((res) => setSubmissions(res.msg));
  }, []);

  const data = {
    labels: Array.isArray(submissions)
      ? submissions.map((sub) => sub.Name)
      : [],
    datasets: [
      {
        label: "Your Grades",
        data:
          Array.isArray(submissions) && submissions.length > 0
            ? submissions.map((sub) => sub.StudentGrade)
            : [], // Placeholder values; adjust according to your data
        backgroundColor: "#FFD269",
        barThickness: 25,
      },
      {
        label: "Average Grades",
        data:
          Array.isArray(submissions) && submissions.length > 0
            ? submissions.map((sub) => sub.AVGGrades)
            : [], // Placeholder values; adjust according to your data
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
          text: "Assignments",
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
          text: "Grade",
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
