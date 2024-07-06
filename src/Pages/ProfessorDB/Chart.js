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
import { axiosMethods } from "../Controller";

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
  const [countUsers, setCountUsers] = useState(0);

  // useEffect to set the color based on the theme
  useEffect(() => {
    const theme = localStorage.getItem("Theme");
    // console.log("Theme from localStorage:", theme);
    if (theme === "Dark") {
      setLabelColor("#283747");
      setTitleColor("white");
    } else {
      setLabelColor("#0082e6");
      setTitleColor("black");
    }
  }, []);
  useEffect(() => {
    new axiosMethods()
      .get(
        "http://localhost/Projects/OralRadiology/AssignmentLogic.php/submissionsStatus"
      )
      .then((res) => {
        console.log(res.msg);
        setAssignments(res.msg);
      });

    new axiosMethods()
      .post(
        "http://localhost/Projects/OralRadiology/userLogic.php/GetTotalUsersType",
        { Type: "Student" }
      )
      .then((res) => {
        setCountUsers(res.msg);
      });
  }, []);
  const data = {
    labels: assignments
      ? assignments.map((ele) => {
          return ele.Name;
        })
      : [],
    datasets: [
      {
        label: "Students Uploaded Assignments",
        data: assignments ? assignments.map((ele) => ele.Submitted) : [],
        backgroundColor: "#FFD269",
        barThickness: 25,
      },
      {
        label: "Total Students",
        data: Array.from({ length: countUsers }, (_) => countUsers),
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
