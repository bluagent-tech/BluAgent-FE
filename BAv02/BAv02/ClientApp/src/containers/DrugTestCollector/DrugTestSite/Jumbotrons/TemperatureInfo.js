import React from "react";
import { Jumbotron, Button } from "reactstrap";

const DERInformation = ({ Display }) => {
  if (Display) {
    return (
      <React.Fragment>
        <Jumbotron
          style={{
            color: "#fff",
            backgroundColor: "#e04c13"
          }}
        >
          <h2>Temperature was out of range. Here are your instructions:</h2>
          <ul>
            <li>
              Please review the remark entered in the "Remarks" section. Add
              additional remarks if neccesary.
            </li>
            <li>
              You are required to complete this collection, and begin a new
              collection under direct observation.
            </li>
            <li>
              As soon as you complete this collection, our system will prompt
              you to generate a new collection for this Drug Test Request. upon
              successful collection, send both sets of samples to the
              Laboratory.
            </li>
            <li>
              If the Donor refuses to allow Direct Observation, or refuses to
              provide another sample, you must mark the second collection as a
              refusal to test and discard the initial sample. You can mark the
              collection as "Cancelled".
            </li>
            <li>
              Finally, you need to contact the DER (Designated Employee
              Representative) as soon as possible and inform them. Our system
              will also give you the option to notify the DER via Email.
            </li>
          </ul>
        </Jumbotron>
        <Button type="submit" name="btnStartNewTest" style={{ color: "#FFF" }} color="warning">
          Save this collection & start a new one
        </Button>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default DERInformation;
