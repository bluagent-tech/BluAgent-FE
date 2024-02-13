import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Form,
} from "reactstrap";
import dateConvertTables from "./../../../services/dateConvertTables";
import DatePicker from "../../../components/DatePicker";

//ACCIDENT RECORD FOR PAST 3 YEARS OR MORE

class Accidents extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      NoAccident: true,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    var ac = new FormData(e.target);
    ac.append("IdDriver", this.props.id);
    ac.append("Id", this.props.accidentR.Id);
    this.props.submit(ac);
  }

  onChange() {
    this.setState({ NoAccident: !this.state.NoAccident });
  }

  render() {
    return (
      <div>
        <div>
          <div className="pull-left" style={{ marginTop: "8px" }}>
            <h6 className="mob-tit">
              <strong>ACCIDENT HISTORY FOR THE PAST 3 YEARS</strong>
            </h6>
          </div>
          <div className="pull-right">
            <button
              style={{ width: "350px" }}
              type="button"
              onClick={this.props.toggle}
              className="btn btn-light btn-min-width mr-1 mb-1 mob-but"
            >
              ADD ACCIDENT RECORD
            </button>
          </div>
        </div>
        <Modal isOpen={this.props.modal} className={"modal-lg"}>
          <ModalHeader toggle={this.props.toggle}>ACCIDENT RECORD</ModalHeader>
          <Form onSubmit={this.handleSubmit} name="formAR">
            <ModalBody>
              <FormGroup row>
                <Col>
                  <DatePicker
                    id="DateAccident"
                    name="DateAccident"
                    labelText="Date"
                    value={dateConvertTables(this.props.accidentR.DateAccident)}
                  />
                </Col>
                <Col>
                  <Label htmlFor="text-input">Nature of Accident</Label>
                  <input
                    type="text"
                    defaultValue={this.props.accidentR.NatureAccident}
                    // value={this.state.NoAccident ? "NA" : null}
                    readOnly={this.state.NoAccident ? true : false}
                    className="form-control"
                    id="Naccident"
                    name="NatureAccident"
                    maxLength="200"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Label htmlFor="text-input">Fatalities</Label>
                  <input
                    type="text"
                    defaultValue={this.props.accidentR.Fatalities}
                    readOnly={this.state.NoAccident ? true : false}
                    className="form-control"
                    id="Fatalities"
                    name="Fatalities"
                    maxLength="200"
                    required
                  />
                </Col>
                <Col>
                  <Label htmlFor="text-input">Injuries</Label>
                  <input
                    type="text"
                    defaultValue={this.props.accidentR.Injuries}
                    readOnly={this.state.NoAccident ? true : false}
                    className="form-control"
                    id="Injuries"
                    name="Injuries"
                    maxLength="200"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <input
                    id="checkNoAccidents"
                    type="checkbox"
                    onChange={this.onChange}
                    defaultChecked={this.state.NoAccident}
                    className="mr-2"
                  />
                  <label htmlFor="checkNoAccidents">
                    <strong>There has not been any "Traffic" Accident.</strong>
                  </label>
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                className="buttons-royal text-white px-5"
                type="submit"
                // disabled={this.props.isLoading ? true : false}
                disabled={this.state.NoAccident}
              >
                Save
              </Button>
              <Button
                className="buttons-royal text-white px-5"
                onClick={this.props.toggle}
              >
                Close
              </Button>{" "}
              {this.props.isLoading ? (
                <img
                  alt="loading"
                  style={{
                    width: "140px",
                    position: "absolute",
                    marginTop: "0px",
                    right: "40%",
                  }}
                  src="../../assets/img/icons/loading2.gif"
                />
              ) : (
                <div />
              )}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Accidents;
