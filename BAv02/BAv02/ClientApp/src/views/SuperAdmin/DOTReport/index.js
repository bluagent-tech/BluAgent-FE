import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import "../../../assets/css/SafetyComplianceReport.css";
import XLSX from "xlsx";
import Loading from "../../../components/Loading";
import "../../../assets/css/SafetyComplianceReport.css";
import DataTable from "react-data-table-component";
import InspectionHistory from "./InspectionHistory";
import VehicleMaintenanceReport from "./VehicleMaintenanceReport";
import InspectionMap from "./InspectionMap";
import ViolationSummary from "./ViolationSummary";
import MessageCrashNotification from "../../../components/MessageCrashNotification";
import axios from "axios";
import CompanyInformation from "./CompanyInformation";
import CompanyComponent from "./CompanyComponent";
import ReportSummary from "./ReportSummary";
import SafetyCompliance from "./SafetyCompliance.json";
import ToastAlert from "../../../components/ToastAlert";
import DownloadDotReport from "./DownloadDotReport";
import RoadInspection from "./RoadInspection";
import ViolationCodes from "../../../violationCodes.json";
import Autosuggest from "react-autosuggest";
const DOTReport = () => {
  const [stateFile, setStateFile] = useState();
  const [fileName, setFileName] = useState("Select DOT file");
  const [loading, setLoading] = useState(false);
  const [dot, setDot] = useState();
  const [drivers, setDrivers] = useState();
  const [crash, setCrash] = useState();
  const [inspections, setInspections] = useState();
  const [violations, setViolations] = useState();
  const [vehicle, setVehicle] = useState();
  const [summary, setSummary] = useState();
  const [maintenanceReport, setMaintenanceReport] = useState();
  const [map, setMap] = useState();
  const [company, setCompany] = useState();
  const [indicator, setIndicator] = useState();
  const [overralSummary, setOverralSummary] = useState();
  const [companyList, setCompyList] = useState();
  const [idCompany, setIdCompany] = useState();
  const [sizeDocs, setSizeDocs] = useState();
  const [toggle, setToggle] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [verticalBar, setVerticalBar] = useState();
  const [inspectionTable, setInspectionTable] = useState();
  const [inspectionStates, setInspectionStates] = useState();
  const [totalInspections, setTotalInspections] = useState();
  const [violationsByCodes, setViolationsByCode] = useState({});

  const [companies, setCompanies] = useState();
  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias
  const [value, setValue] = useState("");

  var safety = SafetyCompliance;
  var user = JSON.parse(localStorage.getItem("user"));

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

  useEffect(() => {
    if (user.Role === "ADMIN") {
      getDotDocument(JSON.parse(localStorage.getItem("idCompany")));
    }
    if (user.Role === "SUPERADMIN") {
      getAllCompanies();
    }
    if (user.Role === "INSURANCE") {
      getAllCompaniesInsurance(user.InsuranceProvider);
    }
  }, []);

  const getDotDocument = (id) => {
    let url = "api/AccountSet/getDotDocuments?idCompany=" + id;
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        let resp = JSON.parse(response);
        if (resp.status !== 1) {
          setSizeDocs(0);
          getUrlDocument(resp.docs[0]);
        } else {
          setSizeDocs(1);
        }
      })
      .catch((error) => {
        setSizeDocs(1);
        console.log(error);
      });
  };

  const getDotDocumentInsurance = (id) => {
    let url = "api/AccountSet/getDotDocuments?idCompany=" + id;
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        let resp = JSON.parse(response);
        if (resp.status !== 1) {
          setSizeDocs(0);
          getUrlDocumentInsurance(resp.docs[0], id);
        } else {
          setSizeDocs(1);
        }
      })
      .catch((error) => {
        setSizeDocs(1);
        console.log(error);
      });
  };

  const getUrlDocument = (form) => {
    let url = `https://bluagent-files.s3.us-west-2.amazonaws.com/${JSON.parse(
      localStorage.getItem("idCompany")
    )}/DotReport/${form.DocName} `;
    axios
      .get(url, { responseType: "blob" })
      .then((res) => res)
      .then((myBlob) => {
        handleReportByCompany(myBlob.data, form.DescriptionDoc);
      })
      .catch((error) => console.log(error));
  };

  const getUrlDocumentInsurance = (form, id) => {
    let url = `https://bluagent-files.s3.us-west-2.amazonaws.com/${id}/DotReport/${form.DocName} `;
    axios
      .get(url, { responseType: "blob" })
      .then((res) => res)
      .then((myBlob) => {
        handleReportByCompany(myBlob.data, form.DescriptionDoc);
      })
      .catch((error) => console.log(error));
  };

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

  const getAllCompaniesInsurance = (provider) => {
    let url =
      "/api/CompanySuperAdmin/GetAllCompaniesInsurance?provider=" + provider;
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        getDotDocumentInsurance(response[0].id);
        setCompanies(response);
      })
      .catch((error) => console.log(error));
  };

  const UploadDotDocs = (form) => {
    setMessage("");
    setError("");

    let url = "/api/AccountSet/UploadDotDocs";
    axios
      .post(url, form)
      .then((response) => response.data)
      .then((response) => {
        const resp = JSON.parse(response);
        if (resp.status !== 1) {
          setMessage("Document Saved Successfully");
          toggleToastAlert(true);
        } else {
          setError("Error uploading document");
          toggleToastAlert(true);
        }
      })
      .catch((error) => {
        setError("Error uploading document");
        toggleToastAlert(true);
        console.log(error);
      });
  };

  const InspectionTypeTable = (inspections) => {
    const data = ViolationCodes;

    const filterInspectionsByCode = (inspections, key) => {
      let level;

      switch (key) {
        case "drivers":
          level = [3, 1];
          break;
        case "vehicles":
          level = [2, 1];
          break;
        case "hazmat":
          level = [6];
          break;
        default:
          level = [];
          break;
      }

      return inspections.filter((insp) => {
        const Code = insp.Code !== undefined ? insp.Code : "";
        return data[key].some(
          (inspection) =>
            inspection.code === Code.substring(0, 3) ||
            level.includes(insp.Level)
        );
      });
    };

    const vehicle = filterInspectionsByCode(inspections, "vehicles");
    const drivers = filterInspectionsByCode(inspections, "drivers");
    const hazmat = filterInspectionsByCode(inspections, "hazmat");

    setViolationsByCode({
      vehicle: vehicle,
      driver: drivers,
      IEP: [],
      hazmat: hazmat,
    });
  };

  const VerticalBar = (inspections) => {
    let states = [];
    let reportNumbers = [];
    let colors = [
      "rgb(0,81,157,0.5)",
      "rgb(85,147,215,0.5)",
      "rgb(87,98,113,0.5)",
    ];

    inspections.map((list) => {
      if (!states.includes(list["State"])) {
        states.push(list["State"]);
      }
    });

    inspections.map((list) => {
      if (!reportNumbers.some((report) => report.Number === list.Number)) {
        reportNumbers.push(list);
      }
    });

    const years = [];
    for (const inspection of reportNumbers) {
      const year = inspection.Date.getFullYear();
      if (!years.includes(year)) {
        years.push(year);
      }
    }

    const inspectionsByState = reportNumbers.reduce((acc, inspection) => {
      const state = inspection.State;
      const year = inspection.Date.getFullYear();
      if (!acc[state]) {
        acc[state] = {};
      }
      if (!acc[state][year]) {
        acc[state][year] = 0;
      }
      acc[state][year]++;
      return acc;
    }, {});

    const inspectionsByYearAndState = {};
    for (const year of years) {
      inspectionsByYearAndState[year] = {};
      for (const state of states) {
        const count = inspectionsByState?.[state]?.[year] || 0;
        inspectionsByYearAndState[year][state] = count;
      }
    }

    const labels = states;
    /* FUNCTION THAT CREATES THE DATASETS FOR THE TABLE, WHICH TRANSFORMS inspectionsByYearAndState INTO A NEW ARRAY
    IN THE BACKGROUND PART, THE MODULAR METHOD IS USED TO VERIFY THAT THE INDEX MATCHES THE INDEX THAT CORRESPONDS
    TO THE COLORS ARRAY AND THUS SELECT A DIFFERENT ONE FOR EACH OF THE YEARS.*/
    const datasets = Object.entries(inspectionsByYearAndState).map(
      ([year, inspectionsByState], index) => ({
        label: year,
        data: Object.values(inspectionsByState),
        backgroundColor: colors[index % colors.length],
      })
    );

    const data = {
      labels,
      datasets,
    };

    setTotalInspections(reportNumbers);
    setInspectionTable(inspectionsByYearAndState);
    setInspectionStates(states);
    setVerticalBar(data);
  };

  const HighDateSummary = (violations) => {
    let last12Month = new Date();
    let highDate;
    let countPercentage = 0;
    let totalParts = 0;

    for (let i = 0; i < 12; i++) {
      safety.safetyCompliance.categories[i].partArray = [];
    }

    violations.map((list, index) => {
      if (index === 0) {
        highDate = list.InspDate;
      } else {
        if (highDate < list.InspDate) {
          highDate = list.InspDate;
        }
      }
    });

    last12Month = highDate.setMonth(highDate.getMonth() - 12);
    highDate.setMonth(highDate.getMonth() + 12);

    let violationsLast12Month = violations.filter(
      (newData) =>
        newData.InspDate <= highDate && newData.InspDate >= last12Month
    );

    for (let x = 0; x < safety.safetyCompliance.parts.length; x++) {
      for (let i = 0; i < violationsLast12Month.length; i++) {
        if (
          violationsLast12Month[i].ViolCode.includes(
            safety.safetyCompliance.parts[x]
          )
        ) {
          safety.safetyCompliance.categories[x].partArray.push(
            violationsLast12Month[i]
          );
        }
      }
    }

    SafetyCompliance.safetyCompliance.categories.map((list, index) => {
      totalParts = totalParts + StatusCalculated(list.partArray, index);
    });

    SafetyCompliance.safetyCompliance.categories.map((list, index) => {
      countPercentage = countPercentage + list.percentage;
    });

    setIndicator(countPercentage / totalParts);
    setOverralSummary(safety.safetyCompliance);
  };

  const StatusCalculated = (array, index) => {
    let countOOS = 0;
    let totalIndicator;

    if (array.length !== 0) {
      array.map((list) => {
        if (list.OOS === "Yes") {
          countOOS = countOOS + 1;
        }
      });

      totalIndicator = (countOOS / array.length) * 100;

      safety.safetyCompliance.categories[index].percentage = totalIndicator;

      if (totalIndicator >= 20) {
        safety.safetyCompliance.categories[index].status = "Unsatisfactory";
        safety.safetyCompliance.categories[index].color = "danger";
        return 1;
      } else {
        if (totalIndicator >= 10 && totalIndicator < 20) {
          safety.safetyCompliance.categories[index].status = "Condicional";
          safety.safetyCompliance.categories[index].color = "warning";
          return 1;
        } else {
          safety.safetyCompliance.categories[index].status = "Satisfactory";
          safety.safetyCompliance.categories[index].color = "success";
          return 1;
        }
      }
    } else {
      safety.safetyCompliance.categories[index].color = "warning";
      safety.safetyCompliance.categories[index].status = "Undetermined";
      return 0;
    }
  };

  const handleChange = (file) => {
    if (file) {
      setFileName(file.name);
      setStateFile(file);
    }
  };

  const handleChangeList = (idCompany) => {
    setIdCompany(idCompany);
    getDotDocumentInsurance(idCompany);
  };

  const GetDOT = (name) => {
    let indiceInit = name.indexOf("_");

    let extractString = name.substring(indiceInit + 1, name.length);

    let indiceEnd = extractString.indexOf("_");
    extractString = extractString.substring(indiceEnd, 0);

    setDot(extractString);

    axios
      .get("/api/DotReport/getUsDotByDot?dot=" + extractString)
      .then((response) => {
        setCompany(JSON.parse(response.data));
      })
      .catch((error) => {});
  };

  const handleReport = (file) => {
    var form = new FormData();
    setLoading(true);
    setFileName(file.name);
    GetDOT(file.name);

    if (file) {
      form.append("files", file);
      form.append("idCompany", idCompany);
      form.append("docType", "DotReport");

      UploadDotDocs(form);

      var driverObject = [];
      var filterInspections = [];
      var crashObject = [];

      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        let data = event.target.result;

        let workbook = XLSX.read(data, { type: "binary", cellDates: true });

        workbook.SheetNames.forEach((sheet, index) => {
          let range = XLSX.utils.decode_range(workbook.Sheets[sheet]["!ref"]);

          if (index === 1) {
            //range.s.r = 1;
            let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              range: range,
            });

            filterSummary(rowVehicles);
          }

          if (index === 2) {
            let optionIndicator;
            range.s.r = 1;
            let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              range: range,
            });

            VerticalBar(rowVehicles);
            InspectionTypeTable(rowVehicles);

            if (rowVehicles.hasOwnProperty("License Number_3"))
              optionIndicator = "PIN";
            else optionIndicator = "DOT";

            filterInspections = inspectionsGroup(
              rowVehicles,
              "Number",
              optionIndicator
            );

            let listVehicles = filterObject(rowVehicles, "VIN");

            let listTrailers = filterObject(rowVehicles, "VIN_1");

            filterMaintenanceReport(listVehicles, listTrailers);

            setVehicle({
              ...vehicle,
              vehicles: {
                listVehicles,
                listTrailers,
              },
            });

            let listDrivers = filterObject(rowVehicles, "License Number");
            listDrivers = listDrivers.filter(
              (list) => list.hasOwnProperty("Date of Birth") === true
            );

            driverObject.push(
              listDrivers.map((list) => {
                return {
                  Name: list["First Name"].replace(/-/g, " "),
                  LastName: list["Last Name"].replace(/-/g, " "),
                  Email: (
                    list["First Name"] +
                    list["Last Name"] +
                    "@" +
                    list["License Number"] +
                    ".com"
                  ).replace(/ /g, ""),
                  Role: "DRIVER",
                  Status: "ACTIVE",
                  Birthdate: list["Date of Birth"].replace(/[/]/g, "-"),
                  License: list["License Number"],
                };
              })
            );
          }

          if (index === 3) {
            range.s.r = 1;
            let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              range: range,
            });

            crashObject.push(
              rowVehicles.map((list) => {
                return {
                  Date: list.Date.toLocaleDateString().replace(/[/]/g, "-"),
                  CitationIssued: list["Citation Issued"],
                  Fatalities: list.Fatalities,
                  HMReleased: list["HM Released"],
                  Injuries: list.Injuries,
                  LicenseNumber:
                    list.hasOwnProperty("License Number_1") === true
                      ? list["License Number_1"]
                      : list["License Number"],
                  LicenseState:
                    list.hasOwnProperty("License State_1") === true
                      ? list["License State_1"]
                      : list["License State"],
                  LightCondition: list["Light Condition"],
                  Number: list.Number,
                  RoadAccessControl: list["Road Access Control"],
                  RoadSurfaceCondition: list["Road Surface Condition"],
                  RoadwayTrafficway: list["Roadway Trafficway"],
                  SeverityWeight: list["Severity Weight (A)"],
                  State: list.State,
                  TimeSeverityWeight: list["Time Severity Weight (AxB)"],
                  TimeWeight: list["Time Weight (B)"],
                  TowAway: list["Tow-Away"],
                  VIN: list.VIN,
                  WeatherCondition: list["Weather Condition"],
                };
              })
            );
          }
        });

        setDrivers(driverObject[0]);
        setCrash(crashObject[0]);
        setInspections(filterInspections.inspectionGroup);
        setViolations(filterInspections.violationGroup);
        HighDateSummary(filterInspections.violationGroup);
        filterStates(filterInspections.inspectionGroup);
        setLoading(false);
      };
    }
  };

  const handleReportByCompany = (file, name) => {
    GetDOT(name);

    if (file) {
      var driverObject = [];
      var filterInspections = [];
      var crashObject = [];

      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        let data = event.target.result;

        let workbook = XLSX.read(data, { type: "binary", cellDates: true });

        workbook.SheetNames.forEach((sheet, index) => {
          let range = XLSX.utils.decode_range(workbook.Sheets[sheet]["!ref"]);

          if (index === 1) {
            //range.s.r = 1;
            let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              range: range,
            });
            filterSummary(rowVehicles);
          }

          if (index === 2) {
            let optionIndicator;
            range.s.r = 1;
            let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              range: range,
            });

            VerticalBar(rowVehicles);

            InspectionTypeTable(rowVehicles);

            if (rowVehicles.hasOwnProperty("License Number_3"))
              optionIndicator = "PIN";
            else optionIndicator = "DOT";

            filterInspections = inspectionsGroup(
              rowVehicles,
              "Number",
              optionIndicator
            );

            let listVehicles = filterObject(rowVehicles, "VIN");

            let listTrailers = filterObject(rowVehicles, "VIN_1");

            filterMaintenanceReport(listVehicles, listTrailers);

            setVehicle({
              ...vehicle,
              vehicles: {
                listVehicles,
                listTrailers,
              },
            });

            let listDrivers = filterObject(rowVehicles, "License Number");
            listDrivers = listDrivers.filter(
              (list) => list.hasOwnProperty("Date of Birth") === true
            );

            driverObject.push(
              listDrivers.map((list) => {
                return {
                  Name: list["First Name"].replace(/-/g, " "),
                  LastName: list["Last Name"].replace(/-/g, " "),
                  Email: (
                    list["First Name"] +
                    list["Last Name"] +
                    "@" +
                    list["License Number"] +
                    ".com"
                  ).replace(/ /g, ""),
                  Role: "DRIVER",
                  Status: "ACTIVE",
                  Birthdate: list["Date of Birth"].replace(/[/]/g, "-"),
                  License: list["License Number"],
                };
              })
            );
          }

          if (index === 3) {
            range.s.r = 1;
            let rowVehicles = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              range: range,
            });

            crashObject.push(
              rowVehicles.map((list) => {
                return {
                  Date: list.Date.toLocaleDateString().replace(/[/]/g, "-"),
                  CitationIssued: list["Citation Issued"],
                  Fatalities: list.Fatalities,
                  HMReleased: list["HM Released"],
                  Injuries: list.Injuries,
                  LicenseNumber:
                    list.hasOwnProperty("License Number_1") === true
                      ? list["License Number_1"]
                      : list["License Number"],
                  LicenseState:
                    list.hasOwnProperty("License State_1") === true
                      ? list["License State_1"]
                      : list["License State"],
                  LightCondition: list["Light Condition"],
                  Number: list.Number,
                  RoadAccessControl: list["Road Access Control"],
                  RoadSurfaceCondition: list["Road Surface Condition"],
                  RoadwayTrafficway: list["Roadway Trafficway"],
                  SeverityWeight: list["Severity Weight (A)"],
                  State: list.State,
                  TimeSeverityWeight: list["Time Severity Weight (AxB)"],
                  TimeWeight: list["Time Weight (B)"],
                  TowAway: list["Tow-Away"],
                  VIN: list.VIN,
                  WeatherCondition: list["Weather Condition"],
                };
              })
            );
          }
        });

        setDrivers(driverObject[0]);
        setCrash(crashObject[0]);
        setInspections(filterInspections.inspectionGroup);
        setViolations(filterInspections.violationGroup);
        HighDateSummary(filterInspections.violationGroup);
        filterStates(filterInspections.inspectionGroup);
      };
    }
  };
  const filterObject = (item, name) => {
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
          OOS: secondList["Out of Service"],
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
              x["Out of Service"] === "Yes" &&
              x["HM Inspection"] === "Yes"
          ).length;

          inspectionGroup.push({
            ReportNumber: secondList.Number.replace(secondList.State, ""),
            ReportState: secondList.State,
            DotNumber: dot,
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

  const mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  const filterHeadStates = (vehicle, trailer, option) => {
    let listVehicleStates = [];
    let listTrailerLicenState = [];
    if (option) {
      vehicle.map((list) => {
        if (!listVehicleStates.includes(list["License State_2"])) {
          listVehicleStates.push(list["License State_2"]);
        }
      });
      trailer.map((list) => {
        if (!listTrailerLicenState.includes(list["License State_3"])) {
          listTrailerLicenState.push(list["License State_3"]);
        }
      });
    } else {
      vehicle.map((list) => {
        if (!listVehicleStates.includes(list["License State"])) {
          listVehicleStates.push(list["License State"]);
        }
      });
      trailer.map((list) => {
        if (list.hasOwnProperty("License State_1")) {
          if (!listTrailerLicenState.includes(list["License State_1"])) {
            listTrailerLicenState.push(list["License State_1"]);
          }
        } else {
          if (!listTrailerLicenState.includes(list["License State"])) {
            listTrailerLicenState.push(list["License State"]);
          }
        }
      });
    }

    return { listVehicleStates, listTrailerLicenState };
  };

  const filterStates = (states) => {
    const listStates = [];
    const mapObject = {};

    states.map((list) => {
      if (!listStates.includes(list.ReportState)) {
        listStates.push(list.ReportState);
      }
    });

    for (let i = 0; i < listStates.length; i++) {
      mapObject[listStates[i]] = states.filter(
        (list) => listStates[i] === list.ReportState
      );
    }

    for (let i = 0; i < listStates.length; i++) {
      mapObject[listStates[i]] = {
        total: mapObject[listStates[i]].length,
        Name: mapObject[listStates[i]][0].ReportState,
        fill: "navy",
      };
    }

    setMap(mapObject);
  };

  const filterSummary = (inspection) => {
    var listViolationSummary = [];
    var arraySummary = [];
    let tableObject = [];

    inspection.map((list) => {
      if (!listViolationSummary.includes(list["Violation Group Description"])) {
        listViolationSummary.push(list["Violation Group Description"]);
      }
    });

    for (let i = 0; i < listViolationSummary.length; i++) {
      arraySummary.push(
        inspection.filter(
          (list) =>
            listViolationSummary[i] === list["Violation Group Description"]
        )
      );
    }

    for (let i = 0; i < arraySummary.length; i++) {
      let total = 0;
      let OSS = 0;
      let type = "";

      arraySummary[i].map((list, index) => {
        total = total + list["# of Violations"];
        OSS = OSS + list["# of OOS Violations"];
        type = <strong>{list["Violation Group Description"]}</strong>;
      });
      tableObject.push({ type, total, OSS });
    }

    setSummary(tableObject);
  };

  const HighDate = (vehicle, trailer) => {
    let optionIndicator;
    let last12Month = new Date();
    let last24Month = new Date();
    let highDate;

    vehicle.map((list, index) => {
      if (index === 0) {
        highDate = list.Date;
      } else {
        if (highDate < list.Date) {
          highDate = list.Date;
        }
      }
    });

    last12Month = highDate.setMonth(highDate.getMonth() - 12);
    last24Month = highDate.setMonth(highDate.getMonth() - 12);
    highDate.setMonth(highDate.getMonth() + 24);

    let vehiclesLast12Month = vehicle.filter(
      (newData) => newData.Date <= highDate && newData.Date >= last12Month
    );
    let vehiclesLast24Month = vehicle.filter(
      (newData) => newData.Date <= highDate && newData.Date >= last24Month
    );

    if (trailer.hasOwnProperty("License Number_3")) optionIndicator = true;
    else optionIndicator = false;

    return {
      vehiclesLast12Month,
      vehiclesLast24Month,
      head12Month: filterHeadStates(vehicle, trailer, optionIndicator),
      last24Month: filterHeadStates(vehicle, trailer, optionIndicator),
    };
  };

  const filterMaintenanceReport = (vehicles, trailer) => {
    let vehicleDate = HighDate(vehicles, trailer);
    setMaintenanceReport({
      ...maintenanceReport,
      report: {
        vehicleDate,
        trailer,
      },
    });
  };

  const statesCustomConfig = () => {
    return map;
  };

  const columns = [
    {
      name: "Name",
      selector: "Name",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "LastName",
      sortable: true,
    },
    {
      name: "License",
      selector: "License",
      center: true,
    },
    {
      name: "Date of Birthday",
      selector: "Birthdate",
      center: true,
    },
  ];

  const accident = [
    {
      name: "DATE",
      selector: "Date",
      sortable: true,
    },
    {
      name: "STATE",
      selector: "State",
      sortable: true,
    },
    {
      name: "NUMBER",
      selector: "Number",
    },
    {
      name: "TOW-AWAY",
      selector: "TowAway",
    },
    {
      name: "HM RELEASED",
      selector: "HMReleased",
    },
    {
      name: "VIN",
      selector: "VIN",
    },
    {
      name: "LICENSE STATE",
      selector: "LicenseState",
    },
    {
      name: "LICENSE NUMBER",
      selector: "LicenseNumber",
    },
  ];
  const options = {
    scales: {
      x: {
        gridLines: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
    elements: {
      line: {
        tension: 0,
        showLine: false,
      },
      point: {
        radius: 0,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    borderWidth: 0,
    grid: {
      display: false,
    },
    datasets: [
      {
        borderWidth: 0,
      },
    ],
  };
  const ExpandedComponent = ({ data }) => {
    return (
      <div className="d-flex flex-column">
        <div className="p-2">
          <strong>Fatalities: </strong>
          {data.Fatalities}
        </div>
        <div className="p-2">
          <strong>Injuries: </strong>
          {data.Injuries}
        </div>
        <div className="p-2">
          <strong>Roadway Trafficway: </strong>
          {data.RoadwayTrafficway}
        </div>
        {data.RoadAccessControl !== undefined ? (
          <div className="p-2">
            <strong>Road Access Control: </strong>
            {data.RoadAccessControl}
          </div>
        ) : null}
        <div className="p-2">
          <strong>Road Surface Condition: </strong>
          {data.RoadSurfaceCondition}
        </div>
        <div className="p-2">
          <strong>Weather Condition: </strong>
          {data.WeatherCondition}
        </div>
        <div className="p-2">
          <strong>Light Condition: </strong>
          {data.LightCondition}
        </div>
      </div>
    );
  };

  const toggleToastAlert = (state) => {
    setToggle(state);
  };

  return (
    <div>
      <ToastAlert
        toggleToast={toggleToastAlert}
        isOpen={toggle}
        message={message}
        error={error}
      />
      {user.Role === "SUPERADMIN" ? (
        <div className="flex-column">
          <div className="col-12 col-sm-6 col-lg-6">
            <div className="card card-height">
              <div className="card-body">
                <div className="col-sm-12">
                  <div className="">
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
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          {fileName}
                        </label>
                      </div>
                      <div className="custom-file mt-2">
                        <label htmlFor="company-list">Select a company:</label>
                        <Autosuggest
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={({ value }) =>
                            setSuggestions(getSuggestions(value))
                          }
                          onSuggestionsClearRequested={() => setSuggestions([])}
                          getSuggestionValue={(suggestion) =>
                            suggestion.legalName
                          }
                          renderSuggestion={renderSuggestion}
                          inputProps={{
                            placeholder: "Type a company name",
                            value: value,
                            onChange: (event, { newValue }) =>
                              setValue(newValue),
                          }}
                          onSuggestionSelected={(event, { suggestion }) => {
                            setIdCompany(suggestion.id)
                            setValue(suggestion.legalName); // Actualiza el valor del input
                          }}
                        />
                      </div>

                      {stateFile !== undefined && companies !== undefined ? (
                        <div className="mr-2">
                          {loading !== true ? (
                            <div className="d-flex mt-4">
                              <div className="mr-2">
                                <Button
                                  outline
                                  color="success"
                                  onClick={() => handleReport(stateFile)}
                                >
                                  GENERATE
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : user.Role === "INSURANCE" ? (
        <div className="flex-column">
          <div className="col-12 col-sm-6 col-lg-6">
            <div className="card card-height">
              <div className="card-body">
                <div className="col-sm-12">
                  <div className="">
                    <div className="transition-effect">
                      <div className="custom-file mt-2">
                        <label htmlFor="company-list">Select a company:</label>
                        <Autosuggest
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={({ value }) =>
                            setSuggestions(getSuggestions(value))
                          }
                          onSuggestionsClearRequested={() => setSuggestions([])}
                          getSuggestionValue={(suggestion) =>
                            suggestion.legalName
                          }
                          renderSuggestion={renderSuggestion}
                          inputProps={{
                            placeholder: "Type a company name",
                            value: value,
                            onChange: (event, { newValue }) =>
                              setValue(newValue),
                          }}
                          onSuggestionSelected={(event, { suggestion }) => {
                            handleChangeList(suggestion.id)
                            setValue(suggestion.legalName); // Actualiza el valor del input
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {sizeDocs === 1 ? (
        <div className="flex-column">
          <div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Notification!</h4>
            <p>
              Good day user!, the data of this report is not available yet.
              contact your agent to have your report available.
            </p>
            <hr />
            <p class="mb-0">
              I hope and it does not cause you much inconvenience, have a good
              day.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-column">
            {company !== undefined && indicator !== undefined ? (
              <CompanyComponent
                data={company.dotInspections[0]}
                status={indicator}
              />
            ) : null}
            {inspections !== undefined &&
            violations !== undefined &&
            vehicle !== undefined &&
            violations !== undefined &&
            overralSummary !== undefined &&
            company !== undefined &&
            maintenanceReport !== undefined &&
            summary !== undefined ? (
              <DownloadDotReport
                violations={overralSummary}
                data={company.dotInspections[0]}
                inspection={inspections}
                violation={violations}
                summary={summary}
                {...maintenanceReport}
                {...vehicle}
              />
            ) : null}
          </div>
          <div className="flex-column">
            <ul
              className="nav nav-tabs d-flex justify-content-between"
              id="navDot"
              role="tablist"
            >
              <li className="nav-item mt-2" role="presentation">
                <a
                  className="nav-link active"
                  id="summary-tab"
                  data-toggle="tab"
                  href="#summary"
                  role="tab"
                  aria-controls="summary"
                  aria-selected="true"
                >
                  Report Summary
                </a>
              </li>
              <li className="nav-item mt-2" role="presentation">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#companyInfo"
                  role="tab"
                  aria-controls="companyInfo"
                  aria-selected="false"
                >
                  Company Info
                </a>
              </li>
              <li className="nav-item mt-2" role="presentation">
                <a
                  className="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#vehicle"
                  role="tab"
                  aria-controls="vehicle"
                  aria-selected="false"
                >
                  Vehicle
                </a>
              </li>
              <li className="nav-item mt-2" role="presentation">
                <a
                  className="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#driver"
                  role="tab"
                  aria-controls="driver"
                  aria-selected="false"
                >
                  Driver
                </a>
              </li>
              <li className="nav-item mt-2" role="presentation">
                <a
                  className="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#accident"
                  role="tab"
                  aria-controls="accident"
                  aria-selected="false"
                >
                  Accidents
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="summary"
                role="tabpanel"
                aria-labelledby="summary-tab"
              >
                <div className="row">
                  {violations !== undefined && overralSummary !== undefined ? (
                    <ReportSummary
                      violations={overralSummary}
                      data={violationsByCodes}
                    />
                  ) : null}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="companyInfo"
                role="tabpanel"
                aria-labelledby="companyInfo-tab"
              >
                {company !== undefined ? (
                  <CompanyInformation data={company.dotInspections[0]} />
                ) : null}
              </div>
              <div
                className="tab-pane fade"
                id="vehicle"
                role="tabpanel"
                aria-labelledby="vehicle-tab"
              >
                <div className="row mt-4">
                  {maintenanceReport !== undefined ? (
                    <VehicleMaintenanceReport {...maintenanceReport} />
                  ) : null}
                </div>
                <div className="row mt-4">
                  {inspections !== undefined &&
                  violations !== undefined &&
                  vehicle !== undefined ? (
                    <InspectionHistory
                      inspection={inspections}
                      violation={violations}
                      {...vehicle}
                    />
                  ) : null}
                </div>
                <div className="row mt-4">
                  {map !== undefined ? (
                    <InspectionMap
                      states={statesCustomConfig}
                      handle={mapHandler}
                      options={options}
                      verticalData={verticalBar}
                      inspectionTable={inspectionTable}
                      inspectionStates={inspectionStates}
                      totalInspections={totalInspections}
                    />
                  ) : null}
                </div>
                <div className="row mt-4">
                  {summary !== undefined ? (
                    <ViolationSummary data={summary} />
                  ) : null}
                </div>
                <div className="row mt-4">
                  {inspections !== undefined &&
                  violations !== undefined &&
                  vehicle !== undefined ? (
                    <RoadInspection
                      {...vehicle}
                      inspection={inspections}
                      violation={violations}
                    />
                  ) : null}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="driver"
                role="tabpanel"
                aria-labelledby="driver-tab"
              >
                <DataTable
                  columns={columns}
                  responsive={true}
                  data={drivers}
                  pagination
                  highlightOnHover
                  pointerOnHover
                  dense
                />
              </div>
              <div
                className="tab-pane fade"
                id="accident"
                role="tabpanel"
                aria-labelledby="accident-tab"
              >
                {crash === undefined ? (
                  <DataTable
                    columns={accident}
                    responsive={true}
                    data={crash}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    expandableRows
                    expandableRowsComponent={<ExpandedComponent />}
                  />
                ) : crash.length === 0 ? (
                  <MessageCrashNotification />
                ) : (
                  <DataTable
                    columns={accident}
                    responsive={true}
                    data={crash}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    expandableRows
                    expandableRowsComponent={<ExpandedComponent />}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DOTReport;
