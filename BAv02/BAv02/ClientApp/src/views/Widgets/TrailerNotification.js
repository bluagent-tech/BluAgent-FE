import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Card, CardBody } from 'reactstrap';
import Loading from "../../components/Loading";
import "../Widgets/widgets_style/style.css"

// * Importamos el actionsCreators de DriverFiles para usarlo dentro del UseEffect
import { actionCreators as actionCreatorsDriverNotifications } from "../../store/DriverNotifications";
import MaintenanceNotifications from "./MaintenanceNotifications";



const TrailerNotifications = () => {
    // * Declaracion del dispatch
    const dispatch = useDispatch();

    // * Declaracion de los use States
    // const [activeVehicles, setActiveVehicles] = useState(0); 
    const [alertsDataTrailers, setAlertDataTrailers] = useState({})
    const [alertsDataVehicles, setAlertDataVehicles] = useState({})
    const [typeAlerts, setTypeAlerts] = useState({})
    const [totalNotifications, setTotalNotifications] = useState();

    // * Data del local storage para treaer el Id del usuario y el ID de la compania
    const idCompany = JSON.parse(localStorage.getItem("idCompany"));
    const idUser = JSON.parse(localStorage.getItem("user")).Id;

    // * Estados de los stores que vamos a usar
    const isLoading = useSelector((state) => state.notifications.isLoadingAlertsReal);
    const vehiclesAlert = useSelector((state) => state.notifications.alertsVehicles)
    const trailersAlert = useSelector((state) => state.notifications.alertsTrailers)


    // * UseEffect para llamar a una funion del store de Maintenance
    useEffect(() => {
        dispatch(actionCreatorsDriverNotifications.getNotificationsMaintenance(idCompany, {}))
    }, [])

    // * useEffect para setear los datos de las alertas de Trailers
    useEffect(() => {
        let bmaintenance = trailersAlert
        let dmaintenance = [];
        bmaintenance.sort((a, b) => {
            return a.Id - b.Id;
        });
        for (let y = 0; y < bmaintenance.length; y++) {
            let dueDate = trailersAlert[y].Message.substr(-10);
            bmaintenance[y].DueDate = dueDate;
            if (trailersAlert[y].Message.substr(0, 3) === "Reg") {
                bmaintenance[y].Message = "Registration";
            }
            if (trailersAlert[y].Message.substr(0, 3) === "Ann") {
                bmaintenance[y].Message = "Annual Inspection";
            }
            if (trailersAlert[y].Message.substr(0, 3) === "90-") {
                bmaintenance[y].Message = "90-Days Inspection";
            }
            if (trailersAlert[y].Message.substr(0, 3) === "45-") {
                bmaintenance[y].Message = "45-Days Inspection";
            }
            if (trailersAlert[y].Message.substr(0, 3) === "Ins") {
                bmaintenance[y].Message = "Insurance Policy";
            }
            if (y > 0) {
                if (trailersAlert[y].Id === trailersAlert[y - 1].Id) {
                    let alerta = dmaintenance.pop();
                    if (Array.isArray(alerta.Message)) {
                        alerta.Message = [...alerta.Message, bmaintenance[y].Message];
                        alerta.Severy = [...alerta.Severy, bmaintenance[y].Severy];
                        alerta.DueDate = [...alerta.DueDate, bmaintenance[y].DueDate];
                    } else {
                        alerta.Message = [alerta.Message, bmaintenance[y].Message];
                        alerta.Severy = [alerta.Severy, bmaintenance[y].Severy];
                        alerta.DueDate = [alerta.DueDate, bmaintenance[y].DueDate];
                    }
                    dmaintenance.push(alerta);
                } else {
                    dmaintenance.push(bmaintenance[y]);
                }
            } else {
                dmaintenance.push(bmaintenance[y]);
            }
            setAlertDataTrailers(dmaintenance);
        }

    }, [isLoading]);

    // * Calculamos la cantidad de alertas que tenemos para los vehiculos
    useEffect(() => {
        var total = 0;
        trailersAlert.forEach((item) => {
            total++;
        });
        setTotalNotifications(total);
    }, [isLoading]);

    return (

        <div className="fade-in-down">
            <div className="card" >
                <div className="card-body">
                    <Fragment>
                        <div className="text-right">
                            <img
                                height="30"
                                src="assets/icons/icons8-notification.svg"
                                alt="notification-icon"
                            />
                        </div>
                        <div className="text-center text-header-widget panels-text">
                            {isLoading ? (<div className="loading">
                                <Loading />
                            </div>) : totalNotifications}
                        </div>
                        <div className="container">
                            <Row className="d-flex justify-content-between">
                                <div
                                    className="text-muted text-uppercase font-weight-bold">
                                    NOTIFICATIONS
                                </div>
                                <div>
                                    <MaintenanceNotifications
                                        disable={isLoading}
                                        data={alertsDataTrailers}
                                        empty={totalNotifications == 0 ? true : false} />
                                </div>
                            </Row>
                        </div>
                    </Fragment>
                </div>
            </div>
        </div>

    );
};

export default TrailerNotifications;
