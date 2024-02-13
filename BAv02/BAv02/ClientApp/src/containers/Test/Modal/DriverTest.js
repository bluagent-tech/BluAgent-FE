import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  Button,
  CardBody,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import convertDate from "./../../../services/dateConvertTables";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/DrugAndAlcoholTesting";
import DropdownMenu from "./../../../components/DropdownMenu";
import Switch from "react-switch";
import Confirmation from "./../../../components/Confirmation";
import UploadDrugTest from "./../Modal/UploadDrugTest";
import AddDriverDrugTest from "../../Drivers/AddDriverDrugTesting/AddDriver";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import moment from "moment";
import ReactExport from "react-data-export";
import AlertDelete from "../../../components/AlertDelete";
import "../../../assets/css/DriverTest.css";

const idCompany = localStorage["idCompany"];
const User = JSON.parse(localStorage['user']);

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const enrolledDriversColumns = [
  { name: "", selector: "photo", grow: 0 },
  { name: "DRIVER", selector: "driver", sortable: true },
  {
    name: "MRO VERIFIED DATE",
    selector: (row) => (row.mro !== null ? row.mro : "00-00-0000"),
    center: true,
    format: (row) =>
      row.mro !== null ? moment(row.mro).format("MM-DD-YYYY") : null,
    sortable: true,
  },
  { name: "TEST TYPE", selector: "testType", center: true },
  { name: "REASON FOR TEST", selector: "reason", center: true },
  { name: "RESULT", selector: "result", center: true },
  { name: "SPECIMEN ID", selector: "specimenId", center: true },
  { name: "OPTIONS", selector: "options", center: true },
];

const notEnrolledDriversColumns = [
  { name: "", selector: "photo", grow: 0 },
  { name: "DRIVER", selector: "driver", sortable: true },
  { name: "COUNTRY", selector: "country", center: true },
  { name: "LICENSE", selector: "license", center: true },
  { name: "ENROLL", selector: "enroll", center: true },
];

const TextField = styled.input`
  height: 32px;
  width: 100%;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 16px;

  &:hover {
    cursor: auto;
  }
`;

const Filter = ({ onFilter }) => {
  return (
    <React.Fragment>
      <FormGroup className="formGroupFilter" row>
        <Col md="12">
          <TextField
            id="search"
            type="search"
            role="search"
            placeholder="Search Driver"
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  );
};

const DriversImg = (img, Id, idCompany) => {
  return (
    <div className="align-right">
      <div className="avatar">
        <img
          src={
            img === null
              ? "assets/img/Images/profile/profile.png"
              : `https://bluagent-files.s3-us-west-2.amazonaws.com/${idCompany}/Drivers/${Id}/driverAvatar.png`
          }
          alt="driver profile avatar"
          className="img-avatar imgDriverImg"
        // style={{ width: "100%", height: "100%", borderRadius: 0 }}
        />
        <span className="avatar-status badge-success"></span>
      </div>
    </div>
  );
};

const DriversCountryFlag = (country) => {
  return (
    <div className="text-center">
      {country === "US" ? (
        <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
      ) : country === "MX" ? (
        <i className="flag-icon flag-icon-mx h4 mb-0" title="mx" id="mx"></i>
      ) : (
        <i className="flag-icon flag-icon-us h4 mb-0" title="us" id="us"></i>
      )}
    </div>
  );
};

const DriversEnrollCheckBox = (props, IdUser) => {
  return (
    <div className="text-center">
      <i
        className="fa fa-check-square-o fa-lg mt-4"
        style={{ color: "green", cursor: "pointer" }}
        onClick={() => {
          props.enrollDriver(
            IdUser,
            JSON.parse(localStorage.getItem("user")).Id,
            true
          );
        }}
      ></i>
    </div>
  );
};

const OptionMenu = ({ reduxProps, Id }) => {
  return (
    <DropdownMenu
      direction="right"
      toggleWorkOrderModal={() => {
        reduxProps.enrollDriver(
          Id,
          JSON.parse(localStorage.getItem("user")).Id,
          false
        );
      }}
      menuOptions={[
        [
          "Add Drug Test",
          () => {
            reduxProps.toggleDrugDoc(
              Id,
              JSON.parse(localStorage.getItem("user")).Id
            );
          },
        ],
        [
          "Remove",
          () => {
            reduxProps.toggleD1(Id);
          },
          // () => {
          //   reduxProps.updateDOTDrivers(Id, false);
          // },
        ],
      ]}
    />
  );
};

