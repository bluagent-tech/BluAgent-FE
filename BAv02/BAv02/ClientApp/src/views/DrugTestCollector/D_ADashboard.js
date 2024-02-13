import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  TabContent,
  TabPane,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Fade,
} from "reactstrap";
import axios from "axios";
import DriverTest from "../../containers/Test/Modal/DriverTest";
import NonDriverTest from "../../containers/Test/Modal/NonDriverTest";
import DrugScheduleTestCollector from "../../containers/Test/Modal/DrugScheduleTestCollector";
import DrugScheduleTest from "../../containers/Test/Modal/DrugScheduleTest";
import Autosuggest from "react-autosuggest";

const D_ADashboard = () => {
  const [idCompany, setIdCompany] = useState("null");
  const [companyList, setCompanyList] = useState();
  const [activeTab, setActiveTab] = useState("1");
  const [suggestions, setSuggestions] = useState([]); // Estado para las sugerencias
  const [value, setValue] = useState("");

  const getAllCompanies = () => {
    let url = "/api/CompanySuperAdmin/GetAllCompanies";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        console.log('response:', response);
        setCompanyList(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getSuggestions = (value) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : companyList.filter(
          (company) =>
            company.legalName.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const renderSuggestion = (suggestion) => <div>{suggestion.legalName}</div>;

  return (
    <React.Fragment>
      <div className="container-fluid" style={{ marginTop: "3%" }}>
        <div className="animated fadeIn">
          <Row>
            <Col sm="12">
              <Card style={{ padding: "15px" }}>
                <h5>Drug & Alcohol Testing</h5>
                <br />
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
              </Card>
            </Col>
          </Row>
          {/* <div className="animated fadeIn"> */}
          <Row>
            <Col xs="12">
              <Fade in="true">
                <Card>
                  <CardBody>
                    <Col>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              toggle("1");
                            }}
                            active={activeTab === "1"}
                          >
                            DOT DRIVERS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              toggle("2");
                            }}
                            active={activeTab === "2"}
                          >
                            NON DOT DRIVERS
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            onClick={() => { toggle('3'); }}
                            active={activeTab === '3'}
                          >
                            SCHEDULE TEST
                          </NavLink>
                        </NavItem>
                      </Nav>

                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <DriverTest idCompany={idCompany} />
                        </TabPane>
                        <TabPane tabId="2">
                          <NonDriverTest idCompany={idCompany} />
                        </TabPane>
                        <TabPane tabId="3">
                          <DrugScheduleTest idCompany={idCompany} />
                        </TabPane>
                      </TabContent>
                    </Col>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          </Row>
          {/* </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default D_ADashboard;
