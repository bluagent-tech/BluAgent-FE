import React, { Fragment, useEffect, useState, useRef } from "react";
import "../../../assets/css/SafetyComplianceReport.css";
import PIN from "../../../assets/img/brand/pin-number.png";
import DOT from "../../../assets/img/brand/dot-main-logo.svg";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import XLSX from "xlsx";
import { Card } from "reactstrap";
import { companiesActions } from "./../../../store/companyStore";
import { bindActionCreators } from "redux";
import axios from "axios";
import states from "../../../states.json";
import country from "../../../country.json";
import ToastAlert from "../../../components/ToastAlert";
import Loading from "../../../components/Loading";
import Autosuggest from "react-autosuggest";
import "../../../assets/css/SearchBar.css";

var id = JSON.parse(localStorage.getItem("user")).Id;

const SafetyComplianceReport = (props) => {
  const [companies, setCompanies] = useState();
  const [stateFile, setStateFile] = useState();
  const [fileName, setFileName] = useState("Select DOT file");
  const [idCompany, setIdCompany] = useState();
  const [toastAlert, setToastAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [option, setOption] = useState();
  const [loading, setLoading] = useState(false);
  //const [dot, setDot] = useState();
  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias
  const [value, setValue] = useState("");
  const dot = useRef("");
  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllCompanies = () => {
    let url = "/api/CompanySuperAdmin/GetAllCompanies";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        setCompanies(response);
      })
      .catch((error) => console.log(error));
  };

  const OnboardingDOT = (vehicles, trailers, inspections, violations) => {
    console.log({
      vahicles: vehicles,
      trailers: trailers,
      inspections: inspections,
      violations: violations,
    });
    axios
      .post("/api/Maintenance/OnboardingDOT", {
        vehicles,
        trailers,
        inspections,
        violations,
      })
      .then((response) => {
        setError("");
        setMessage("On Boarding");
        handleOptions();
      })
      .catch((err) => {
        setMessage("");
        setError("On Boarding");
        handleOptions();
      });
  };

  const OnboardingPIN = (
    vehicles,
    trailers,
    users,
    drivers,
    idCompany,
    inspections,
    violations
  ) => {
    axios
      .post("/api/Maintenance/OnboardingPIN", {
        vehicles,
        trailers,
        users,
        drivers,
        idCompany,
        inspections,
        violations,
      })
      .then((response) => {
        setError("");
        setMessage("On Boarding");
        handleOptions();
      })
      .catch((err) => {
        setMessage("");
        setError("On Boarding");
        handleOptions();
      });
  };

  const handleOptions = () => {
    setToastAlert(true);
    setOption(undefined);
    setStateFile(undefined);
    setFileName("Select DOT file");
    setLoading(false);
    setToastAlert(false);
  };

  const handleChange = (file) => {
    if (file) {
      setFileName(file.name);
      setStateFile(file);
    }
  };

  const filterObject = (item, name) => {
    let emptyObject = [];
    let filterObeject = {};

    if (name === "VIN_1") {
      for (let i in item) {
        if (
          item[i].VIN_1 !== undefined &&
          item[i]["License Number_1"] !== undefined
        ) {
          filterObeject[item[i][name]] = item[i];
        }
      }
      for (let i in filterObeject) {
        emptyObject.push(filterObeject[i]);
      }
      return emptyObject;
    }
    if (name === "VIN") {
      for (let i in item) {
        if (item[i].VIN !== undefined) {
          filterObeject[item[i][name]] = item[i];
        }
      }

      for (let i in filterObeject) {
        emptyObject.push(filterObeject[i]);
      }

      return emptyObject;
    }
    if (name === "License Number") {
      for (let i in item) {
        filterObeject[item[i][name]] = item[i];
      }

      for (let i in filterObeject) {
        emptyObject.push(filterObeject[i]);
      }

      return emptyObject;
    }

    if (name === "Number") {
      for (let i in item) {
        filterObeject[item[i][name]] = item[i];
      }

      for (let i in filterObeject) {
        emptyObject.push(filterObeject[i]);
      }

      return emptyObject;
    }
  };

  const filterVehiclePinObject = (item, name) => {
    let emptyObject = [];
    let filterObeject = {};
    if (name === "VIN_1") {
      for (let i in item) {
        if (item[i].VIN_1 !== undefined) {
          filterObeject[item[i][name]] = item[i];
        }
      }
      for (let i in filterObeject) {
        emptyObject.push(filterObeject[i]);
      }
      return emptyObject;
    }
  };

  const inspectionsGroup = (sheet, option, onBoardingType) => {
    let dataViolationsGroup = [];
    let dataInspectionsGroup = [];
    let inspectionGroup = [];
    let violationGroup = [];

    let listOfInspections = filterObject(sheet, option);

    let cleanInspections = listOfInspections.filter(
      (clean) => clean.BASIC !== undefined
    );

    dataViolationsGroup.push(
      cleanInspections.map((list) => {
        return sheet.filter((number) => number["Number"] === list.Number);
      })
    );

    dataInspectionsGroup.push(
      listOfInspections.map((list) => {
        return sheet.filter((number) => number["Number"] === list.Number);
      })
    );

    dataViolationsGroup[0].map((list) => {
      list.map((secondList) => {
        violationGroup.push({
          UniqueId: secondList.Number.replace(secondList.State, ""),
          InspDate: secondList.Date,
          ViolCode: secondList.Code.replace(/[.()]/g, ""),
          BasicDesc: secondList.BASIC,
          OosIndicator: secondList["Out of Service"] === "Yes" ? "N" : "S",
          OosWeight: secondList["Time Weight"],
          SeverityWeight: secondList["Violation Severity Weight"],
          TotalseverityWght:
            secondList["Time Weight"] + secondList["Violation Severity Weight"],
          SectionDesc: secondList.Description,
          GroupDesc: secondList["Violation Group Description"],
          ViolUnit: secondList.Unit,
        });
      });
    });

    dataInspectionsGroup[0].map((list) => {
      list.map((secondList, index) => {
        if (index === 0) {
          let driversTotal = sheet.filter(
            (x) =>
              (x.Number === secondList.Number &&
                x.BASIC === "HOS Compliance" &&
                x["Out of Service"] === "Yes") ||
              (x.Number === secondList.Number &&
                x.BASIC === "Driver Fitness" &&
                x["Out of Service"] === "Yes")
          ).length;
          let vehicleTotal = sheet.filter(
            (x) =>
              (x.Number === secondList.Number &&
                x.BASIC === "Vehicle Maint." &&
                x["Out of Service"] === "Yes") ||
              (x.Number === secondList.Number &&
                x.BASIC === "Unsafe Driving" &&
                x["Out of Service"] === "Yes")
          ).length;
          let hazmatTotal = sheet.filter(
            (x) =>
              x.Number === secondList.Number &&
              x.BASIC === "HM Compliance" &&
              x["Out of Service"] === "Yes"
          ).length;

          inspectionGroup.push({
            ReportNumber: secondList.Number.replace(secondList.State, ""),
            ReportState: secondList.State,
            DotNumber: dot.current,
            InspDate: secondList.Date,
            InspLevelId: secondList.Level,
            CountryCodeState: secondList.State,
            TimeWeight: secondList["Time Weight"],
            DriverOosTotal: driversTotal,
            VehicleOosTotal: vehicleTotal,
            TotalHazmatSent: hazmatTotal,
            OosTotal: driversTotal + vehicleTotal + hazmatTotal,
            HazmatPlacardReq: secondList[
              "Placardable HM Vehicle Inspection"
            ].charAt(0),
            UnitTypeDesc: secondList.Type,
            UnitMake: secondList.Make,
            Vin: secondList.VIN,
            UnitDecalNumber: null,
            UnitTypeDesc2:
              secondList.Type_1 === undefined ? null : secondList.Type_1,
            UnitMake2:
              secondList.Make_1 === undefined ? null : secondList.Make_1,
            Vin2: secondList.VIN_1 === undefined ? null : secondList.VIN_1,
            UnitDecalNumber2: null,
            UnitLicense:
              onBoardingType === "PIN"
                ? secondList["License Number_2"]
                : secondList["License Number_1"],
            UnitLicenseStae:
              onBoardingType === "PIN"
                ? secondList["License State_2"]
                : secondList["License State_1"],
            UnitLicense2:
              onBoardingType === "PIN"
                ? secondList["License Number_3"] === undefined
                  ? null
                  : secondList["License Number_3"]
                : secondList["License Number_2"] === undefined
                ? null
                : secondList["License Number_2"],
            UnitLicenseState2:
              onBoardingType === "PIN"
                ? secondList["License State_3"] === undefined
                  ? null
                  : secondList["License State_3"]
                : secondList["License State_2"] === undefined
                ? null
                : secondList["License State_2"],
          });
        }
      });
    });
    return { violationGroup, inspectionGroup };
  };

  const extractDotNumber = (name) => {
    const fileName = name;
    const startIndex = 6; // Índice donde comienzan los números
    let endIndex = startIndex; // Índice donde terminan los números

    // Avanzar endIndex hasta que alcance un carácter no numérico
    while (endIndex < fileName.length && !isNaN(parseInt(fileName[endIndex]))) {
      endIndex++;
    }

    return fileName.substring(startIndex, endIndex);
  };

  const handleDOTFile = async (file) => {
    setLoading(true);
    setFileName(file.name);
    dot.current = extractDotNumber(file.name);
    if (file) {
      var vehicleObject = [];
      var trailerObject = [];
      var filterInspections = [];

      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        let data = event.target.result;

        let workbook = XLSX.read(data, { type: "binary", cellDates: true });

        workbook.SheetNames.forEach((sheet, index) => {
          let range = XLSX.utils.decode_range(workbook.Sheets[sheet]["!ref"]);

          if (index === 2) {
            range.s.r = 1;
            let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              range: range,
            });

            filterInspections = inspectionsGroup(rowVehicles, "Number", "DOT");

            let listVehicles = filterObject(rowVehicles, "VIN");

            vehicleObject.push(
              listVehicles.map((list) => {
                return {
                  VehicleNumber: "000000",
                  PlateExpiration: "2021-01-01 00:00:00.000",
                  Vin: list["VIN"],
                  Make: list.Make,
                  Model: null,
                  Year: null,
                  FuelType: null,
                  VehicleType: list.Type,
                  Condition: null,
                  Status: "ACTIVE",
                  Plate: list["License Number"],
                  PlateState: parseInt(
                    states
                      .filter((x) => x.Name === list["License State"])
                      .map((state) => state.Id)
                      .toString()
                  ),
                  IdCompany: parseInt(idCompany),
                };
              })
            );

            let listTrailers = filterObject(rowVehicles, "VIN_1");

            trailerObject.push(
              listTrailers.map((list) => {
                return {
                  TrailerNumber: "000000",
                  PlateExpiration: "2021-01-01 00:00:00.000",
                  Vin: list["VIN_1"],
                  Make: list.Make_1,
                  TrailerType: list.Type_1,
                  Status: "ACTIVE",
                  Plate: list["License Number_1"],
                  PlateState: parseInt(
                    states
                      .filter((x) => x.Name === list["License State_1"])
                      .map((state) => state.Id)
                      .toString()
                  ),
                  IdCompany: parseInt(idCompany),
                  TireSize: null,
                };
              })
            );
          }
        });

        OnboardingDOT(
          vehicleObject[0],
          trailerObject[0],
          filterInspections.inspectionGroup,
          filterInspections.violationGroup
        );
      };
    }
  };

  const handlePINFile = (file) => {
    setLoading(true);
    setFileName(file.name);

    if (file) {
      var vehicleObject = [];
      var trailerObject = [];
      var driverObject = [];
      var driverDataObject = [];
      var filterInspections = [];

      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        let data = event.target.result;

        let workbook = XLSX.read(data, { type: "binary", cellDates: true });

        workbook.SheetNames.forEach((sheet, index) => {
          let range = XLSX.utils.decode_range(workbook.Sheets[sheet]["!ref"]);

          if (index === 2) {
            range.s.r = 1;
            let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              range: range,
            });

            filterInspections = inspectionsGroup(rowVehicles, "Number", "PIN");

            let listVehicles = filterObject(rowVehicles, "VIN");

            vehicleObject.push(
              listVehicles.map((list) => {
                return {
                  VehicleNumber: "000000",
                  PlateExpiration: "2021-01-01 00:00:00.000",
                  Vin: list["VIN"],
                  Make: list.Make,
                  Model: null,
                  Year: null,
                  FuelType: null,
                  VehicleType: list.Type,
                  Condition: null,
                  Status: "ACTIVE",
                  Plate: list["License Number_2"],
                  PlateState: parseInt(
                    states
                      .filter((x) => x.Name === list["License State_2"])
                      .map((state) => state.Id)
                      .toString()
                  ),
                  IdCompany: parseInt(idCompany),
                };
              })
            );

            let listTrailers = filterVehiclePinObject(rowVehicles, "VIN_1");
            trailerObject.push(
              listTrailers.map((list) => {
                return {
                  TrailerNumber: "000000",
                  PlateExpiration: "2021-01-01 00:00:00.000",
                  Vin: list["VIN_1"],
                  Make: list.Make_1,
                  TrailerType: list.Type_1,
                  Status: "ACTIVE",
                  Plate: list["License Number_3"],
                  PlateState: parseInt(
                    states
                      .filter((x) => x.Name === list["License State_3"])
                      .map((state) => state.Id)
                      .toString()
                  ),
                  IdCompany: parseInt(idCompany),
                };
              })
            );
            let listDrivers = filterObject(rowVehicles, "License Number");
            listDrivers = listDrivers.filter(
              (list) => list.hasOwnProperty("Date of Birth") === true
            );

            driverObject.push(
              listDrivers.map((list) => {
                return {
                  Name: list["First Name"],
                  LastName: list["Last Name"],
                  Email: (
                    list["First Name"] +
                    list["Last Name"] +
                    "@" +
                    list["License Number"] +
                    ".com"
                  ).replace(/[/]:" "/g, ""),
                  Role: "DRIVER",
                  Status: "ACTIVE",
                  Birthdate: list["Date of Birth"].replace(/[/]/g, "-"),
                  Deactivated: false,
                };
              })
            );

            driverDataObject.push(
              listDrivers.map((list, index) => {
                return {
                  License: list["License Number"],
                  Status: "ACTIVE",
                  StatusWork: true,
                  HiringDate: "2021-01-01",
                  EmployeeId: (index + 1).toString(),
                  QuestionDa: false,
                  CountryLicense: 1,
                };
              })
            );
          }
        });
        OnboardingPIN(
          vehicleObject[0],
          trailerObject[0],
          driverObject[0],
          driverDataObject[0],
          parseInt(idCompany),
          filterInspections.inspectionGroup,
          filterInspections.violationGroup
        );
      };
    }
  };

  // Función para obtener las sugerencias
  const getSuggestions = (value) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : companies.filter(
          (company) =>
            company.legalName.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Renderización de sugerencia individual
  const renderSuggestion = (suggestion) => <div>{suggestion.legalName}</div>;

  console.log(idCompany);
  return (
    <Fragment>
      <ToastAlert
        toggleToast={props.toggleToastAlert}
        isOpen={toastAlert}
        message={message}
        error={error}
      />
      <Card>
        <div>
          {option === undefined ? (
            <div className="container transition-effect">
              <div className="container">
                <div className="d-flex justify-content-center flex-wrap justify-content-around mt-4">
                  <div
                    className="card card-width effect-card"
                    onClick={() => setOption("DOT")}
                  >
                    <div className="option-box">
                      <img src={DOT} className="img-size effect-img" />
                      <h4>DOT #</h4>
                    </div>
                  </div>
                  <div
                    className="card card-width effect-card"
                    onClick={() => setOption("PIN")}
                  >
                    <div className="option-box">
                      <img src={PIN} className="img-size" />
                      <h4>PIN #</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {option !== undefined ? (
            <div className="container mb-4 transition-effect">
              {option === "DOT" ? (
                <h3 className="text-info">DOT</h3>
              ) : (
                <h3 className="text-info">PIN</h3>
              )}
              <form className="mb-4">
                <div className="mb-4">
                  <label htmlFor="company-list">Select a company:</label>
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
                {option === "DOT" ? (
                  <div className="transition-effect">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept=".xlsx"
                        onChange={(event) =>
                          handleChange(event.target.files[0])
                        }
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {fileName}
                      </label>
                    </div>
                    {stateFile !== undefined ? (
                      <div className="mr-2">
                        {loading !== true ? (
                          <div className="d-flex mt-4">
                            <div className="mr-2">
                              <Button
                                outline
                                color="success"
                                onClick={() => handleDOTFile(stateFile)}
                              >
                                ONBOARDING
                              </Button>
                            </div>
                            <div>
                              <Button
                                outline
                                color="danger"
                                onClick={() => {
                                  setOption(undefined);
                                  setStateFile(undefined);
                                  setIdCompany(undefined);
                                  setValue("");
                                  setFileName("Select DOT file");
                                }}
                              >
                                CANCEL
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4">
                            <Loading />
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="transition-effect">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile"
                        accept=".xlsx"
                        onChange={(event) =>
                          handleChange(event.target.files[0])
                        }
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        {fileName}
                      </label>
                    </div>
                    {stateFile !== undefined ? (
                      <div className="mr-2">
                        {loading !== true ? (
                          <div className="d-flex mt-4">
                            <div className="mr-2">
                              <Button
                                outline
                                color="success"
                                onClick={() => handlePINFile(stateFile)}
                              >
                                ONBOARDING
                              </Button>
                            </div>
                            <div>
                              <Button
                                outline
                                color="danger"
                                onClick={() => {
                                  setOption(undefined);
                                  setStateFile(undefined);
                                  setIdCompany(undefined);
                                  setValue("");
                                  setFileName("Select DOT file");
                                }}
                              >
                                CANCEL
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4">
                            <Loading />
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}
              </form>
            </div>
          ) : null}
        </div>
      </Card>
    </Fragment>
  );
};

export default connect(
  (state) => state.companies,
  (dispatch) => bindActionCreators(companiesActions, dispatch)
)(SafetyComplianceReport);
