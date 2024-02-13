import React, { Fragment, useState, useRef, useEffect } from "react";
import "../Widgets/widgets_style/style.css"
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Card, CardBody } from 'reactstrap';
import { actionCreators as actionCreatorsDevices } from "../../store/DevicesStore";

const CameraVehicles = () => {
  // * Dispatch
  const dispatch = useDispatch();

  // * Data del local storage para treaer el Id del usuario y el ID de la compania
  const idCompany = JSON.parse(localStorage.getItem("idCompany"));
  const idUser = JSON.parse(localStorage.getItem("user")).Id;

  const [count, setCount] = useState(0);

  // * Estado de los stores que vamos a usar
  const cameraData = useSelector((state) => state.devices.camera); // ? Datos de la tabla de MT.Camera
  const isLoading = useSelector((state) => state.devices.isLoadingMTC); // ? Variable is loading del store de Devices

  useEffect(() => {
    setCount(cameraData.filter((data) => data.status === 'Assigned' || data.status === 'Pending to unassign'))
  }, [isLoading])

  return (
    <div className="fade-in-down">
      <div className="card" >
        <div className="card-body">
          <Fragment>
            <div className="text-right">
              <img
                height="30"
                src="assets/icons/icons8-truck.svg"
                alt="notification-icon"
              />
            </div>
            <div className="text-center text-header-widget panels-text">
              {count.length}
            </div>
            <div>
              <Row>
                <Col>
                  <div
                    style={{ position: "relative" }}
                    className="text-muted text-uppercase font-weight-bold"
                  >
                    ACTIVE CAMERAS
                  </div>
                </Col>
              </Row>
            </div>
          </Fragment>
        </div>
      </div>
    </div>

  );
};

export default CameraVehicles;
