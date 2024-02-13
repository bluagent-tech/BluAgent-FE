import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchAccidents } from "./../../actions/accidentActions";

const Accidents = (props) => {

  useEffect(() => {
  }, [props]);

  const getAccidentsData = () => {
    props.dispatch(fetchAccidents());
  };
  return (
    <div>
      <h1>Accidents records</h1>
      <ul>{getAccidentsData}</ul>
    </div>
  );
};

export default connect((state) => {
  return state;
})(Accidents);
