import React from "react";
import Gauge from "react-gauge-chart";

const GaugeChart = (props) => {  
  return props.data !== undefined ? <Gauge id="gauge-chart5"
  nrOfLevels={420}
  arcsLength={[(props.data * 0.0100), (Math.abs((props.data * 0.0100) - 1 ))]}
  colors={[props.data < 70 ? '#DF5A68' : props.data < 100 ? '#ffc107' : '#008600', '#DDDDDD']}
  percent={props.data * 0.0100}
  arcPadding={0.00}
  textColor={'#73818f'}
  animate={false}
  arcWidth={0.1}
/> : <Gauge id="gauge-chart5"
  nrOfLevels={420}
  arcsLength={[(0.0), (0.100)]}
  colors={['#5BE12C', '#DDDDDD']}
  percent={0.0}
  arcPadding={0.00}
  textColor={'#73818f'}
  animate={false}
  arcWidth={0.1}
/>;
};

export default GaugeChart;
