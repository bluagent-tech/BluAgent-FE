import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Card, CardBody } from "reactstrap";
import Loading from "../../components/Loading";
import "../Widgets/widgets_style/style.css"
// * Importamos el actionsCreators de Maintenance para usarlo dentro del UseEffect
import { actionCreators as actionCreatorsMaintenance } from "../../store/Maintenance";


const ActiveVehicles = () => {
    // * Declaracion del dispatch
    const dispatch = useDispatch();

    // * Declaracion de los use States
    const [activeVehicles, setActiveVehicles] = useState(0); // ? UseState para el valor de los vehiculos activos

    // * Data del local storage para treaer el Id del usuario y el ID de la compania
    const idCompany = JSON.parse(localStorage.getItem("idCompany"));
    const idUser = JSON.parse(localStorage.getItem("user")).Id;

    // * UseSelector para los estados del store Maintenance
    const active = useSelector((state) => state.maintenance.trucks); // ? estado de trucks
    const isLoading = useSelector((state) => state.maintenance.isLoadingTrucks); // ? Estado de la carga de datos

    // * UseEffect para llamar a una funion del store de Maintenance
    useEffect(() => {
        dispatch(actionCreatorsMaintenance.getTrucks(idUser, 1, 1000, true));
    }, []);

    // * Calculamos la cantidad de vehiculos activos y se lo asignamos a la variable ActiveVehicles
    useEffect(() => {
        var total = 0;
        active.forEach(() => {
            total++;
        });
        setActiveVehicles(total);
    }, [active]);

    //console.log(activeVehicles);
    return (
        <div>
            <div className="fade-in-down">
                <div className="card">
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
                                {isLoading ? (<div className="loading">
                                    <Loading />
                                </div>) : activeVehicles}
                            </div>
                            <div className="container">
                                <Row>
                                    <Col>
                                        <div
                                            style={{ position: "relative", height: "29px" }}
                                            className="text-muted text-uppercase font-weight-bold"
                                        >
                                            ACTIVE VEHICLES
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ActiveVehicles;
