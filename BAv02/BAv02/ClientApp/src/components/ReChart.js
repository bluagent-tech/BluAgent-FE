import React from "react";
import { Line } from "react-chartjs-2";

const ReChart = (props) => {
  var data = {
    labels: [],
    datasets: [
      {
        data: [],
        fill: true,
        backgroundColor: "rgb(179, 219, 179, 0.5)",
        borderColor: "#008600",
      },
    ],
  };
  var options = {
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (props.data && props.type === "driver") {
    props.data.map((list) => {
      data.labels.push(list.Date.substring(0, 10));
      data.datasets[0].data.push(list.DriverCount);
    });
  }
  if (props.data && props.type === "company") {
    props.data.map((list) => {
      data.labels.push(list.ComplianceValueDate.substring(0, 10));
      data.datasets[0].data.push(list.ComplianceValue);
    });
  }
  if (props.data && (props.type === "trailer" || props.type === "truck")) {
    props.data.map((list) => {
      data.labels.push(list.Date.substring(0, 10));
      data.datasets[0].data.push(list.TrucksCount);
    });
  }

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default ReChart;
