import React, { Component, useState } from "react";
import { Label, FormGroup, Input } from "reactstrap";
import RefusedToSign from "./Jumbotrons/RefusedToSign";
import SpecimenRefusal from "./Jumbotrons/SpecimenRefusal";
import RefusedInitialVials from "./Jumbotrons/RefusedInitialVials";
import InsufficientSample from "./Jumbotrons/InsufficientSample";
import ExtraClothingRefusal from "./Jumbotrons/ExtraClothingRefusal";
import SignatureSection from "./SignatureSection";

const ReleasedTo = () => {
  return (
    <FormGroup>
      <Label>Specimen Bottle(s) Released To</Label>
      <Input type="text" name="ReleasedTo" required />
    </FormGroup>
  );
};

const RemarksArea = ({ mssg }) => {
  const [value, setValue] = useState(mssg);

  return (
    <FormGroup>
      <Label>Remarks</Label>
      <Input
        onChange={e => {
          setValue(e.target.value);
        }}
        type="textarea"
        value={value}
        name="IssuesCollectionRemarks"
      />
    </FormGroup>
  );
};

class IssuesCollection extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.state = {
      anwser: "",
      canContinue: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.anwser !== prevState.anwser) {
      if (
        this.state.anwser !== "Specimen Refusal" &&
        this.state.anwser !== "Extra Clothing Refusal"
      ) {
        this.setState({ canContinue: true });
      } else {
        this.setState({ canContinue: false });
      }
    }
  }

  onChangeHandler(e) {
    const anwser = e.target.value;
    this.setState({ anwser: anwser });
  }

  render() {
    if (this.props.Display) {
      return (
        <React.Fragment>
          <FormGroup>
            <Label>Issues in Collection?</Label>
            <select
              onChange={this.onChangeHandler}
              name="IssuesCollection"
              className="form-control"
              required
            >
              <option value="">Select</option>
              <option value="No Issues">No Issues</option>
              <option value="Refusal To sign">Refusal To sign</option>
              <option value="Specimen Refusal">Specimen Refusal</option>
              <option value="Initial Vials Refusal">
                Initial Vials Refusal
              </option>
              <option value="Insufficient Sample">Insufficient Sample</option>
              <option value="Extra Clothing Refusal">
                Extra Clothing Refusal
              </option>
            </select>
          </FormGroup>
          <RemarksArea mssg={this.state.anwser} />
          {this.state.anwser === "Refusal To sign" ? <RefusedToSign /> : ""}
          {this.state.anwser === "Specimen Refusal" ? <SpecimenRefusal /> : ""}
          {this.state.anwser === "Insufficient Sample" ? (
            <InsufficientSample />
          ) : (
            ""
          )}
          {this.state.anwser === "Initial Vials Refusal" ? (
            <RefusedInitialVials />
          ) : (
            ""
          )}
          {this.state.anwser === "Extra Clothing Refusal" ? (
            <ExtraClothingRefusal />
          ) : (
            ""
          )}
          {this.state.canContinue ? <ReleasedTo /> : ""}
          {this.state.canContinue ? (
            <SignatureSection specimenNumber={this.props.specimenNumber} />
          ) : (
            ""
          )}
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default IssuesCollection;
