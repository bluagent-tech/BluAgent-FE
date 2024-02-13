import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  const data = {
    labels: props.label,
    datasets: [props.data],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="header">
        <h1 className="title">{props.title}</h1>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
