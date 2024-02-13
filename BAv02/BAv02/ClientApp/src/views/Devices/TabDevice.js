import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Card,
  CardBody,
  Col,
  Fade,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import DropdownMenu from "../../components/DropdownMenu";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as actionDevices } from "../../store/DevicesStore";
import DropDownCamera from "../../components/DropDownCamera";
import AcceptRequest from "../../components/AcceptRequest";
import Autosuggest from "react-autosuggest";
import "../../assets/css/SearchBar.css";

const TabDevice = (props) => {
  const dispatch = useDispatch();
  const [idCompany, setIdCompany] = useState();
  const [device, setDevice] = useState("");
  const [aceptRequest, setAceptRequest] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [companySelected, setCompanySelected] = useState();

  const cameraList = useSelector((state) => state.devices.camera);
  const companies = useSelector((state) => state.devices.companies);
  const company = useSelector((state) => state.devices.company);
  const validation = useSelector((state) => state.devices.isCompanyLoading);

  const toogleAceptRequest = (serialNumber, status) => {
    dispatch(actionDevices.assignData(serialNumber, status));
    setAceptRequest(!aceptRequest);
  };

  const columns = [
    { name: "TYPE", selector: "type", sortable: true, center: true },
    { name: "MODEL", selector: "model", center: true },
    { name: "SERIAL NUMBER", selector: "serialNumber", center: true },
    { name: "STATUS", selector: "status", sortable: true, center: true },
    { name: "POWER UNIT", selector: "powerUnit", center: true },
    { name: "OPTIONS", selector: "options", grow: 0, center: true },
  ];

  useEffect(() => {
    if (idCompany && device) {
      dispatch(actionDevices.GetCameraByIdCompanyAndType(idCompany, device));
    }
  }, [idCompany, device]);

  const MapDevicesForDataTable = (items) => {
    let data = items.map((row) => {
      var object = {};
      object.serialNumber = row.serialNumber;
      object.status = row.status;
      object.type = row.type;
      object.model = row.model;
      object.powerUnit = row.vehicleNumber !== null ? row.vehicleNumber : "N/A";
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
    if (status === "Pending to unassign" || status === "Pending to assign") {
      return (
        <div className="text-center">
          <DropDownCamera
            direction="right"
            itemID={serialNumber}
            cameraStatus={status}
            menuOptions={[
              [
                "Accept Request",
                () => {
                  toogleAceptRequest(serialNumber, status);
                },
              ],
            ]}
          />
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <DropDownCamera
            direction="right"
            itemID={serialNumber}
            cameraStatus={status}
            menuOptions={[[""]]}
          />
        </div>
      );
    }
  };

  const handleCameraChange = (event) => {
    setDevice(event.target.value);
  };

  const handleSubmite = (event) => {
    event.preventDefault();
    const Type = deviceType;
    const IdCompany = idCompany;
    // Falta enviar la peticion al back para jalar la lista de lo solicitado
    dispatch(actionDevices.GetCameraByIdCompanyAndType(IdCompany, Type));
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.legalName}</div>;

  const getSuggestions = (value) => {
    console.log("suggestion: ", value);
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : companies.filter(
          (company) =>
            company.legalName.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const CompanyCard = () => {
    const companyCardStyle = {
      border: "1px solid #ccc",
      padding: "10px",
      backgroundColor: "#f5f5f5",
      marginBottom: "10px",
      borderRadius: "5px",
    };
  
    const companyInfoStyle = {
      fontWeight: "bold",
    };
    return (
      <div className="d-flex justify-content-between w-100" style={companyCardStyle}>
        <div className="">
          <div style={companyInfoStyle}>
            <strong> Company Name: {companySelected.legalName}</strong>
          </div>
        </div>
        <div className="">
          <div style={companyInfoStyle}>
            <strong>DOT:{companySelected.dot}</strong>
          </div>
        </div>
      </div>
    );
  };

  const handleSearchBarChange = (newValue) => {
    setValue(newValue);
  
    // Resetear la información de la compañía si la barra de búsqueda está vacía
    if (newValue.trim() === '') {
      setCompanySelected(null);
      setIdCompany(null);
    }
  };
  return (
    <Fragment>
      <div className="animated fadeIn">
        <form onSubmit={handleSubmite}>
          <div className="form-group col-md-6">
            <div className="form-row mb-4">
              {companySelected ? <CompanyCard /> : null}
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="company">Company</label>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={({ value }) =>
                    setSuggestions(getSuggestions(value))
                  }
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  getSuggestionValue={(suggestion) => suggestion.legalName}
                  renderSuggestion={renderSuggestion}
                  inputProps={{
                    placeholder: "Type a company name",
                    value: value,
                    onChange: (event, { newValue }) => handleSearchBarChange(newValue),
                  }}
                  onSuggestionSelected={(event, { suggestion }) => {
                    setIdCompany(suggestion.id);
                    setValue(suggestion.legalName); // Actualiza el valor del input
                    setCompanySelected(suggestion);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="device">Select Device Type</label>
                <select
                  id="device"
                  className="form-control"
                  onChange={handleCameraChange}
                >
                  <option selected>Select...</option>
                  <option value={"Camera"}>Camera</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <Row>
          <Col xs="12">
            <DataTable
              responsive={true}
              pagination
              columns={columns}
              data={MapDevicesForDataTable(cameraList)}
            />
          </Col>
        </Row>
      </div>
      <AcceptRequest
        modalType="Accept Request"
        modal={aceptRequest}
        toggle={() => {
          toogleAceptRequest();
        }}
        typeDevice={device}
        idCompany={idCompany}
      />
    </Fragment>
  );
};

export default TabDevice;
