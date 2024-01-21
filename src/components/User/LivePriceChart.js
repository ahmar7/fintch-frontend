import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = React.memo(({ data }) => {
  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            if (label) {
              return `${label}: $${context.parsed.y}`;
            }
            return `$${context.parsed.y}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    backgroundColor: "white",
  };

  const purpleLine = {
    label: "BTC Price",
    data: data?.datasets?.[0]?.data || [],
    borderWidth: 2,
    borderColor: "#231c8a",
    backgroundColor: (context) => {
      const gradient = context.chart.ctx.createLinearGradient(
        0,
        0,
        0,
        context.chart.height
      );
      gradient.addColorStop(0, "rgba(35, 28, 138, 1)"); // Blue
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)"); // Black
      return gradient;
    },
    fill: true,
    pointRadius: 0,
    pointHoverRadius: 0,
  };

  const purpleData = {
    labels: data ? data.labels : [],
    datasets: [purpleLine],
  };

  return (
    <div style={{ height: "400px", cursor: "pointer" }}>
      <Line data={purpleData} options={options} />
    </div>
  );
});

export default LineChart;
