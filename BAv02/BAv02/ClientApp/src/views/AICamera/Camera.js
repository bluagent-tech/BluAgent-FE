import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { Col, Row } from "reactstrap";
import { actionCreators as actionDevices } from "../../store/DevicesStore";
import DropDownCamera from "../../components/DropDownCamera";
import AssignCamera from "../../components/AssignCamera";
import UnassignCamera from "../../components/UnassignCamera";
import ToastAlert from "../../components/ToastAlert";

const Camera = (props) => {
  const userCompany = JSON.parse(localStorage.getItem("idCompany"));
  const [assignCamera, setAssignCamera] = useState(false);
  const [unassignCamera, setUnassignCamera] = useState(false);

  const dispatch = useDispatch();
  const listOfCamera = useSelector((state) => state.devices.camera);
  const toastState = useSelector((state) => state.devices.toastAlertState);
  const message = useSelector((state) => state.devices.message);
  const error = useSelector((state) => state.devices.error);

  const columns = [
    {
      name: "SERIAL NUMBER",
      selector: "serialNumber",
      sortable: true,
    },
    { name: "STATUS", selector: "status" },
    { name: "OPTIONS", selector: "options", grow: 0, center: true },
  ];

  const toggleToastAlert = () => {
    dispatch(actionDevices.toggleToastAlert);
  };

  const toogleAssignCamera = (serialNumber, status) => {
    dispatch(actionDevices.assignData(serialNumber, status));
    setAssignCamera(!assignCamera);
  };

  const toogleUnassignCamera = (serialNumber, status) => {
    dispatch(actionDevices.assignData(serialNumber, status));
    setUnassignCamera(!unassignCamera);
  };

  const MapCameraForDataTable = (items) => {
    let data = items.map((row) => {
      var object = {};
      object.serialNumber = row.serialNumber;
      object.status = row.status;
      object.options = (
        <OptionMenu
          reduxProps={props}
          status={row.status}
          serialNumber={row.serialNumber}
        />
      );
      return object;
    });
    return data;
  };

  const OptionMenu = ({ reduxProps, serialNumber, status }) => {
    if (status === "Ready to Assign") {
      return (
        <div className="text-center">
          <DropDownCamera
            direction="right"
            itemID={serialNumber}
            cameraStatus={status}
            menuOptions={[
              [
                "Assign",
                () => {
                  toogleAssignCamera(serialNumber, status);
                },
              ],
            ]}
          />
        </div>
      );
    }
    if (status === "Assigned") {
      return (
        <div className="text-center">
          <DropDownCamera
            direction="right"
            itemID={serialNumber}
            cameraStatus={status}
            menuOptions={[
              [
                "Request Unassign",
                () => {
                  toogleUnassignCamera(serialNumber, status);
                },
              ],
            ]}
          />
        </div>
      );
    }
    if (status === "Pending to unassign" || status === "Pending to assign") {
      return (
        <div className="text-center">
          <DropDownCamera
            direction="right"
            itemID={serialNumber}
            cameraStatus={status}
            menuOptions={[["Waiting request"]]}
          />
        </div>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <DataTable
              responsive={true}
              pagination
              columns={columns}
              data={MapCameraForDataTable(listOfCamera)}
            />
          </Col>
        </Row>
        <AssignCamera
          modalType="Assigned Camera"
          modal={assignCamera}
          toggle={() => {
            toogleAssignCamera();
          }}
          idCompany={userCompany}
        />
        <UnassignCamera
          modalType="Unassign Camera"
          modal={unassignCamera}
          toggle={() => {
            toogleUnassignCamera();
          }}
          idCompany={userCompany}
        />
      </div>
      <ToastAlert
        toggleToast={toggleToastAlert}
        isOpen={toastState}
        message={message}
        error={error}
      />
    </React.Fragment>
  );
};

export default Camera;
