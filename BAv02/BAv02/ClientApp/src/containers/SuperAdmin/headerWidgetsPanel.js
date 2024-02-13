import React, { Component, lazy } from "react";
import { Row } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/UserLog";
import axios from "axios";
import "./../../components/TutorialTab/style.css";

//import Notifications from "../../containers/Company/CompanyModal/Notifications";
const WidgetSimple = lazy(() => import("../../views/Widgets/WidgetSimple"));

//import { actionCreators } from "../../store/UserLog";

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      providers: [],
      collectionSites: [],
      collectors: [],
      superAdminUsers: [],
    };
  }

  componentDidMount() {
    this.props.getRoleData(
      this.props.id,
      JSON.parse(localStorage.getItem("user")).Id
    );
    this.GetAllCompaniesCount();
    this.GetAllProvidersCount();
    this.GetAllCollectionSitesCount();
    this.GetAllCollectorsCount();
    this.GetAllSuperAdminUsersCount();
  }

  GetAllCompaniesCount() {
    let url = "/api/CompanySuperAdmin/GetAllCompaniesCount";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          companies: response,
        });
      })
      .catch((error) => console.log(error));
  }

  GetAllProvidersCount() {
    let url = "/api/Provider/GetAllProvidersCount";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          providers: response,
        });
      })
      .catch((error) => console.log(error));
  }

  GetAllCollectionSitesCount() {
    let url = "/api/CollectionSite/GetAllCollectionSitesCount";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectionSites: response,
        });
      })
      .catch((error) => console.log(error));
  }

  GetAllCollectorsCount() {
    let url = "/api/Collector/GetAllCollectorsCount";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          collectors: response,
        });
      })
      .catch((error) => console.log(error));
  }

  GetAllSuperAdminUsersCount() {
    let url = "/api/UserLog/GetAllSuperAdminUsersCount";
    axios
      .get(url)
      .then((response) => response.data)
      .then((response) => {
        this.setState({
          superAdminUsers: response,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <Row xs="2" sm="3" lg="5">
        <WidgetSimple
          icon="fa fa-bank"
          header={this.state.companies.toString() + " Companies"}
        ></WidgetSimple>
        <WidgetSimple
          icon="fa fa-building"
          header={this.state.providers.toString() + " Providers"}
        ></WidgetSimple>
        <WidgetSimple
          icon="fa fa-hospital-o"
          header={this.state.collectionSites.toString() + " Collection Sites"}
        ></WidgetSimple>
        <WidgetSimple
          icon="fa fa-user-circle-o"
          header={this.state.collectors.toString() + " Collectors"}
        ></WidgetSimple>
        <WidgetSimple
          icon="fa fa-users"
          header={this.state.superAdminUsers.toString() + " Super Admin Users"}
        ></WidgetSimple>
      </Row>
    );
  }
}

export default connect(
  (state) => state.accountSettings,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Head);
