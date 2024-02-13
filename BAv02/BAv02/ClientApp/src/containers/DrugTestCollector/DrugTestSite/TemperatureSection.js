import React, { Component, useState } from "react";
import { Label, Input, FormGroup } from "reactstrap";
import TemperatureInfo from "./Jumbotrons/TemperatureInfo";
import CollectionSection from "./CollectionSection";

const RemarksArea = ({ Display }) => {
  const DefaultText = "Temperature was out of Range.";
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
          id="TemperatureRemarks"
        />
      </FormGroup>
    );
  } else {
    return null;
  }
};

class TemperatureSection extends Component {
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
    if (this.props.Display && this.props.isAnswered) {
      return (
        <React.Fragment>
          <Label>Temperature between 90 and 100 F?</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                value="Yes"
                name="Temperature"
                onChange={this.onChangeHandler}
              />
              Yes
            </Label>
            <br />
            <Label check>
              <Input
                type="radio"
                value="No"
                name="Temperature"
                onChange={this.onChangeHandler}
              />
              No, Enter Remarks
            </Label>
          </FormGroup>
          <br />
          <RemarksArea Display={this.state.display} />
          <TemperatureInfo Display={this.state.display} />
          <CollectionSection
            specimenNumber={this.props.specimenNumber}
            Display={!this.state.display}
            isAnswered={this.state.isAnswered}
          />
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default TemperatureSection;