//ENROLL DRIVER

class DriverTest extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      idCompany: props.idCompany || localStorage.getItem("idCompany"),
      checked: true,
      filteredTextDriversNotEnrolled: "",
      filteredTextDriversEnrolled: "",
      modal: false,
    };
    this.toggleRemove = this.toggleRemove.bind(this);
  }


  toggleRemove() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  componentDidMount() {

    if (User.Role === "COLLECTOR") {
      this.props.getDriversCollectorE(
        this.props.idCompany,
        1,
        100,
        true,
        true
      )
    } else {
      this.props.getDriversE(
        JSON.parse(localStorage.getItem("user")).Id,
        1,
        100,
        true,
        true
      );
    }
  }

  // componentDidMount() {
  //   this.props.getDriversE(
  //     JSON.parse(localStorage.getItem("user")).Id,
  //     1,
  //     100,
  //     true,
  //     true
  //   );
  //   //this.props.getDriversNE(
  //   //JSON.parse(localStorage.getItem("user")).Id,
  //   //1,
  //   //100,
  //   //false,
  //   //);
  // }

  componentDidUpdate(prevProps) {
    if (prevProps.idCompany !== this.props.idCompany) {
      this.setState({ idCompany: this.props.idCompany });
      this.props.getDriversCollectorE(
        this.props.idCompany,
        1,
        100,
        true,
        true
      );
    }
    if (this.props.driversList !== prevProps.driversList) {
      this.props.getDriversE(
        JSON.parse(localStorage.getItem("user")).Id,
        1,
        100,
        true,
        true
      );
    }
  }

  handleChange(checked) {
    this.setState({ checked });

    this.props.ExportEnrolledDrivers(
      JSON.parse(localStorage.getItem("user")).Id,
      checked
    );

    if (checked === true) {
      document.getElementById("activeItemsContainer2").style.display = "block";
      document.getElementById("inactiveItemsContainer2").style.display = "none";
    } else {
      document.getElementById("activeItemsContainer2").style.display = "none";
      document.getElementById("inactiveItemsContainer2").style.display =
        "block";
    }
  }

  mapDriversForDataTable(items, isEnroll) {
    let data;
    if (isEnroll) {
      data = items.map((row) => {
        var object = {};
        object.photo = DriversImg(row.Image, row.IdUser, this.props.idCompany || idCompany);
        object.driver = row.Name;
        object.mro = row.MRO;
        object.testType = row.Type;
        object.reason = row.Reason;
        object.result = row.Result;
        object.specimenId = row.Specimen;
        object.options = object.options = (
          <OptionMenu reduxProps={this.props} Id={row.IdUser} />
        );
        return object;
      });
    } else {
      data = items.map((row) => {
        var object = {};
        object.photo = DriversImg(row.Image);
        object.driver = row.Name;
        object.country = DriversCountryFlag(row.Country);
        object.license = row.License;
        object.enroll = DriversEnrollCheckBox(this.props, row.IdUser);
        return object;
      });
    }

    return data;
  }

  render() {
    // const { idCompany } = this.state;
    this.props.enrolledExport.forEach(function (data) {
      if (data.MRO === "01/01/0001") {
        data.MRO = null;
      }
    });

    const enrolledDriversData = this.mapDriversForDataTable(
      this.props.driversE,
      true
    );
    /*const notEnrolledDriversData = this.mapDriversForDataTable(
      this.props.driversNE,
      false
    );*/

    const enrolledfilteredDrivers = enrolledDriversData.filter((item) =>
      item.driver
        .toLowerCase()
        .includes(this.state.filteredTextDriversEnrolled.toLowerCase())
    );

    /*const notEnrolledFilteredDrivers = notEnrolledDriversData.filter((item) =>
      item.driver
        .toLowerCase()
        .includes(this.state.filteredTextDriversNotEnrolled.toLowerCase())
    );*/
    return (
      <div>
        <Row>
          <Col className="colDT">
            {/* <CardBody> */}
            <div id="activeItemsContainer2">
              <Row>
                <Col md="10" >
                  <Filter
                    state={this.state}
                    data={enrolledDriversData}
                    onFilter={(value) => {
                      this.setState({ filteredTextDriversEnrolled: value });
                    }}
                  />
                </Col>
                <Col  md=".5">
                  <AddDriverDrugTest
                    handleSubmit={this.props.addNewDriver}
                    getCountries={this.props.getCountries}
                    isLoading={this.props.isLoading}
                    error={this.props.error}
                    toggle={this.props.toggle}
                    modal={this.props.modal}
                    countries={this.props.countries}
                    getDriversE={this.props.getDriversE}
                    from={"DOT"}
                  />
                </Col>
                <Col className="colExportDrivers" md=".5">
                  {/* <FormGroup> */}
                    <ExcelFile
                      element={
                        <Button
                          id="export"
                          color="primary"
                          style={{lineHeight: 1,}}
                          className="fa fa-file-text-o btn btn-primary text-white options-drugs"
                        />
                      }
                    >
                      <ExcelSheet
                        data={this.props.driversE}
                        name={
                          this.state.checked === true
                            ? "Enrolled Drivers"
                            : "Inactive Drivers"
                        }
                      >
                        <ExcelColumn label="Driver's Name" value="Name" />
                        <ExcelColumn label="MRO Verified Date" value="MRO" />
                        <ExcelColumn label="Test Type" value="Type" />
                        <ExcelColumn label="Reason for Test" value="Reason" />
                        <ExcelColumn label="Result" value="Result" />
                        <ExcelColumn label="Specimen ID" value="Specimen" />
                        <ExcelColumn label="HiringDate" value="HiringDate" />
                      </ExcelSheet>
                    </ExcelFile>
                    <UncontrolledTooltip placement="bottom" target="export">
                      Export Enrolled Drivers
                    </UncontrolledTooltip>
                  {/* </FormGroup> */}
                </Col>
              </Row>
              {/** <Col style={{ paddingRight: "0px" }}>
              <Switch
                uncheckedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 12,
                      color: "#FFF",
                      paddingRight: 10,
                      width: "1px",
                    }}
                  >
                    Inactive
                  </div>
                }
                checkedIcon={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      fontSize: 12,
                      color: "#FFF",
                      paddingLeft: 10,
                      width: "69px",
                    }}
                  >
                    Active
                  </div>
                }
                onChange={this.handleChange}
                checked={this.state.checked}
                onColor="#86d3ff"
                onHandleColor="#20a8d8"
                handleDiameter={20}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                height={30}
                width={100}
                className="react-switch"
              />
            </Col>*/}
              <DataTable
                responsive={true}
                pagination
                columns={enrolledDriversColumns}
                data={enrolledfilteredDrivers}
              />
            </div>
            {/**
               * <div id="inactiveItemsContainer2" style={{ display: "none" }}>
                <Filter
                  state={this.state}
                  data={notEnrolledDriversData}
                  onFilter={(value) => {
                    this.setState({ filteredTextDriversNotEnrolled: value });
                  }}
                />
                <DataTable
                  responsive={true}
                  pagination
                  columns={notEnrolledDriversColumns}
                  data={notEnrolledFilteredDrivers}
                />
                <Confirmation
                  modal={this.props.modalCF}
                  toggleC={() => {
                    this.props.toggleCF();
                  }}
                />
              </div>
               */}
            {/* </CardBody> */}
          </Col>
          <Col className="colUploadDT">
            <UploadDrugTest />
          </Col>
        </Row>
        <AlertDelete
          message="Are you sure to remove this driver?"
          modalType="Remove"
          modal={this.props.modalDeleteDA}
          toggle={() => {
            this.props.toggleD1(this.props.idDelete1);
          }}
          delete={() => {
            this.props.updateDOTDrivers(
              this.props.idDelete1,
              false,
              this.props.getDOTDrivers,
              "ACTIVE"
            );
          }}
          deleteInactivate= {() => {this.props.updateDOTDrivers(
            this.props.idDelete1,
            false,
            this.props.getDOTDrivers,
            "INACTIVE"
          );}}
        />
      </div>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(DriverTest);
