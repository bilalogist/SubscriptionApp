import React from "react";
import dynamic from "next/dynamic";
//import Chart from "react-apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const LineChart = ({
  xAxisTitle,
  yAxisTitle,
  xAxisDataArray,
  yAxisDataArray,
  width,
  graphTitle,
  ...props
}) => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    title: { text: graphTitle },
    xaxis: {
      title: {
        text: xAxisTitle,
      },
      categories: xAxisDataArray, //[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    },
    yaxis: {
      title: {
        text: yAxisTitle,
      },
    },
  };
  const series = [
    {
      name: "series-1",
      data: yAxisDataArray, //[30, 40, 45, 50, 49, 60, 70, 91]
    },
  ];
  return (
    <Chart
      options={{ ...options, legend: { show: true } }}
      series={series}
      type="line"
      width={width}
      {...props}
    />
  );
};
export default LineChart;
