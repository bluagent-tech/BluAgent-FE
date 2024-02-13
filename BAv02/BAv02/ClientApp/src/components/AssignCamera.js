import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as actionDevices } from "../store/DevicesStore";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
} from "reactstrap";

const AssignCamera = (props) => {
  const Color = "primary";
  const modalHeader = "Assign";
  const dispatch = useDispatch();
  const [idVehicle, setIdVehicle] = useState();
  const [dropdownVehicle, setDropdownVehicle] = useState([]);
  const maintenanceVehicles = useSelector((state) => state.maintenance.trucks);
  const cameraData = useSelector((state) => state.devices.camera);
  const serial = useSelector((state) => state.devices.serialNumber);
  const status = useSelector((state) => state.devices.cameraStatus);
  
  useEffect(() => {
    constructorList(maintenanceVehicles, cameraData)
  }, [maintenanceVehicles, cameraData])
  

  const constructorList = (vehicles, cameras) => {
    let vehiculosSinCamara = vehicles.filter(vehiculo => !cameras.some(camara => camara.idVehicle === vehiculo.Id));
    if (vehiculosSinCamara !== undefined && vehiculosSinCamara !== null) {
        setDropdownVehicle(
            vehiculosSinCamara.map((option, index) => {
          if (index === 0) {
            setIdVehicle(option.Id);
          }
          return (
            <option 
            key={option.Id} 
            label={option.Name} 
            value={option.Id}>
                {option.Name}
            </option>
          );
        })
      );
    }
  };

  const handleVehicleChange = (event) => {
    setIdVehicle(event.target.value);
  };
  
  return (
    <Modal isOpen={props.modal} className={"modal-" + Color}>
      <ModalHeader toggle={props.toggle}>
        {props.modalHeader === undefined ? modalHeader : props.modalHeader.toUpperCase()}
      </ModalHeader>
      <ModalBody>
        {props.message}
        <div className="form-group col-md-6">
          <label htmlFor="vehicles">Vehicles</label>
          <select
            id="vehicles"
            className="form-control"
            value={idVehicle}
            onChange={handleVehicleChange}>
            <option value="">Select...</option>
            {dropdownVehicle}
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          color={Color}
          onClick={() => {
            dispatch(actionDevices.UpdateCameraStatus(idVehicle, serial, status, "Camera", props.idCompany ))
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

export default AssignCamera;
