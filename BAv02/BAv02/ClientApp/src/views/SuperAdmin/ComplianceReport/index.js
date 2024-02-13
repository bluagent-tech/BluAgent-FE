import React, { useState, useEffect } from "react";
import Gauge from "../../../components/GaugeChart";
import ReChart from "../../../components/ReChart";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";

const ComplianceReport = () => {
  const [idCompany, setIdCompany] = useState();
  const [companiesList, setCompaniesList] = useState();

  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias
  const [value, setValue] = useState("");

  var user = JSON.parse(localStorage.getItem("user"));
  var id = JSON.parse(localStorage.getItem("idCompany"));

  const [drivers, setDrivers] = useState(
    JSON.parse(localStorage.getItem("driverReport"))
  );
  const [company, setCompany] = useState(
    JSON.parse(localStorage.getItem("companyReport"))
  );
  const [trucks, setTrucks] = useState(
    JSON.parse(localStorage.getItem("trucksReport"))
  );
  const [trailer, setTrailer] = useState(
    JSON.parse(localStorage.getItem("trailerReport"))
  );

  useEffect(() => {
    if (user.Role === "ADMIN") {
      driverReport(id), companyReport(id), trucksReport(id);
      trailersReport(id);
    }
    if (user.Role === "SUPERADMIN") {
      getAllCompanies();
    }
    if (user.Role === "INSURANCE") {
      getAllCompaniesInsurance(user.InsuranceProvider);
    }
  }, []);

  const getAllCompanies = () => {
    let url = "/api/CompanySuperAdmin/GetAllCompanies";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        setCompaniesList(response);
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
        setCompaniesList(response);
      })
      .catch((error) => console.log(error));
  };

  const driverReport = (idCompany) => {
    axios
      .get("/api/ComplianceReport/getDriverReport?companyId=" + idCompany)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        var r = JSON.parse(response);
        localStorage.setItem(
          "driverReport",
          JSON.stringify(r.driverCompliance)
        );
        setDrivers(r.driverCompliance);
      })
      .catch((error) => console.log(error));
  };

  const companyReport = (idCompany) => {
    axios
      .get("/api/ComplianceReport/getCompanyReport?companyId=" + idCompany)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        var r = JSON.parse(response);
        localStorage.setItem(
          "companyReport",
          JSON.stringify(r.companyCompliance)
        );
        setCompany(r.companyCompliance);
      })
      .catch((error) => console.log(error));
  };

  const trucksReport = (idCompany) => {
    axios
      .get("/api/ComplianceReport/getTruckReport?companyId=" + idCompany)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        var r = JSON.parse(response);
        if (r.status === 1) {
          localStorage.setItem(
            "trucksReport",
            JSON.stringify(r.truckCompliance)
          );
          setTrucks(r.truckCompliance);
        } else {
          localStorage.setItem("trucksReport", JSON.stringify(null));
          setTrucks(null);
        }
      })
      .catch((error) => console.log(error));
  };

  const trailersReport = (idCompany) => {
    axios
      .get("/api/ComplianceReport/getTrailerReport?companyId=" + idCompany)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        var r = JSON.parse(response);
        if (r.status === 1) {
          localStorage.setItem(
            "trailerReport",
            JSON.stringify(r.trailerCompliance)
          );
          setTrailer(r.trailerCompliance);
        } else {
          localStorage.setItem("trailerReport", JSON.stringify(null));
          setTrailer(null);
        }
      })
      .catch((error) => console.log(error));
  };

  const getSuggestions = (value) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : companiesList.filter(
          (company) =>
            company.legalName.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.legalName}</div>;

  return (
    <div>
      {user.Role === "SUPERADMIN" || user.Role === "INSURANCE" ? (
        <div className="row">
          <div className="col-12 col-sm-6 col-lg-6">
            <div className="card card-height">
              <div className="card-body">
                <div className="col">
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
                  <button
                    className="btn btn-success mt-2"
                    disabled={!idCompany}
                    onClick={() => {
                      driverReport(idCompany),
                        companyReport(idCompany),
                        trucksReport(idCompany);
                      trailersReport(idCompany);
                    }}
                  >
                    GENERATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row p-3">
                <div className=" flex-wrap col-sm-6">
                  {/*DRIVER*/}
                  <div className="justify-content-start row border-color">
                    <h5>Driver</h5>
                  </div>
                  <div className="justify-content-center row flex-wrap">
                    <div className="margin-chart">
                      <Gauge
                        data={
                          drivers !== null
                            ? drivers.CompliancePercentage
                            : undefined
                        }
                      />
                    </div>
                    <div className="margin-chart">
                      <ReChart
                        data={
                          drivers !== null
                            ? drivers.DriversByQuarters
                            : undefined
                        }
                        type="driver"
                      />
                    </div>
                  </div>
                  <div className="justify-content-start row mb-4 mt-4">
                    {drivers !== null ? (
                      drivers.DriverReport !== null ? (
                        <Link
                          to={{
                            pathname: "/reports/compliance-report/driver",
                          }}
                        >
                          <button className="btn btn-outline-success">
                            {"See what's changed ->"}
                          </button>
                        </Link>
                      ) : (
                        <button className="btn btn-warning" disabled>
                          {"Don`t have Drivers for Report->"}
                        </button>
                      )
                    ) : (
                      <button className="btn btn-warning" disabled>
                        {"Don`t have data ->"}
                      </button>
                    )}
                  </div>
                </div>
                <div className=" flex-wrap col-sm-6">
                  {/*Trailer*/}
                  <div className="justify-content-start row border-color">
                    <h5>Trailer</h5>
                  </div>
                  <div className="justify-content-center row flex-wrap">
                    <div className="margin-chart">
                      <Gauge
                        data={
                          trailer !== null
                            ? trailer.CompliancePercentage
                            : undefined
                        }
                      />
                    </div>
                    <div className="margin-chart">
                      <ReChart
                        data={
                          trailer !== null
                            ? trailer.TrucksByQuarters
                            : undefined
                        }
                        type="trailer"
                      />
                    </div>
                  </div>
                  <div className="justify-content-start row mb-4 mt-4">
                    {trailer !== null ? (
                      trailer.TruckReport !== null ||
                      trailer.trucksReport !== undefined ? (
                        <Link
                          to={{
                            pathname: "/reports/compliance-report/trailer",
                          }}
                        >
                          <button className="btn btn-outline-success">
                            {"See what's changed ->"}
                          </button>
                        </Link>
                      ) : (
                        <button className="btn btn-warning" disabled>
                          {"Don`t have Trailers for report ->"}
                        </button>
                      )
                    ) : (
                      <button className="btn btn-warning" disabled>
                        {"Don`t have data ->"}
                      </button>
                    )}
                  </div>
                </div>
                <div className=" flex-wrap col-sm-6">
                  {/*Trucks*/}
                  <div className="justify-content-start row border-color">
                    <h5>Trucks</h5>
                  </div>
                  <div className="justify-content-center row flex-wrap">
                    <div className="margin-chart">
                      <Gauge
                        data={
                          trucks !== null
                            ? trucks.CompliancePercentage
                            : undefined
                        }
                      />
                    </div>
                    <div className="margin-chart">
                      <ReChart
                        data={
                          trucks !== null ? trucks.TrucksByQuarters : undefined
                        }
                        type="truck"
                      />
                    </div>
                  </div>
                  <div className="justify-content-start row mb-4 mt-4">
                    {trucks !== null ? (
                      trucks.TruckReport == null ||
                      trucks.TruckReport == undefined ? (
                        <button className="btn btn-warning" disabled>
                          {"Don`t have Trucks for report  ->"}
                        </button>
                      ) : (
                        <Link
                          to={{
                            pathname: "/reports/compliance-report/truck",
                          }}
                        >
                          <button className="btn btn-outline-success">
                            {"See what's changed ->"}
                          </button>
                        </Link>
                      )
                    ) : (
                      <button className="btn btn-warning" disabled>
                        {"Don`t have data ->"}
                      </button>
                    )}
                  </div>
                </div>
                <div className=" flex-wrap col-sm-6">
                  {/*Company*/}
                  <div className="justify-content-start row border-color">
                    <h5>Company</h5>
                  </div>
                  <div className="justify-content-center row flex-wrap">
                    <div className="margin-chart">
                      <Gauge
                        data={
                          company !== null
                            ? company.CompliancePercentage
                            : undefined
                        }
                      />
                    </div>
                    <div className="margin-chart">
                      <ReChart
                        data={
                          company !== null ? company.ComplianceDate : undefined
                        }
                        type="company"
                      />
                    </div>
                  </div>
                  <div className="justify-content-start row mb-4 mt-4">
                    {company !== null ? (
                      <Link
                        to={{
                          pathname: "/reports/compliance-report/company",
                        }}
                      >
                        <button className="btn btn-outline-success">
                          {"See what's changed ->"}
                        </button>
                      </Link>
                    ) : (
                      <button className="btn btn-warning" disabled>
                        {"Don`t have data -> ->"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceReport;
