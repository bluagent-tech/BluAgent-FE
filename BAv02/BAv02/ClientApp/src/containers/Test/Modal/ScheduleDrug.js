import React from "react";
import { Modal, ModalHeader, ModalBody, FormGroup } from "reactstrap";

import StepWizard from "./../../../components/StepWizard";
import StepBegin from "./../../../containers/Test/StepWizardDrugTest/StepBegin";
import StepAssigned from "./../../../containers/Test/StepWizardDrugTest/StepAssigned";
import StepCollectionsSite from "./../../../containers/Test/StepWizardDrugTest/StepCollectionsSite";
import StepDetailEnd from "./../../../containers/Test/StepWizardDrugTest/StepDetailEnd";

//SCHEDULE DRUG TEST MODAL

class ScheduleDrug extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className="col-md-3">
        <input
          type="image"
          onClick={this.toggle}
          className="img-responsive"
          src="assets/img/dashboard/back/test/drug1.png"
          onMouseOver={(e) =>
            (e.currentTarget.src = "/assets/img/dashboard/front/test/drug.png")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = "assets/img/dashboard/back/test/drug1.png")
          }
          alt="Submit"
          height="100"
          width="100"
        />
        <h6>SCHEDULE DRUG TEST</h6>

        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="ScheduleModal" toggle={this.toggle}></ModalHeader>
          <ModalBody style={{ overflow: "hidden" }}>
            <FormGroup>
              <StepWizard
                pageTitles={[
                  <StepBegin />,
                  <StepAssigned />,
                  <StepCollectionsSite />,
                  <StepDetailEnd />,
                ]}
              />
            </FormGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ScheduleDrug;
