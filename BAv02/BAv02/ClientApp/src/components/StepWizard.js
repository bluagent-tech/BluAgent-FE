import React from 'react';
import StepWizard from 'react-step-wizard';
import { Modal, ModalHeader, ModalBody, FormGroup, Form } from 'reactstrap';
const idCompany = localStorage['idCompany'];
const idUser = JSON.parse(localStorage.getItem('user')).Id;

const ModalStepWizard = (props) => {
  return (
    <Modal isOpen={props.openState} className={props.modalClass}>
      <ModalHeader toggle={props.modalToggle}>{props.modalTitle}</ModalHeader>
      <ModalBody style={{ overflow: 'hidden' }}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            let form = new FormData(e.target);
            form.append('VehicleType', props.vehicleType);
            form.append('IdVehicle', props.idVehicle);
            form.append('idCompany', idCompany);
            form.append('IdUser', idUser);
            props.submit(form);
          }}
        >
          <FormGroup>
            <StepWizard>{props.pagesSections}</StepWizard>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalStepWizard;
