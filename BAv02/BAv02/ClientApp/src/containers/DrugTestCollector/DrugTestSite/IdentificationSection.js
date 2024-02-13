import React, { Component, useState } from "react";
import { Label, Input, FormGroup } from "reactstrap";
import DERInformation from "./Jumbotrons/DERInformation";
import DERConfirmation from "./Jumbotrons/DERConfirmation";

const RemarksArea = ({ Display }) => {
  const DefaultText = "Donor refused or was unable to provide a valid ID.";
  const [value, setValue] = useState(DefaultText);
  if (Display) {
  
    return (
      <FormGroup>
        <Label>Remarks</Label>
        <Input
          onChange={e => {
            setValue(e.target.value);
          }}
          type="textarea"
          value={value}
          name="RemarksIdentification"
        />
      </FormGroup>
    );
  } else {
    return null;
  }
};

class IdentificationSection extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.state = {
      display: false,
      isAnswered: false
    };
  }

  onChangeHandler(e) {
    const anwser = e.target.value;
    this.setState({ isAnswered: true });

    if (anwser === "No") {
      this.setState({ display: true });
    } else {
      this.setState({ display: false });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Label>Is the Donor Carrying a Valid form of Identification?</Label>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              value="Yes"
              name="ValidId"
              onChange={this.onChangeHandler}
            />
            Yes
          </Label>
          <br />
          <Label check>
            <Input
              type="radio"
              value="No"
              name="ValidId"
              onChange={this.onChangeHandler}
            />
            No, Enter Remarks
          </Label>
        </FormGroup>
        <br />
        <RemarksArea Display={this.state.display} />
        <DERInformation Display={this.state.display} />
        <DERConfirmation
          specimenNumber={this.props.specimenNumber}
          isAnswered={this.state.isAnswered}
          Display={this.state.display}
        />
      </React.Fragment>
    );
  }
}

export default IdentificationSection;
