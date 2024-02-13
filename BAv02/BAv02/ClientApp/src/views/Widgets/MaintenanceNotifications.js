import React from 'react';
import { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
} from 'reactstrap';

// * Importamos el actionsCreators de Maintenance para usarlo dentro del UseEffect
import { actionCreators as actionCreatorsMaintenance } from "../../store/Maintenance";

import ListAlertsMaintenance from '../../components/MaintenanceAlerts';


const MaintenanceNotifications = (props) => {
    const [open, setOpen] = useState(false); // ? Para abrir el modal de las notificaciones


    // * Declaracion del local estorage para traer el Id del usuario y el Id de la compania
    const idCompany = JSON.parse(localStorage.getItem("idCompany"));
    const idUser = JSON.parse(localStorage.getItem("user")).Id;

    const toggle = () => {
        setOpen(!open);
    }

    const toggle1 = () => {

    }

    return (
        <>
            <div>
                <Modal
                    isOpen={open}
                    className={"modal-lg"}
                    toggle={toggle}
                    backdrop={"static"}
                >
                    <ModalHeader name="modal1" toggle={toggle}>
                        {props.data.TypeId === "VEHICLE" ? "TRUCKS NOTIFICATIONS" : "TRAILER NOTIFICATIONS"}
                    </ModalHeader>
                    <ModalBody>
                        <ListAlertsMaintenance options={props.data} name="Alert" />
                    </ModalBody>
                </Modal>
                <Button
                    className="text-white text-uppercase"
                    type="submit"
                    onClick={toggle}
                    //color={"success"}
                    color={props.empty ? "success" : "warning"}
                    disabled={props.disable}
                    style={{ display: props.empty ? "none" : "" }}
                >
                    {" "}
                    {props.empty ? "All Caught Up!" : "Needs Work"}
                </Button>
            </div>
        </>
    )
}

export default MaintenanceNotifications;
