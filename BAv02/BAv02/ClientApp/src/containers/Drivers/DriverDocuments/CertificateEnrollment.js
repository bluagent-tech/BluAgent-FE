import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/DrugAndAlcoholTesting";

function CertificateEnrollment() {
  return <h1>Certificate Enrollment</h1>;
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(CertificateEnrollment);
