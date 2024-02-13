import React from "react";
import { Col } from "reactstrap";
import Alert from "react-bootstrap/lib/Alert";
import AlertsContainer from "./AlertsContainer";

function AlertsHeader(props) {
    return (
        props.type === "company" ? (
            <div>
                <Col md="12" id="AlertMaintenance">
                    <div style={{ width: "100%" }} data-tut="AlertMaintenance">
                        <Alert className={`alert alert-light col-md-12`}>
                            <div className="row">
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-11" style={{ textAlign: "center" }}>
                                    <b>Notification/Status</b>
                                </div>
                            </div>
                        </Alert>
                    </div>
                </Col>
                {props.alerts.map((alerts) => {
                    return (
                        <AlertsContainer alerts={alerts} key={alerts.Id} type={props.type} />
                    );
                })}
            </div>
        ) : (
            <div>
                <Col md="12" id="AlertMaintenance">
                    <div style={{ width: "100%" }} data-tut="AlertMaintenance">
                        <Alert className={`alert alert-light col-md-12`}>
                            <div className="row">
                                <div className="col-md-1">
                                </div>
                                <div className="col-md-3" style={{ border: "none" }}>
                                    <b>Details</b>
                                </div>
                                <div className="col-md-4" style={{ textAlign: "center" }}>
                                    <b>Notification/Status</b>
                                </div>
                                <div className="col-md-4" style={{ textAlign: "center" }}>
                                    <b>Due Date</b>
                                </div>
                            </div>
                        </Alert>
                    </div>
                </Col>
                {props.alerts.map((alerts) => {
                    return (
                        <AlertsContainer alerts={alerts} key={alerts.Id} type={props.type} />
                    );
                })}
            </div>
        )
    );
}

export default AlertsHeader;