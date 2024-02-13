import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as actionDevices } from "../store/DevicesStore";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button
} from "reactstrap";

const AcceptRequest = (props) => {
  const Color = "primary";
  const modalHeader = "Request";

  const dispatch = useDispatch();

  const serial = useSelector((state) => state.devices.serialNumber);
  const status = useSelector((state) => state.devices.cameraStatus);

  return (
    <Modal isOpen={props.modal} className={"modal-" + Color}>
      <ModalHeader toggle={props.toggle}>
        {props.modalHeader === undefined ? modalHeader : props.modalHeader}
      </ModalHeader>
      <ModalBody>
        {props.message}
        <div className="form-group col-md-6">
        Are you sure you want to accept the request?
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          color={Color}
          onClick={() => {
            dispatch(actionDevices.UpdateCameraStatus(null, serial, status, props.typeDevice, props.idCompany))
            props.toggle()
          }}
        >
          {"Accept"}
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

export default AcceptRequest;
