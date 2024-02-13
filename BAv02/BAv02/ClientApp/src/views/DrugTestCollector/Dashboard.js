import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/DrugAndAlcoholTesting";
import { Card, CardBody, Col, Row, FormGroup, Badge } from "reactstrap";
import Head from "./Head";
import FileUpload from "../../containers/DrugTestCollector/FileUploadDrugTestCollector";
import DataTable from "react-data-table-component";
import dateConvert from "../../services/dateConvertTables";
import styled from "styled-components";
import "../../components/Styles/DataTable.css";
import DropdownMenu from "../../components/DropdownMenu";
import ToastAlert from "../../components/ToastAlert";
// const id = JSON.parse(localStorage.getItem("user")).Id;

const TextField = styled.input`
  height: 32px;
  width: 300px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const Filter = ({ onFilter }) => {
  return (
    <React.Fragment>
      <FormGroup style={{ marginBottom: "0px" }} row>
        <Col md="3">
          <TextField
            id="search"
            type="search"
            role="search"
            placeholder="Search Donor"
            onChange={(e) => onFilter(e.target.value)}
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  );
};

const requesterData = (companyName, DER) => {
  return (
    <div className="align-center" style={{ textAlign: "center" }}>
      <p style={{ fontWeight: "bold", marginBottom: "auto" }}>{companyName}</p>
      <p style={{ margin: "0", fontSize: "8pt" }}>{DER}</p>
    </div>
  );
};
const testDateData = (date, dateExpiration) => {
  return (
    <div className="align-center" style={{ textAlign: "center" }}>
      <p style={{ marginBottom: "auto" }}>{dateConvert(date)}</p>
      <p style={{ margin: "0", fontSize: "8pt", color: "red" }}>
        Expires On: {dateConvert(dateExpiration)}
      </p>
    </div>
  );
};

const OptionMenu = ({ schedule, reduxProps, isCollectionCompleted }) => {
  if (!isCollectionCompleted) {
    return (
      <div className="text-center">
        <DropdownMenu
          direction="right"
          menuOptions={[
            [
              "Details",
              () => {
                window.location.replace("/#/DrugTestDetails/" + schedule.Id);
              },
            ],
          ]}
        />
      </div>
    );
  } else {
    return (
      <div className="text-center">
        <DropdownMenu
          toggleDeleteModal={() => {
            window.location.replace("/#/DrugTestDetails/" + schedule.Id);
          }}
          direction="right"
          menuOptions={[
            ["Details", "This is a function"],
            [
              "Add Drug Test Results",
              () => {
                reduxProps.openCloseDrugTest(schedule.Id);
              },
            ],
          ]}
        />
      </div>
    );
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterTextDonors: "",
    };
  }

  componentDidMount() {
    const provider = "BluAgent";
    this.props.getProviderScheduledTests(provider);
  }

  mapDonorsForDataTable(items) {
    let data;
    data = items.map((row) => {
      var object = {};
      object.Id = row.Id;
      object.donor = row.Driver;
      object.type = row.Reason;
      object.testDate = testDateData(row.DateTimeTest, row.DateTimeExpiration);
      object.requester = requesterData(row.LegalName, row.Der);
      object.status = row.Status;
      object.result = row.Result;
      object.actions = (
        <OptionMenu
          schedule={row}
          reduxProps={this.props}
          isCollectionCompleted={
            row.Status === "Collection Completed" ? true : false
          }
        />
      );
      return object;
    });

    return data;
  }

  render() {
    const columns = [
      {
        name: "Donor",
        selector: "donor",
        sortable: true,
      },
      {
        name: "TYPE",
        selector: "type",
        center: true,
      },
      {
        name: "TEST DATE",
        selector: "testDate",
        center: true,
      },
      {
        name: "REQUESTER",
        selector: "requester",
        center: true,
      },
      {
        name: "STATUS",
        selector: "status",
        center: true,
        sortable: true,
        cell: (row) => (
          <Badge
            pill
            style={
              row.status === "Scheduled"
                ? {
                  backgroundColor: "#17a2b8",
                  color: "#ffffff",
                  fontSize: "9pt",
                }
                : row.status === "Collection Initiated"
                  ? {
                    backgroundColor: "#63c2de",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                  : row.status === "Collection Completed"
                    ? {
                      backgroundColor: "var(--royal-blue)",
                      color: "#ffffff",
                      fontSize: "9pt",
                    }
                    : row.status === "Draft"
                    ? {
                      backgroundColor: "#f5e74e",
                      color: "#ffffff",
                      fontSize: "9pt",
                    }
                    : {
                      backgroundColor: "#e93535",    
                      color: "#ffffff",
                      fontSize: "9pt",
                    }
            }
          >
            {row.status === 'Draft' ? "Ready to Schedule" : row.status}
          </Badge>
        ),
      },
      {
        name: "RESULT",
        selector: "result",
        center: true,
        sortable: true,
        cell: (row) => (
          <Badge
            pill
            style={
              row.result === "Pending"
                ? {
                  backgroundColor: "#17a2b8",
                  color: "#ffffff",
                  fontSize: "9pt",
                }
                : row.result === "Negative"
                  ? {
                    backgroundColor: "#28a745",
                    color: "#ffffff",
                    fontSize: "9pt",
                  }
                  : row.result === "Negative - Diluted"
                    ? {
                      backgroundColor: "#f0650e",
                      color: "#ffffff",
                      fontSize: "9pt",
                    }
                    : {
                      backgroundColor: "#dc3545",
                      color: "#ffffff",
                      fontSize: "9pt",
                    }
            }
          >
            {row.result}
          </Badge>
        ),
      },
      { name: "ACTIONS", selector: "actions", center: true },
    ];

    const donors = this.mapDonorsForDataTable(this.props.providerDrugTest);

    const filteredDonors = donors.filter((item) =>
      item.donor
        .toLowerCase()
        .includes(this.state.filterTextDonors.toLowerCase())
    );

    return (
      <React.Fragment>
        <div className="container-fluid" style={{ marginTop: "3%" }}>
          <div className="animated fadeIn">
            <Row>
              <Col sm="12">
                <Head />
              </Col>
              <Col sm="12">
                <Card style={{ height: "700px" }} className="text-center">
                  <CardBody>
                    <Filter
                      data={donors}
                      onFilter={(value) => {
                        this.setState({ filterTextDonors: value });
                      }}
                    />
                    <DataTable
                      responsive={true}
                      pagination
                      columns={columns}
                      data={filteredDonors}
                    />
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12">
                <FileUpload />
              </Col>
            </Row>
          </div>
          <ToastAlert
            toggleToast={this.props.toggleToastAlert}
            isOpen={this.props.toastAlertState}
            message={this.props.message}
            error={this.props.error}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Dashboard);
