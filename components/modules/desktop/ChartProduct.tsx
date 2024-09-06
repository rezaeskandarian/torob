"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "کمترین قیمت",
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: "#0091EA", // Set line color to blue
      backgroundColor: "black",
      fill: false,
      pointStyle: "circle", // Style of the points
      pointBackgroundColor: "#0091EA", // Color of the points
      pointBorderColor: "#0091EA", // Border color of the points
      pointRadius: 3, // Radius of the points
    },
    {
      label: "میانگین قیمت",
      data: [45, 75, 60, 70, 55, 65, 50],
      borderColor: "#00C853", // Set line color to green
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      fill: false,
      pointStyle: "circle", // Style of the points
      pointBackgroundColor: "#00C853", // Color of the points
      pointBorderColor: "#00C853", // Border color of the points
      pointRadius: 3, // Radius of the points
    },
  ],
};

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        display: false, // Remove the x-axis line
      },
      ticks: {
        display: false, // Hide the x-axis labels
      },
    },
    y: {
      grid: {
        display: false,
      },
      border: {
        display: false, // Remove the y-axis line
      },
      ticks: {
        display: false, // Hide the y-axis labels
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const, // Corrected position value
      labels: {
        usePointStyle: true,
        color: "black",
        font: {
          size: 11,
          family: "iranyekan",
        },
        boxWidth: 5, // Set the size of the circle
        boxHeight: 5, // Set the height of the circle
         // Ensure the shape is a circle
      },
    },
    tooltip: {
      callbacks: {
        label: function(context : any) {
          return context.raw; // Return only the value
        }
      },
      
      titleFont: {
        size: 12,
        family: 'iranyekan',
        color: '#ffffff'
      },
      bodyFont: {
        size: 12,
        family: 'iranyekan',
        color: '#ffffff'
      },
      borderColor: '#0091EA',
      borderWidth: 1,
      cornerRadius: 3,
      padding: 5
    }
  },
};

const LineChart: React.FC = () => {
  return (
    <>
      <h3 className="p-5 font-bold text-lg ">لیست تغییرات قیمت</h3>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
