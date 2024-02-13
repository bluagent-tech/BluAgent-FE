import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Input,
} from 'reactstrap';
import PdfME from './../Pdf/PdfME';

//MULTIEMPLOYMENT APPLICATION

class MultiEmployment extends React.Component {
  render() {
    let state = '';
    this.props.states.map((row) =>
      row.Id === this.props.driver.StateLicense ? (state = row.Name) : null
    );
    return (
      <div className="col-md-3">
        <input
          onClick={() => this.props.toggle(this.props.id)}
          className="img-responsive"
          type="image"
          src="assets/icons/icons8-send-job-list.svg"
          onMouseOver={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-send-job-list.svg")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "assets/icons/icons8-send-job-list.svg")
          }
          alt="Submit"
          height="150"
          width="150"
        />
        <h6>MULTI-EMPLOYER</h6>

        <Modal
          isOpen={this.props.modal}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.props.toggle}
        >
          <ModalHeader name="modal1" toggle={this.props.toggle}>
            MULTI-EMPLOYMENT
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={
                    this.props.driver.Name + " " + this.props.driver.LastName
                  }
                  readOnly
                />
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">Social Security Number</Label>
                <Input
                  type="text"
                  id="ssn"
                  name="ssn"
                  defaultValue={this.props.driver.Ssn}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Drive's License Number</Label>
                <Input
                  type="text"
                  id="license"
                  name="license"
                  defaultValue={this.props.driver.License}
                  readOnly
                />
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">Type of License</Label>
                <Input
                  type="text"
                  id="tlicense"
                  name="tlicense"
                  defaultValue={this.props.driver.TypeLicense}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">State</Label>
                <Input
                  type="text"
                  id="state"
                  name="state"
                  defaultValue={state}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">
                  In addition to the above information,copies of the following
                  must be obtained.
                </Label>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <p>
                  <input
                    id="Checkbox1"
                    type="checkbox"
                    defaultChecked={this.props.data[0] === 1 ? "checked" : ""}
                    disabled
                  />
                  <label htmlFor="projectinput1">
                    Medical Examiner's Certificate
                  </label>
                </p>
                <p>
                  <input
                    id="Checkbox2"
                    type="checkbox"
                    defaultChecked={
                      this.props.driver.License !== null ? "checked" : ""
                    }
                    disabled
                  />
                  <label htmlFor="projectinput1">
                    Road Test (or Equivalent)
                  </label>
                </p>
                <p>
                  <input
                    id="Checkbox3"
                    type="checkbox"
                    defaultChecked={
                      this.props.driver.License !== null ? "checked" : ""
                    }
                    disabled
                  />
                  <label htmlFor="projectinput1">Certicate of Road Test</label>
                </p>
                <p>
                  <input
                    id="Checkbox1"
                    type="checkbox"
                    defaultChecked={this.props.data[1] === 1 ? "checked" : ""}
                    disabled
                  />
                  <label htmlFor="projectinput1">
                    Controlled Substances Test
                  </label>
                </p>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.toggle}>
              Close
            </Button>{" "}
            <PdfME
              id="pdfME"
              Name={this.props.driver.Name + " " + this.props.driver.LastName}
              Ssn={this.props.driver.Ssn}
              License={this.props.driver.License}
              typeL={this.props.driver.TypeLicense}
              data={this.props.data}
              state={state}
            />
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MultiEmployment;
