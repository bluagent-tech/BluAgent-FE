import React from "react";
import { Modal, ModalHeader, ModalBody, FormGroup } from "reactstrap";

import StepWizard from "./../../../components/StepWizard";
import StepBegin from "./../../../containers/Test/StepWizardAlcoholTest/StepBegin";
import StepAssigned from "./../../../containers/Test/StepWizardAlcoholTest/StepAssigned";
import StepCollectionSite from "./../../../containers/Test/StepWizardAlcoholTest/StepCollectionSite";
import StepDetailEnd from "./../../../containers/Test/StepWizardAlcoholTest/StepDetailEnd";

//SCHEDULE ALCOHOL TEST

class ScheduleAlcohol extends React.Component {
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
          src="assets/img/dashboard/back/test/alcohol1.png"
          onMouseOver={(e) =>
            (e.currentTarget.src =
              "/assets/img/dashboard/front/test/alcohol.png")
          }
          onMouseOut={(e) =>
            (e.currentTarget.src =
              "assets/img/dashboard/back/test/alcohol1.png")
          }
          alt="Submit"
          height="100"
          width="100"
        />
        <h6>SCHEDULE ALCOHOL TEST</h6>

        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="ScheduleModal" toggle={this.toggle}></ModalHeader>
          <ModalBody style={{ overflow: "hidden" }}>
            <FormGroup>
              <StepWizard
                pageTitles={[
                  <StepBegin />,
                  <StepAssigned />,
                  <StepCollectionSite />,
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

export default ScheduleAlcohol;
