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
import {
  getProfessorReport,
  getTotalUsersType,
} from "../../Slices/PorfessorSlice";

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

  const [countUsers, setCountUsers] = useState(0);

  const [submissions, setSubmissions] = useState([]);
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
    getProfessorReport().then((res) => setSubmissions(res.msg));
    getTotalUsersType("Student").then((res) => setCountUsers(res.msg));
  }, []);

  const data = {
    labels: Array.isArray(submissions)
      ? submissions.map((ele) => ele.Name)
      : [],
    datasets: [
      {
        label: "Students Uploaded Assignments",
        data: Array.isArray(submissions)
          ? submissions.map((ele) => ele.SubmissionCount || 0)
          : [],
        backgroundColor: "#FFD269",
        barThickness: 25,
      },
      {
        label: "Total Students",
        data: Array.from({ length: submissions.length }, (_) => countUsers),
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
        text: "Submissions Report",
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
          text: "Students",
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
