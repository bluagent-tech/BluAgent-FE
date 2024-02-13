import React, { Component, lazy } from 'react';
import { Col, Row, Button, CardBody, Card, Alert } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Trailers';
import Alerts from './DashboardModal/Alerts';
import AlertDelete from "../../components/AlertDelete";

import FileUploadCompany from "../../containers/Company/CompanyModal/FileUploadCompany";
import FileUploadCompanyManual from "../../containers/Company/CompanyModal/FileUploadCompnanyManual";

import TrailersNotifications from './../../views/Widgets/TrailerNotifications';
const Widget05 = lazy(() => import('../../views/Widgets/Widget05'));
const userId = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = JSON.parse(localStorage.getItem("idCompany"));
//DASHBOARD HEAD WIDGET TRAILER
const id = JSON.parse(localStorage.getItem("user")).Id;

class Hazmat extends Component {
    constructor(props) {
        super(props);
        this.state = { Text: '' };
    }

    componentDidMount() {
        this.props.getAlerts(
            this.props.id,
            JSON.parse(localStorage.getItem('user')).Id
        );
        this.props.getAllDocuments(this.props.id, 'TRAILER', 1, 7);
    }

    render() {
        const { ReduxProps = {} } = this.props || {};
        return (
            <div className="animated fadeIn">
                <Row className="text-center">
                    <Col md="3">
                        <input
                            type="image"
                            onClick={() => { this.toggleInfo("2") }}
                            className="img-responsive"
                            //\assets\img\dashboard\back\home
                            src="/assets/icons/icons8-new-resume-template.svg"
                            //src="assets/img/dashboard/back/home/hazmat.png"
                            alt="Submit"
                            height="150"
                            width="150"
                        />
                        <h6>MANUFACTURER CERTIFICATE</h6>
                    </Col>
                    <Col md="3">
                        <input
                            ///*<AccidentRegister />*/
                            type="image"
                            onClick={() => { this.toggleInfo("2") }}
                            className="img-responsive"
                            src="/assets/icons/icons8-inspection.svg"
                            alt="Submit"
                            height="150"
                            width="150"
                        />
                        <h6>HAZMAT INSPECTIONS</h6>
                    </Col>
                    <Col md="3">
                        <input
                            type="image"
                            onClick={() => { this.toggleInfo("2") }}
                            className="img-responsive"
                            src="/assets/icons/icons8-inspection.svg"
                            alt="Submit"
                            height="150"
                            width="150"
                        />
                        <h6>RETEST</h6>
                    </Col>
                    {JSON.parse(localStorage.getItem("user")).Hazmat === true ? (
                        <Col md="3">
                            
                        </Col>
                    ) : (
                            ""
                        )}
                    <Col md="3">
                        
                    </Col>
                    <Col md="3">
                        
                    </Col>
                </Row>
                <AlertDelete
                    message="Are you sure you want to delete this file?"
                    modal={ReduxProps.modalDeleteFilesCompany}
                    toggle={() => {
                        ReduxProps.toggleDeleteFilesCompanyModal(
                            ReduxProps.idDelete,
                            ReduxProps.docTypeToDelete,
                            ReduxProps.fileNameToDelete
                        );
                    }}
                    delete={() => {
                        ReduxProps.deleteDoc(
                            ReduxProps.idDelete,
                            id,
                            ReduxProps.docTypeToDelete,
                            ReduxProps.fileNameToDelete
                        );
                    }}
                />
            </div>
        );
    }
}
export default connect(
    (state) => state.trailers,
    (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Hazmat);
