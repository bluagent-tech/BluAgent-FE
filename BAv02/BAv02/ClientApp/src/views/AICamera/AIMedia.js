import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as actionCreatorsMaintenance } from "../../store/Maintenance";
import { actionCreators as actionCreatorsDevices } from "../../store/DevicesStore";
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "../../components/Select";
import DataTable from "react-data-table-component";
import "./ai_camera_style.css";
import moment from "moment";
import Loading from "../../components/Loading";
import alertTypes from "./alertTypes.json";
import eventsTypes from "./eventsTypes.json";
import GoogleMaps from "../../components/googleMap/map.js";
import noData from "../../assets/icons/icons8-no-video-80.png";
import crashCar from "../../assets/icons/icons8-crashed-car.svg";

const AIMedia = () => {
  let userCompany = JSON.parse(localStorage.getItem("user"));
  let idUSer = userCompany.Id;
  const [dataTable, setDataTable] = useState([]);
  const [alerts, setAlerts] = useState("");
  const [selectedRows, setSelectedR] = useState([]);
  const [selectTruck, setSelectTruck] = useState(true);
  const [selectWeek, setSelectWeek] = useState(true);
  const [week, setWeek] = useState("");
  const [truck, setTruck] = useState("");
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [mapButton, setMapButton] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isOpenNoData, setIsOpenNoData] = useState(false);
  const [videoMediaData, setVideoMediaData] = useState("");

  let refSelected = useRef([]);
  let refTime = useRef([]);
  //Dispatch
  const dispatch = useDispatch();
  const toggleModal = () => setIsOpen(!isOpen);
  const toggleModalNoData = () => setIsOpenNoData(!isOpenNoData);
  const toggleModalVideo = () => {
    setIsOpenVideo(!isOpenVideo);
  };
  const _handleDispatchVideo = (eventId) => {
    dispatch(actionCreatorsDevices.GetMediaData(eventId));
  };

  /**
   * Data del local storage para treaer el Id del usuario y el ID de la compania
   */
  const idCompany = JSON.parse(localStorage.getItem("idCompany"));
  const idUser = JSON.parse(localStorage.getItem("user")).Id;

  // * Estado de los stores que vamos a usar
  const cameraData = useSelector((state) => state.devices.camera); // ? Datos de la tabla de MT.Camera
  const vehicles = useSelector((state) => state.devices.trucks); // ? truck de la lambda de Fleet
  const maintenanceVehicles = useSelector((state) => state.maintenance.trucks); // ? Trucks de la base de datos de MT.Maintenance
  const alertData = useSelector((state) => state.devices.alerts); // ? Alertas que vienen de la lambda de Fleet
  const mediaList = useSelector((state) => state.devices.mediaList); // ? Lista de los evento de la lambda de Fleet
  const isLoading = useSelector((state) => state.devices.isLoading); // ? Variable is loading del store de Devices
  const isLoadingVideo = useSelector(
    (state) => state.devices.isLoadingMediaData
  ); // ? Variable isloadingVideo para cuando se pide el link de un video
  const urlVideos = useSelector((state) => state.devices.mediaData); // ? variable que trae los videos encontrados en ese event id
  const listen = useSelector((state) => state.devices.listenAiMedia); // ? variable para manejar el cambio de datos desde la pestana de Camera
  const cameraKey = useSelector((state) => state.devices.apiKey);
  // * Llamada a los stores
  useEffect(() => {
    dispatch(actionCreatorsMaintenance.getTrucks(idUser, 1, 1000, true)); // ? Funcion para traer los truks activos de la compania
    dispatch(actionCreatorsDevices.GetCameraByIdCompanyAndType(idCompany, "Camera"));
    dispatch(actionCreatorsDevices.GetCameraKey(idCompany)); // ? funcion para traer los datos de la tabla MT.Camera
  }, []);

  useEffect(() => {
    dispatch(actionCreatorsDevices.GetAllVehicles()); // ? funcion para traer todos los vehiculos de una compania
  }, [cameraKey]);

  // * Se llama a la funcion GetMediaList o GetAlerts dependiendo de las selecciones
  useEffect(() => {
    if (truck !== "" && week !== "") {
      // ? En caso de que se haya seleccionado truck y week se setearan los datos del truck en constantes
      const serial = truck.Serial; // ? Numero de serie del dispositivo
      const start = week.start; // ? Fecha de inicio en formato UTC
      const end = week.end; // ? Fecha de terminacion en formato UTC
      const cameraSerial = truck.CameraSerial; // ? Numero de serie de la camara
      // ! Nota: serial y cameraSerial no son lo mismo.
      // ! serial es el numero de serie del dispositivo dentro del truck (No camara)
      // ! cameraSerial es el numero de serie de la camara dentro del truck

      if (alerts == "event") {
        console.log('Dentro del if >>> EVENT: ', alerts);
        // ? Si el tipo es evento llamaremos a la funcion GetMediaList que obtiene los eventos en esa fecha para esa camara
        dispatch(actionCreatorsDevices.GetMediaList(cameraSerial, start, end));
      } else if (alerts == "alert") {
        // ? Si el tipo de alerta es alerta llamaremos a la funcion GetAlerts que obtiene las alertas en esa fecha para ese dispositivo
        dispatch(actionCreatorsDevices.GetAlerts(serial, start, end));
      }
    }
  }, [truck, week, dispatch, alerts, listen]);

  // * Se asigna el valor a la tabla dependiendo la seleccion del usuario
  useEffect(() => {
    if (truck !== "" && week !== "" && alerts == "alert") {
      //  ? Si el usuario seleccion truck, semana y alerta, la tabla mostrara las alertas
      setDataTable(alertData); // ? setea la tabla con los datos de las alartas
    }
    if (truck !== "" && week !== "" && alerts == "event") {
      // ? si el usuario selecciono truck, semana y evento, la tabla mostrara los eventos
      setDataTable(mediaList); // ? setea la tabla con los datos de los eventos
    }
    if (truck === "" || week === "") {
      setDataTable([]); // ? En caso de que el usuario no haga una seleccion se limpiara la tabla
    }
  }, [alertData, truck, week, alerts, mediaList, listen]); // ? Esto se ejectura cada que cambien las variables: alertData, truck, week, alerts, mediaList

  // ! Se esta implementando esta funcion ya que al momento de setear un valor el primer elemento de la tabla se deselecciona pero queda seleccionado
  // ! dentro del codigo.
  // * Esta funcion se utiliza para borrar los check seleccionados dentro de la tabla
  useEffect(() => {
    if (isOpen !== true) {
      setToggleClearRows(!toggledClearRows);
    }
  }, [isOpen]);

  // * Funcion para generar las 52 semandas de un año apartir del dia de hoy
  /**
   * `generateWeekOptions` genera una lista de nombres de semanas
   * desde la fecha en la que se asigna una cámara a un camión (`truck.startDate`)
   * hasta la fecha actual.
   *
   * @returns {string[]} Un array de nombres de semanas.
   *
   * Notas:
   * - Si `truck.startDate` es `undefined`, la función retorna una lista vacía.
   * - La semana actual se marca con el prefijo "current".
   */
  const generateWeekOptions = () => {
    if (!truck.startDate) {
      return [];
    }
  
    const startDate = new Date(truck.startDate);
    startDate.setHours(0, 0, 0, 0);
  
    const weekNames = [];
    let weekStartDate = new Date(startDate);
    weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay() + 1);
  
    const actualDate = new Date();
    const currentWeekStart = new Date(actualDate);
    currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay() + 1);
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
  
    while (weekStartDate <= actualDate) {
      const weekName = `Week of ${weekStartDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
  
      const endOfWeek = new Date(weekStartDate);
      endOfWeek.setDate(weekStartDate.getDate() + 6);
  
      refTime.current.push({
        week: weekName,
        start: Math.floor(Date.parse(weekStartDate) / 1000),
        end: Math.floor(Date.parse(endOfWeek) / 1000),
      });
  
      weekNames.push(weekName);
  
      weekStartDate.setDate(weekStartDate.getDate() + 7);
    }
  
    return weekNames;
  };
  // * Mapea los nombres de semanas generados a un formato específico
  const optionsWeek = generateWeekOptions().map((weekName, index) => ({
    Id: index,
    Name: weekName,
  }));

  // * Esta funcion se encarga de manejar la seleccion de un truck dentro del dropdown
  const handleVechicle = (e) => {
    const selectedIndex = e.target.selectedIndex; // ? obtenemos la posicion del vehiculo dentro del dropdown
    const selectedOption = e.target.options[selectedIndex].innerText; // ? obtenemos el texto dentro de esa posicion (el nombre del vehiculo)

    maintenanceVehicles.forEach((element, index) => {
      // ? creamos un foreach para navegar entre los trucks que tenemos en la tabla de MT.Vehicles
      if (selectedOption === element.Name && selectedOption !== "SELECT") {
        // ? Verificamos si el nombre del truck del dropdown conincide con el de MT.Vehicles y si es diferente de "SELECT" para
        var match = vehicles.filter(
          (elementMatch) => element.Name === elementMatch.name
        ); // ? Creamos un filter para obtener un match por medio de VIN con el elemento de nuestro foreach y los datos de los vehiculos de la lambda de fleet
        var matchForCamera = cameraData.filter(
          (elementVehicles) => elementVehicles.vehicleNumber === match[0].name
        ); // ? Creamos otro filter para obtener los datos de la tabla MT.Camera en funcion del nombre del vehiculo y el match anterior

        setTruck({
          // ? Seteamos dentro de la variable Truck los valores que necesitamos
          lat: "",
          lng: "",
          CameraSerial: matchForCamera[0].serialNumber,
          Name: element.Name,
          Serial: match[0].serial,
          startDate: matchForCamera[0].startDate,
        });
        setToggleClearRows(!toggledClearRows); // ? Borramos la seleccion de las columnas de la tabla
      } else if (e.target.value == "") {
        // ? Si seleccionamos otra cosas que no sea un truck se pondra en "" la variable Truck
        setTruck("");
      }
    });
    setSelectTruck(false); // ? Ponemos la variable booleana de truck en false indicando que no hay truck seleccionado
    setToggleClearRows(!toggledClearRows); // ? Borramos la seleccion de las columnas de la tabla
  };

  // * Esta funcion se encarga de manejar la seleccion de las semanas dentro del dropdown
  const handleWeek = (e) => {
    var item = e.target.value; // ? Asignamos a item el valot de la seleccion
    refTime.current.forEach((day, index) => {
      // ? hacemos un foreach de variable de refTime para obtener el la semana deacuerdo a la selccion del dropdown
      if (index == item && item != "") {
        // ? Si los datos coinciden colocamos dentro de la variable week la semana seleccionada
        setWeek(day);
        setToggleClearRows(!toggledClearRows); // ? Borramos la seleccion de las columnas de la tabla
      } else if (e.target.value == "") {
        setWeek("");
      }
    });
    setSelectWeek(false);
    setToggleClearRows(!toggledClearRows); // ? Borramos la seleccion de las columnas de la tabla
  };

  // * Funcion para manejar la seleccion de los radio buttons
  const handledOnChange = (e) => {
    const value = e.target.value; // ? Obtenemos el valor del radio button seleccionado
    const id = e.target.id;
    if (value === "on") {
      // ? verificamos si el valor de algun radio button esta en "on"
      if (id === "event") {
        // ? Verificamos si el id del radio button es "event" y si es true seteamos la varaible alerts en "event" y mapButon en false para que aparesca
        setAlerts("event");
        setMapButton(false);
        setToggleClearRows(!toggledClearRows); // ? Borramos la seleccion de las columnas de la tabla
      } else {
        // ? En caso de ser false seteamos el valor de la variable alerts en
        setAlerts("alert");
        setMapButton(false);
        setToggleClearRows(!toggledClearRows); // ? Borramos la seleccion de las columnas de la tabla
      }
    }
  };

  // * Esta funcion maneja las selecciones de la tabla
  // ! estamos usando una referencia porque al momento de usar un useState se borra el primer campo de la tabla
  const handleChange = ({ selectedRows }) => {
    var sR = selectedRows; // ? Mediante una variable de referencia asignamos el arreglo de las selecciones
    refSelected.current = sR;
  };

  // * Datos de la tabla cuando seleccionamos la opción de alertas
  const columns = [
    {
      name: "DATE",
      selector: (row) => row.date,
      sortable: true,
      center: true,
    },
    {
      name: "TRUCK",
      selector: (row) => row.truck,
      center: true,
    },
    {
      name: "ALERT NAME",
      selector: (row) => row.alertName,
      center: true,
      sortable: true,
    },
    // {
    //   name: "TYPE",
    //   selector: (row) => row.eventName,
    //   center: true,
    // },
    {
      name: "SPEED",
      selector: (row) => row.speed,
      center: true,
    },
    {
      name: "ADDRES",
      selector: (row) => row.addres,
      center: true,
    },
  ];

  // * Datos de la tabla cuando seleccionamos la opción Event
  const columnsEvent = [
    {
      name: "DATE",
      selector: (row) => row.date,
      sortable: true,
      center: true,
    },
    {
      name: "CAMERA",
      selector: (row) => row.camera,
      center: true,
    },
    {
      name: "EVENT NAME",
      selector: (row) => row.eventName,
      center: true,
      visible: false,
      // sortable: true,
    },
  ];

  // * Funcion para Crear una lista de los vehiculos que tengan el estatus de "Assigned" o "Pending to unassing"
  const vechicleOptionsData = cameraData.filter(
    (row) => row.status === "Assigned" || row.status === "Pending to unassign"
  );

  // * Funcion para mostrar los vehiculos dentro del dropdown en funcion de la lista anterior
  const options = vechicleOptionsData.map((row, index) => ({
    Id: index,
    Name: row.vehicleNumber,
  }));

  // * Funcion va de la mano con la funcion de filterAlertById, ya que en caso de que id de la alerta conincida con el Id del evento se regresara el nombre del evento
  // * En vez del nombre de la alerta, esto con la finalidad de poder observar cual es evento dentro de las alertas
  const filterEventById = (number) => {
    var data = {};
    const result = eventsTypes.filter((eventItem) => eventItem.id == number);
    if (result[0] != undefined) {
      data = { name: result[0].name, type: 1 };
      return data;
    }
    return { name: "NA", type: 1 };
  };

  // * Filtramos el JSON de alertas para obtener el nombre de la alerta en base al id de la alerta que le pasemos
  const filterAlertById = (number) => {
    var eventResutl = "";
    const result = alertTypes.filter((alert) => alert.id == number);
    eventResutl = filterEventById(result[0] !== undefined ? result[0].id : 0);
    if (eventResutl.name != "NA") {
      return eventResutl;
    } else {
      return result[0] !== undefined
        ? { name: result[0].name, type: 0 }
        : "N/A";
    }
  };

  // * Esta funcion se encarga de convertir el formato UTC o Epoch a una fecha normal
  const convertEpochToDate = (epoch) => {
    var d = new Date(0);
    if (alerts == "event") {
      d.setUTCMilliseconds(epoch);
    } else {
      d.setUTCSeconds(epoch);
    }
    return moment(d).format("MM-DD-YYYY");
  };

  // * Esta es la data que la tabla tendra y varia en funcion si tenemos seleccionado alerta o evento
  var data =
    dataTable !== null && dataTable !== undefined
      ? dataTable.map((row, index) => ({
          eventId: row.eventId ?? "",
          id: index,
          date: convertEpochToDate(row.date ?? 0),
          truck: truck.Name,
          camera: row.serial,
          alertName: row.name,
          // ? aqui es donde se llama a las funciones de filterAlertById o filterEventById en funcion del tipo de alerta que hayamos selccioado
          eventName:
            alerts == "alert"
              ? filterAlertById(row.alertTypeId).name
              : alerts == "event"
              ? Link(
                  filterEventById(row.eventType).name,
                  filterEventById(row.eventType).type,
                  truck.Name,
                  truck.Serial,
                  truck.CameraSerial,
                  convertEpochToDate(row.date ?? 0),
                  row.speed ?? 0,
                  parseFloat(row.lat),
                  parseFloat(row.lng),
                  row.eventId
                )
              : 0,
          speed: row.speed,
          addres: row.address,
          //eventName: row.name,
          lat:
            alerts == "alert" ? parseFloat(row.lat / 1e7) : parseFloat(row.lat),
          lng:
            alerts == "alert" ? parseFloat(row.lng / 1e7) : parseFloat(row.lng),
        }))
      : [];

  // * Esta funcion se llama dentro de la data de la tabla cuando vamos a colorcar el typo de alerta o evento, y en caso de que sea evento vamos a mostrar el nombre
  // * con un hipervinculo
  function Link(
    name,
    type,
    truckName,
    truckSerial,
    cameraSerial,
    date,
    speed,
    lat,
    lng,
    eventId
  ) {
    //dispatch(actionCreatorsDevices.GetMediaData(100294902)); // ? Funcion para traer los links del video en funcion de un event id
    return (
      <>
        {type === 0 ? (
          <div>
            <a>{name}</a>
          </div>
        ) : name !== "NA" ? (
          <div>
            <a
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                toggleModalVideo(); // ? Abrimos el modal que mostrara los videos
                _handleDispatchVideo(eventId);
                setVideoMediaData({
                  // ? Seteamos los datos que contendra la variable videoMediaData
                  eventName: name,
                  truckName: truckName,
                  truckSerial: truckSerial,
                  cameraSerial: cameraSerial,
                  date: date,
                  speed: speed,
                  lat: lat,
                  lng: lng,
                  type: name,
                  eventId: eventId,
                });
              }}
            >
              {name}
            </a>
          </div>
        ) : (
          <div>
            <a>{name}</a>
          </div>
        )}
      </>
    );
  }

  // console.log(urlVideos);
  // console.log("Datos de MTCamera", cameraData);
  // console.log("Datos de Maintenance", maintenanceVehicles);
  // console.log("Datos de Fleet", vehicles)
  // console.log("Media list", mediaList.mediaList[0].eventId);
  // console.log(truck);
  // console.log(alertData);
  // useEffect(() => {
  //   console.log("datos dentro de la tabla", { data });
  // }, [data])

  // useEffect(() => {
  //   console.log("is loading video", isLoadingVideo);
  //   console.log("links de los videos", { urlVideos });
  // }, [isLoadingVideo])

  const VideoItem = ({ src, title, additionalClass = "" }) => (
    <div className={`grid-item ${additionalClass}`}>
      <iframe
        width="100%"
        height="100%"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );

  const NoMediaData = ({ message, additionalClass = "" }) => (
    <div className={`grid-item ${additionalClass} no-media-data`}>
      <img src={noData} alt="No Video Data" />
      <div>{message}</div>
    </div>
  );

  // * Intefaz del usuario
  return (
    <React.Fragment>
      <div className="animated fadeIn">
        <Row>
          <Col xs="3">
            <label>Select Truck</label>
            <Select
              options={options}
              name="select-truck"
              onChange={handleVechicle}
              //defaultValue=""
              disabled={false}
              required={true}
            />
          </Col>
          <Col xs="3">
            <label>Select Week</label>
            <Select
              options={optionsWeek}
              name="select-week"
              onChange={handleWeek}
              disabled={selectTruck}
              required={true}
            />
          </Col>
          <Col xs="3" className="ai_camera_div-2">
            <div className="ai_camera_div-3 ">
              <input
                disabled={selectWeek}
                type="radio"
                id="event"
                name="event"
                aria-label="Events"
                onChange={handledOnChange}
              />
              <label for="event" className="ai_camera_div-4 disabled">
                EVENT
              </label>
              <input
                disabled={selectWeek}
                type="radio"
                id="alert"
                name="event"
                aria-label="Alerts"
                onChange={handledOnChange}
              />
              <label for="alert">ALERT</label>
            </div>
          </Col>
        </Row>
        <div>
          <input
            hidden={mapButton}
            disabled={mapButton}
            onClick={() => {
              refSelected.current.length !== 0
                ? toggleModal()
                : toggleModalNoData();
            }}
            className="btn btn-primary ai_camera_map_button"
            id="eventButton"
            type="button"
            aria-label="Event button"
            value="Map"
          />
        </div>
        <br></br>
        {isLoading ? (
          <div className="loading">
            <Loading />
          </div>
        ) : (
          <div className="justify-content-center align-content-center">
            <DataTable
              columns={
                alerts == "alert"
                  ? columns
                  : alerts == "event"
                  ? columnsEvent
                  : columns
              }
              data={data}
              responsive={true}
              pagination
              noHeader
              selectableRows
              onSelectedRowsChange={handleChange}
              clearSelectedRows={toggledClearRows}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>
      <Modal isOpen={isOpenNoData} className={"modal-dialog modal-xs"}>
        <ModalHeader name="modal1" toggle={toggleModalNoData}>
          No selections
        </ModalHeader>
        <ModalBody>
          <div class="alert alert-danger" role="alert">
            Please <a class="alert-link">select a truck</a> to view the
            location.
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={isOpen} className={"modal-dialog modal-xl"}>
        <ModalHeader name="modal1" toggle={toggleModal}>
          Map
        </ModalHeader>
        <ModalBody>
          <div className="map-container">
            <div className="grid-item">
              <GoogleMaps truckData={refSelected.current} />
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={isOpenVideo} className={"modal-dialog modal-xl"}>
        <ModalHeader name="modal1" toggle={toggleModalVideo}>
          {videoMediaData.eventName}
        </ModalHeader>
        <ModalBody>
          {isLoadingVideo || !urlVideos ? (
            <Loading />
          ) : (
            <div className="grid-container">
              {/* Primer ítem de video o imagen de NoMediaData */}
              {urlVideos.length > 0 ? (
                <VideoItem
                  src={urlVideos[0]}
                  title="Front Video"
                  additionalClass="item1"
                />
              ) : (
                <NoMediaData
                  message="There is no video available for this event"
                  additionalClass="item1"
                />
              )}

              {/* Segundo ítem de video o imagen de NoMediaData */}
              {urlVideos.length > 1 ? (
                <VideoItem src={urlVideos[1]} title="Driver Video" />
              ) : (
                <NoMediaData message="There is no video available for this event" />
              )}

              <div className="grid-item item3">
                <GoogleMaps truckData={[videoMediaData]} />
              </div>

              <div className="grid-item item4">
                <strong>GENERAL INFORMATION</strong> <br />
                <br />
                Date: {videoMediaData.date} <br />
                Truck Name: {videoMediaData.truckName} <br />
                Camera Serial: {videoMediaData.cameraSerial} <br />
                Device Serial: {videoMediaData.truckSerial} <br />
                Speed: {videoMediaData.speed} <br />
                <br />
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default AIMedia;
