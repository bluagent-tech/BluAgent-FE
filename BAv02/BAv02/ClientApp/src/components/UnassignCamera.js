import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as actionDevices } from "../store/DevicesStore";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button
} from "reactstrap";

const UnassignCamera = (props) => {
  const Color = "primary";
  const modalHeader = "Unassign";

  const dispatch = useDispatch();

  const serial = useSelector((state) => state.devices.serialNumber);
  const status = useSelector((state) => state.devices.cameraStatus);

  return (
    <Modal isOpen={props.modal} className={"modal-" + Color}>
      <ModalHeader toggle={props.toggle}>
        {props.modalHeader === undefined ? modalHeader : props.modalHeader.toUpperCase()}
      </ModalHeader>
      <ModalBody>
        {props.message}
        <div className="form-group col-md-6">
        Do you want to send a request to unassign the vehicle's camera?
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          color={Color}
          onClick={() => {
            dispatch(actionDevices.UpdateCameraStatus(null, serial, status, "Camera", props.idCompany ))
            props.toggle()
          }}
        >
          {props.modalHeader === undefined ? modalHeader : modalHeader}
        </Button>{" "}
        <Button
          color="secondary"
          onClick={() => {
            props.toggle();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UnassignCamera;
