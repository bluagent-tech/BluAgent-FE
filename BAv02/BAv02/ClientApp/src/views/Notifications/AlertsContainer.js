import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/lib/Alert";
import MessageContainer from "./MessageContainer";

const imgVehicleType = (VehicleType) => {
    let img = '';
  
    if (VehicleType) {
      switch (VehicleType.trim().toLowerCase()) {
        case 'truck':
          img = 'assets/icons/icons8-truck.svg';
          break;
        case 'car':
          img = 'assets/icons/icons8-car.svg';
          break;
        case 'tow truck':
          img = 'assets/icons/icons8-tow-truck.svg';
          break;
        case 'bus':
          img = 'assets/icons/icons8-bus.svg';
          break;
        case 'flatbed truck':
          img = 'assets/icons/icons8-in-flat-bed.svg';
          break;
        case 'pick-up':
          img = 'assets/icons/icons8-pickup.svg';
          break;
        case 'semi-trailer truck':
          img = 'assets/icons/icons8-semi-truck.svg';
          break;
        case 'van':
          img = 'assets/icons/icons8-vanpool.svg';
          break;
        default:
          img = 'assets/icons/icons8-truck.svg';
          break;
      }
    }
  
    return img;
  };
function AlertsContainer(props) {
    if (props.type === "driver") {
        return (
            <Col md="12" id="AlertMaintenance" key={props.alerts.Id}>
                <div data-tut="AlertMaintenance">
                    <Link
                        style={{ textDecoration: "none" }}
                        to={"/Drivers/" + props.alerts.IdDriver}
                        className="img-responsive"
                    >
                        <Alert
                            style={{
                                backgroundColor: "white",
                                borderStyle: "none none outset",
                                borderWidth: "2px"
                            }}
                            className={`alert alert-black col-md-12]`}
                            //alert-${props.alerts.Severy}
                            key={props.alerts.Id}
                        >
                            <div className="row">
                                <div className="col-md-1">
                                    <img
                                        alt="profile"
                                        src={
                                            props.alerts.Image === null
                                                ? "assets/img/Images/profile/profile.png"
                                                : `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.alerts.IdCompany}/Drivers/${props.alerts.IdDriver}/driverAvatar.png`
                                        }
                                        width={"100%"}
                                        height={"100%"}
                                        className="img-responsive img-avatar"
                                        style={{
                                            maxWidth: "72px",
                                            maxHeight: "72px",
                                            borderRadius: "16px"
                                        }}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <b>{props.alerts.DriverName}</b>
                                    <br />
                                    {props.alerts.License}
                                    <br />
                                    Mobile: {" "}
                                    {props.alerts.Phone === null
                                        ? "No phone"
                                        : props.alerts.Phone}
                                    <br />
                                </div>{" "}
                                <div className="col-md-4">
                                    <MessageContainer
                                        messages={props.alerts.Message}
                                        severies={props.alerts.Severy}
                                        tab={1}
                                    />
                                </div>{" "}
                                <div className="col-md-4">
                                    <MessageContainer
                                        messages={props.alerts.DueDate}
                                        severies={props.alerts.Severy}
                                        tab={2}
                                    />
                                </div>
                            </div>
                        </Alert>
                    </Link>
                </div>
            </Col>
        );
    } 

    if (props.type === "vehicle" && props.alerts.TypeId === "VEHICLE") {
        let type = "/Trucks/" + props.alerts.IdVehicle;
        return (
            <Col md="12" id="AlertMaintenance" key={props.alerts.Id}>
                <div style={{ width: "100%" }} data-tut="AlertMaintenance">
                    <Link
                        style={{ textDecoration: "none" }}
                        to={type}
                        className="img-responsive"
                    >
                        <Alert
                            className={`alert alert-black col-md-12`}
                            style={{
                                borderStyle: "none none outset none",
                                borderWidth: "2px",
                                backgroundColor: "white",
                            }}
                            //   className={`col-md-12`}
                            key={props.alerts.Id}
                        >
                            <div className="row">
                                <div className="col-md-1">
                                    <img
                                        alt="profile"
                                        src={
                                            props.alerts.FileImage === null ? 
                                            imgVehicleType(props.alerts.VehicleType)
                                            : `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.alerts.IdCompany}/TrucksFile/${props.alerts.IdVehicle}/truckAvatar.png`
                                        }
                                        width={"100%"}
                                        height={"100%"}
                                        className="img-responsive img-avatar"
                                        style={{
                                            maxWidth: "72px",
                                            maxHeight: "72px",
                                            borderRadius: "4px"
                                        }}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <b>
                                        Vehicle Number: {props.alerts.VehicleNumber}
                                    </b>
                                    <br />
                                        Vin: {props.alerts.Vin}
                                    <br />
                                         {props.alerts.VehicleType}
                                </div>
                                <div className="col-md-4">
                                    <MessageContainer
                                        messages={props.alerts.Message}
                                        severies={"message"}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <MessageContainer
                                        messages={props.alerts.DueDate}
                                        severies={props.alerts.Severy}
                                    />
                                </div>
                            </div>
                        </Alert>
                    </Link>
                </div>
            </Col>
        );
    } 

    if (props.type === "trailer" && props.alerts.TypeId === "TRAILER") {
        let type = "/Trailers/" + props.alerts.IdTrailer;
        return (
            <Col md="12" id="AlertMaintenance" key={props.alerts.Id}>
                <div style={{ width: "100%" }} data-tut="AlertMaintenance">
                    <Link
                        style={{ textDecoration: "none" }}
                        to={type}
                        className="img-responsive"
                    >
                        <Alert
                            className={`alert alert-black col-md-12`}
                            style={{
                                borderStyle: "none none outset none",
                                borderWidth: "2px",
                                backgroundColor: "white",
                            }}
                            //   className={`col-md-12`}
                            key={props.alerts.Id}
                        >
                            <div className="row">
                                <div className="col-md-1">
                                    <img
                                        alt="profile"
                                        src={
                                            props.alerts.FileImage === null ? 'assets/maintenancePdf/Images/defaultTrailer.png' : 
                                            `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.alerts.IdCompany}/TrailersFile/${props.alerts.IdTrailer}/trailerAvatar.png`
                                        }
                                        width={"100%"}
                                        height={"100%"}
                                        className="img-responsive img-avatar"
                                        style={{
                                            maxWidth: "72px",
                                            maxHeight: "72px",
                                            borderRadius: "4px"
                                        }}
                                    />
                                </div>
                                    <div className="col-md-3">
                                    <b>
                                        Trailer Number: {props.alerts.TrailerNumber}
                                    </b>
                                    <br />
                                        Vin: {props.alerts.Vin}
                                    <br />
                                         {props.alerts.TrailerType}
                                </div>
                                <div className="col-md-4">
                                    <MessageContainer
                                        messages={props.alerts.Message}
                                        severies={"message"}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <MessageContainer
                                        messages={props.alerts.DueDate}
                                        severies={props.alerts.Severy}
                                    />
                                </div>
                            </div>
                        </Alert>
                    </Link>
                </div>
            </Col>
        );
    } 

    if (props.type === "maintenance") {
        let type = null;
        if(props.alerts.TypeId == 'VEHICLE') {
            type = "/Trucks/" + props.alerts.IdUnit;
        } else {
            type = "/Trailers/" + props.alerts.IdUnit;
        }
        return (
            <Col md="12" id="AlertMaintenance" key={props.alerts.Id}>
                <div style={{ width: "100%" }} data-tut="AlertMaintenance">
                    <Link
                        style={{ textDecoration: "none" }}
                        to={type}
                        className="img-responsive"
                    >
                        <Alert
                            className={`alert alert-black col-md-12`}
                            style={{
                                borderStyle: "none none outset none",
                                borderWidth: "2px",
                                backgroundColor: "white",
                            }}
                            //   className={`col-md-12`}
                            key={props.alerts.Id}
                        >
                            <div className="row">
                                <div className="col-md-1">
                                    <img
                                        alt="profile"
                                        src={
                                            // props.alerts.VFileImage === null
                                            //     ? imgVehicleType(props.alerts.TUnitType)
                                            //     : props.alerts.TypeId == 'VEHICLE' ?  
                                            //     `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.alerts.IdCompany}/TrucksFile/${props.alerts.IdVehicle}/truckAvatar.png`
                                            //     : `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.alerts.IdCompany}/TrailersFile/${props.alerts.IdVehicle}/trailerAvatar.png`
                                            props.alerts.TypeId == 'VEHICLE' ?  
                                                props.alerts.VFileImage === null ? 
                                                    imgVehicleType(props.alerts.VUnitType) : 
                                                `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.alerts.IdCompany}/TrucksFile/${props.alerts.IdUnit}/truckAvatar.png`
                                            : props.alerts.TFileImage === null ? 
                                                'assets/maintenancePdf/Images/defaultTrailer.png' : 
                                            `https://bluagent-files.s3-us-west-2.amazonaws.com/${props.alerts.IdCompany}/TrailersFile/${props.alerts.IdUnit}/trailerAvatar.png`
                                        }
                                        width={"100%"}
                                        height={"100%"}
                                        className="img-responsive img-avatar"
                                        style={{
                                            maxWidth: "72px",
                                            maxHeight: "72px",
                                            borderRadius: "4px"
                                        }}
                                    />
                                </div>
                                {props.alerts.TypeId == 'VEHICLE' ? (
                                    <div className="col-md-3">
                                        <b>
                                            Vehicle Number: {props.alerts.VehicleNumber}
                                        </b>
                                        <br />
                                        Vin: {props.alerts.VVin}
                                        <br />
                                        {props.alerts.VUnitType}
                                    </div>
                                ) : (
                                    <div className="col-md-3">
                                        <b>
                                            Trailer Number: {props.alerts.TrailerNumber}
                                        </b>
                                        <br />
                                        Vin: {props.alerts.TVin}
                                        <br />
                                        {props.alerts.TUnitType}
                                    </div>
                                )}
                                <div className="col-md-4">
                                    <MessageContainer
                                        messages={props.alerts.Message}
                                        severies={"message"}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <MessageContainer
                                        messages={props.alerts.DueDate}
                                        severies={props.alerts.Severy}
                                    />
                                </div>
                            </div>
                        </Alert>
                    </Link>
                </div>
            </Col>
        );
    } 

    if (props.type === "company") {
        let Color = null;
        if (props.alerts.Severy === "danger") Color = "#f8d7da";
        if (props.alerts.Severy === "warning") Color = "#fff3cd";
        if (props.alerts.Severy === "info") {
          Color = "#cfe2ff";
        }
        return (
            <Col md="12" id="AlertMaintenance" key={props.alerts.Id}>
                <div data-tut="AlertMaintenance">
                    <Link
                        style={{ textDecoration: "none" }}
                        to={"accountSettings"}
                        className="img-responsive"
                    >
                        <Alert
                            style={{
                                backgroundColor: "white",
                                borderStyle: "none none outset",
                                borderWidth: "2px"
                            }}
                            className={`alert alert-black col-md-12]`}
                            //alert-${props.alerts.Severy}
                            key={props.alerts.Id}
                        >
                            <div className="row" >
                                <div className="col-md-1">
                                    <img
                                        alt="profile"
                                        src={
                                            '/assets/icons/icons8-course.svg'
                                        }
                                        width={"100%"}
                                        height={"100%"}
                                        className="img-responsive img-avatar"
                                        style={{
                                            maxWidth: "72px",
                                            maxHeight: "72px",
                                            // borderRadius: "16px"
                                        }}
                                    />
                                </div>
                                <div className="col-md-11 text-center" style={{ alignSelf:"center", backgroundColor: Color, borderRadius: 4}}> 
                                    <b>{props.alerts.Message}</b>
                                </div>{" "}
                            </div>
                        </Alert>
                    </Link>
                </div>
            </Col>
        );
    } 
}

export default AlertsContainer;