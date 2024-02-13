import React, { Fragment, useRef, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

const CameraStatus = () => {
  // * Estado de los stores que vamos a usar
  const isLoadingtrucks = useSelector((state) => state.maintenance.isLoadingTrucks)
  const cameraData = useSelector((state) => state.devices.camera); // ? Datos de la tabla de MT.Camera
  const maintenanceVehicles = useSelector((state) => state.maintenance.trucks); // ? Trucks de la base de datos de MT.Maintenance
  const isLoading = useSelector((state) => state.devices.isLoadingMTC);
  const [filteredMaintenanceVehicles, setFilteredMaintenanceVehicles] = useState([]);

  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // * Funcion para Crear una lista de los vehiculos que tengan el estatus de "Assigned" o "Pending to unassing" 
    setActive(cameraData.filter((row) => row.status === "Assigned" || row.status === "Pending to unassign").length)
    setInactive(cameraData.filter((row) => row.status === "Ready to Assign" || row.status === "Pending to assign").length)
  }, [isLoading])

  // * Función para filtrar los vehículos de mantenimiento
  const filterMaintenanceVehicles = () => {
    const filteredList = maintenanceVehicles.filter((item) => {
      // console.log(item);
      const idVehicleList = cameraData.map((camera) => camera.idVehicle);
      return !idVehicleList.includes(item.Id);
    });

    setFilteredMaintenanceVehicles(filteredList);
  };

  useEffect(() => {
    // Filtrar los vehículos de mantenimiento cuando cambien cameraData o maintenanceVehicles
    filterMaintenanceVehicles();
    if (isLoading == false && isLoadingtrucks == false) {
      setLoading(false);
    }
  }, [isLoadingtrucks, isLoading]);


  // console.log('Vehicles', maintenanceVehicles);
  // console.log('active: ', active);
  // console.log('inactive: ', inactive);
  // console.log(cameraData);
  // console.log(maintenanceVehicles);
  // console.log('filter vehicles', filteredMaintenanceVehicles);
  return loading ? (
    <div className="row justify-content-center">
      <Loading />
    </div>
  ) : (
    <div className="fade-in-down">
      <div className="card">
        <div className="card-body" >
          <Fragment>
            <div className="d-flex" style={{
              marginTop: 10
            }}>
              <div className="col-sm-4">
                <div className="row d-flex justify-content-center">
                  {" "}
                  <div
                    className="rounded-circle bg-success position-relative"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  ></div>
                </div>
                <div className="text-center text-header-widget panels-text">
                  {active}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="row d-flex justify-content-center">
                  {" "}
                  <div
                    className="rounded-circle bg-danger position-relative"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  ></div>
                </div>
                <div className="text-center text-header-widget panels-text">
                  {inactive}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="row d-flex justify-content-center">
                  {" "}
                  <div
                    className="rounded-circle bg-secondary position-relative"
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  ></div>
                </div>
                <div className="text-center text-header-widget panels-text">
                  {filteredMaintenanceVehicles.length}
                </div>
              </div>
            </div>
            <div>
              <Row>
                <Col>
                  <div
                    style={{ position: "relative" }}
                    className="text-muted text-uppercase font-weight-bold"
                  >
                    CAMERA STATUS
                  </div>
                </Col>
              </Row>
            </div>
          </Fragment>
        </div>
      </div>
    </div>
  )
};

export default CameraStatus;
