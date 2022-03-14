import React from "react";
import styles from "./chart_styles.module.scss";
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Attended",
      data: labels.map(() => Math.random() * 100),
      backgroundColor: "#21bf73",
    },
  ],
};

export const Chart = () => {
  return (
    <div>
      <h3 className={styles.title}>Attandance Report</h3>
      <h3 className={styles.week_text}>This Week: 80%</h3>
      <h3 className={styles.title}>Summer 2021</h3>
      <Bar className={styles.chart_container} options={options} data={data} />
    </div>
  );
};
