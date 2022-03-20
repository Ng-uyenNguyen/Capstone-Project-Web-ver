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

const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

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
      <div className={styles.barchart_container}>
        <Bar className={styles.chart_container} options={options} data={data} />
      </div>
      <h3 className={styles.week_icon}>Week</h3>
    </div>
  );
};
