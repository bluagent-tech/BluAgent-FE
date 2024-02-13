import React from "react";
import { Jumbotron, Button } from "reactstrap";

const SpecimenRefusal = () => {
  return (
    <React.Fragment>
      <Jumbotron
        style={{
          color: "#fff",
          backgroundColor: "#e04c13"
        }}
      >
        <h2>Donor Refused to provide specimen.</h2>
        <h5>
          Review the remarks and add additional remarks if necessary. You will
          not be able to proceed further with this test. Please cancel this test
          by clickin on the button below.
        </h5>
        <h5>
          The DER (Designated Employee Rep) will be notified automatically via
          Email. No Further action is necessary on your part.
        </h5>
      </Jumbotron>
      <Button type="submit" id='options' name="btnCancelByIssues"  color="danger">Cancel Test</Button>
    </React.Fragment>
  );
};

export default SpecimenRefusal;
