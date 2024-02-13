import React, { Fragment, useRef, useEffect, useState } from "react";
import { Col, Row, Card, CardBody } from 'reactstrap';
import "../Widgets/widgets_style/style.css"
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as actionCreatorsDevices } from "../../store/DevicesStore";
import { actionCreators as actionCreatorsMaintenance } from "../../store/Maintenance";
import Loading from "../../components/Loading";
import eventsTypes from "../AICamera/eventsTypes.json";

const CameraAlerts = () => {
  // * Dispatch
  const dispatch = useDispatch();

  // * Data del local storage para treaer el Id del usuario y el ID de la compania
  const idCompany = JSON.parse(localStorage.getItem("idCompany"));
  const idUser = JSON.parse(localStorage.getItem("user")).Id;

  // * Variables de estado
  const [count, setCount] = useState(0);
  const [truck, setTruck] = useState("");

  let refTime = useRef([]);

  // * Estado de los stores que vamos a usar
  //const isLoadingCard = useSelector((state) => state.devices.isLoadingCard)
  const cameraData = useSelector((state) => state.devices.camera); // ? Datos de la tabla de MT.Camera
  // const vehicles = useSelector((state) => state.devices.trucks); // ? truck de la lambda de Fleet
  // const maintenanceVehicles = useSelector((state) => state.maintenance.trucks); // ? Trucks de la base de datos de MT.Maintenance
  const isLoading = useSelector((state) => state.devices.isLoadingCard);
  const mediaList = useSelector((state) => state.devices.mediaListForCard); // ? Lista de los evento de la lambda de Fleet
  const cameraKey = useSelector((state) => state.devices.apiKey);

  // * Funcion para generar las 52 semandas de un año apartir del dia de hoy 
  const generateWeekOptions = (dateFromCamera) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentDayOfWeek = currentDate.getDay();
    const daysUntilLastMonday =
      currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const lastMondayDate = new Date(
      currentDate.getTime() - daysUntilLastMonday * 24 * 60 * 60 * 1000
    );

    // Convertir dateFromCamera a objeto Date
    const cameraDate = new Date(dateFromCamera);

    // Definir el inicio y el fin de la semana actual
    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setDate(currentWeekStart.getDate() - daysUntilLastMonday);
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

    // Verificar si la fecha de la cámara está dentro de la semana actual
    const isCameraDateInCurrentWeek = cameraDate >= currentWeekStart && cameraDate <= currentWeekEnd;

    const weekNames = [];
    for (let i = 0; i < 2; i++) {
      const weekStartDate = new Date(
        lastMondayDate.getTime() - i * 7 * 24 * 60 * 60 * 1000
      );
      const endOfWeek = new Date(
        weekStartDate.getTime() + 1 * 7 * 24 * 60 * 60 * 1000
      );

      const weekName = `Week of ${weekStartDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;

      if (i === 0) {
        weekNames.push("current " + weekName);
        if (isCameraDateInCurrentWeek) {
          refTime.current.push({
            week: weekName,
            start: 0,
            end: 0
          });
        } else {
          refTime.current.push({
            week: weekName,
            start: Math.floor(Date.parse(weekStartDate) / 1000),
            end: Math.floor(Date.parse(currentDate) / 1000),
          });
        }
      } else {
        weekNames.push(weekName);
        if (isCameraDateInCurrentWeek) {
          refTime.current.push({
            week: weekName,
            start: 0,
            end: 0
          });
        } else {
          refTime.current.push({
            week: weekName,
            start: Math.floor(Date.parse(weekStartDate) / 1000),
            end: Math.floor(Date.parse(endOfWeek) / 1000),
          });
        }
      }
    }
    return weekNames;
  };


  // * Llamada a los stores
  useEffect(() => {
    dispatch(actionCreatorsMaintenance.getTrucks(idUser, 1, 1000, true)); // ? Funcion para traer los truks activos de la compania
    // dispatch(actionCreatorsDevices.GetCameraByIdCompanyAndType(idCompany, 'Camera')); // ? funcion para traer los datos de la tabla MT.Camera
  }, []);

  useEffect(() => {
    dispatch(actionCreatorsDevices.GetAllVehicles()); // ? funcion para traer todos los vehiculos de una compania
    
  },[cameraKey])

  useEffect(() => {

    //var filterCamera = [];

    var filterCamera = cameraData.filter(item => item.status === "Assigned" || item.status === "Pending to unassign");
    dispatch(actionCreatorsDevices.cleanMediaListForCard(true));
    filterCamera.map(camera => {
      generateWeekOptions(camera.startDate);
      dispatch(actionCreatorsDevices.GetMediaListForCard(camera.serialNumber, refTime.current[1].start, refTime.current[1].end));
    });
  }, [cameraData])


  function buscarIDRepetido(mediaList) {
    const frecuenciaIDs = {};

    mediaList.forEach(id => {
      if (frecuenciaIDs[id]) {
        frecuenciaIDs[id]++;
      } else {
        frecuenciaIDs[id] = 1;
      }
    });

    let idRepetido = null;
    let maxFrecuencia = 0;

    for (const id in frecuenciaIDs) {
      if (frecuenciaIDs[id] > maxFrecuencia) {
        idRepetido = id;
        maxFrecuencia = frecuenciaIDs[id];
      }
    }

    if (idRepetido === null || maxFrecuencia === 1) {
      idRepetido = mediaList[0];
    }
    // console.log('id', idRepetido);
    if (idRepetido === undefined) {
      return 0
    } else {
      return idRepetido;
    }
  }

  const idRepetido = buscarIDRepetido(mediaList);
  // console.log("ID repetido:", idRepetido);
  // console.log(refTime.current[4]);
  // console.log('el de afuera', { mediaList });
  // console.log('loading', isLoading);
  return isLoading ? (
    <div className="row justify-content-center">
      <Loading />
    </div>
  ) : (
    <div className="fade-in-down">
      <div className="card">
        <div className="card-body">
          <Fragment>
            <div className="text-right">
              {idRepetido == 0 ? (
                <i
                  className="fa fa-check" aria-hidden="true"
                  style={{
                    fontSize: 27,
                    color: "green",
                  }}
                ></i>
              ) : (
                <i
                  className="fa fa-exclamation-triangle"
                  style={{
                    fontSize: 27,
                    color: "red",
                  }}
                ></i>
              )}
            </div>
            <div className="text-center text-header-widget panels-text">
              <div>
                {eventsTypes.filter((item) => item.id == idRepetido)[0].name}
              </div>
            </div>
            <div>
              <Row>
                <Col>
                  <div
                    style={{ position: "relative" }}
                    className="text-muted text-uppercase font-weight-bold"
                  >
                    COMMON EVENTS PER WEEK
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

export default CameraAlerts;
