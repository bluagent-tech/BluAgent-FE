import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as actionDevices } from "../../store/DevicesStore";
import ToastAlert from "../../components/ToastAlert";

import Autosuggest from "react-autosuggest";
import "../../assets/css/SearchBar.css";

const TabAdd = (props) => {
  const [idCompany, setIdCompany] = useState("");
  const [dropdownCompanies, setDropdownCompanies] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const toastState = useSelector((state) => state.devices.toastAlertState);
  const message = useSelector((state) => state.devices.message);
  const error = useSelector((state) => state.devices.error);
  
  const companies = useSelector((state) => state.devices.companies);
  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias
  const [value, setValue] = useState("");

  // Función para obtener las sugerencias
  const getSuggestions = (value) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;
    console.log('companies en el ADD: ', companies);
    return inputLength === 0
      ? []
      : companies.filter(
          (company) =>
            company.legalName.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Renderización de sugerencia individual
  const renderSuggestion = (suggestion) => <div>{suggestion.legalName}</div>;

  useEffect(() => {
    dispatch(actionDevices.GetAllCompany());
  }, []);

  useEffect(() => {
    validateForm();
  }, [deviceType, serialNumber, selectedModel, idCompany]);

  const handleDeviceTypeChange = (event) => {
    setDeviceType(event.target.value);
  };

  const handleSerialNumberChange = (event) => {
    setSerialNumber(event.target.value);
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const validateForm = () => {
    const isDeviceTypeValid = deviceType !== "";
    const isSerialNumberValid = serialNumber !== "";
    const isModelValid = selectedModel !== "";
    const isCompanyValid = idCompany !== "";

    setIsFormValid(
      isDeviceTypeValid && isSerialNumberValid && isModelValid && isCompanyValid
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid) {
      const formData = new FormData();
      formData.append("Type", deviceType);
      formData.append("SerialNumber", serialNumber);
      formData.append("Model", selectedModel);
      formData.append("IdCompany", parseInt(idCompany));
      formData.append("Status", "Ready to Assign");
      dispatch(actionDevices.AddCamera(formData));
    }

    setIdCompany("");
    setValue("");
    setDeviceType("");
    setSerialNumber("");
    setSelectedModel("");
  };

  const toggleToastAlert = () => {
    dispatch(actionDevices.toggleToastAlert);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group col-md-6">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="device">Select the device</label>
            <select
              id="device"
              className="form-control"
              value={deviceType}
              onChange={handleDeviceTypeChange}
              required
            >
              <option value="">Select...</option>
              <option value="Camera">Camera</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="serialNumber">Serial Number</label>
            <input
              type="text"
              className="form-control"
              id="serialNumber"
              value={serialNumber}
              onChange={handleSerialNumberChange}
              required={deviceType !== ""}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="model">Model</label>
            <select
              id="model"
              className="form-control"
              value={selectedModel}
              onChange={handleModelChange}
              required={serialNumber !== ""}
            >
              <option value="">Select...</option>
              <option value={"VS800"}>VS800</option>
              <option value={"VS900"}>VS900</option>
            </select>
          </div>
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
                onChange: (event, { newValue }) => setValue(newValue),
              }}
              onSuggestionSelected={(event, { suggestion }) => {
                setIdCompany(suggestion.id);
                setValue(suggestion.legalName); // Actualiza el valor del input
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
          title={!isFormValid ? "Please fill in all the required fields" : ""}
        >
          ADD
        </button>
      </div>
      <ToastAlert
        toggleToast={toggleToastAlert}
        isOpen={toastState}
        message={message}
        error={error}
      />
    </form>
  );
};

export default TabAdd;
