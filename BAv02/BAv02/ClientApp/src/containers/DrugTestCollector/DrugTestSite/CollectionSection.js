import React, { Component, useState } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import IssuesCollection from "./IssuesCollection";

const IsSingleRemarks = ({ isNone }) => {
  var DefaultText = "";
  const [value, setValue] = useState(DefaultText);
if(isNone){
    if(isNone === true){ DefaultText ="No specimen was provided, (Shy Bladder Part 40.191: 40.193).";}
    else { DefaultText = "";}
    
    return (
      <FormGroup>
        <Input
          onChange={e => {
            setValue(e.target.value);
          }}
          type="textarea"
          value={value}
          name="CollectionRemarks"
        />
      </FormGroup>
    );
  }else{
    return (
      <FormGroup>
      </FormGroup>
    );
  }
};

class CollectionSection extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.state = {
      display: false,
      isSingle: false,
      cancelTest: false,
      isNone:false
    };
  }

  onChangeHandler(e) {
    const anwser = e.target.value;
    if (anwser === "Split") {
      this.setState({ display: true, isSingle: false, isNone: false, cancelTest:false });
    } else if (anwser === "Single" ) {
      this.setState({ display: false, isSingle: true, isNone: false, cancelTest:false });      
    } else if(anwser === 'None'){ 
      this.setState({ cancelTest: true, display: false, isSingle: false, isNone: true });
    }else{
      this.setState({display:false,cancelTest:false});
    }
  }

  render() {
    if (this.props.Display && this.props.isAnswered) {
      return (
        <React.Fragment>
          <Label>Collection?</Label>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                value="Split"
                name="Collection"
                onChange={this.onChangeHandler}
              />
              Split
            </Label>
            <br />
            <Label check>
              <Input
                type="radio"
                value="Single"
                name="Collection"
                onChange={this.onChangeHandler}
              />
              Single
            </Label>
            <br />
            <Label check>
              <Input
                type="radio"
                value="None"
                name="Collection"
                onChange={this.onChangeHandler}
              />
              None Provided, Enter Remark
            </Label>
          </FormGroup>
          <IsSingleRemarks
            Display={this.state.display}
            isSingle={this.state.isSingle}
            isNone={this.state.cancelTest}
          />
          <br />
          { this.state.cancelTest === false?
            <IssuesCollection
            specimenNumber={this.props.specimenNumber}
            Display={this.state.display}
          />
          :
          <Button type="submit" id='options' name="btnCancelByNoneProvided" color="danger">Cancel Test</Button>
          }
          { this.state.isSingle === false ?
            ''
          :
          <Button type="submit" id='options' name="btnCancelByNoneProvided" color="danger">Cancel Test</Button>
          }
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default CollectionSection;
