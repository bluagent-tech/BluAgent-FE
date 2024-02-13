import React, { Component } from 'react';
import {
    FormGroup,
    Col,
    Alert,
    Form,
    Label,
    Button,
} from 'reactstrap';
import { Collapse } from "react-collapse";
import AlertDelete from '../../components/AlertDelete';
import DataTable from 'react-data-table-component';
import { FilePond, registerPlugin } from "react-filepond";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/Maintenance";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import 'filepond/dist/filepond.min.css';
import DropdownMenu from '../../components/DropdownMenu';
// import '../../assets/css/BIC.css';
const userId = JSON.parse(localStorage.getItem("user")).Id;
const idCompany = localStorage["idCompany"];

registerPlugin(FilePondPluginFileValidateType);

const OptionMenu = ({ reduxProps, id, DocName }) => {
    return (
        <div className='text-center'>
            <DropdownMenu
                direction='right'
                itemID={id}
                idCompany={idCompany}
                DocName={DocName}
                menuOptions={[
                    ["Download BIC", "downloadBIC"],
                    [
                        'Delete',
                        () => {
                            reduxProps.toggleDeleteBIC(id);
                        },
                    ],
                ]}
            />
        </div>
    );
};



class BrakeInspectorCertificate extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            open: false,
            countFiles: [],
            allFiles: [],
            currentFiles: [],
            currentPage: null,
            totalPages: null,
            fileDeleted: false,
            alertToggle: true,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAlertToggle = this.onAlertToggle.bind(this);
    }


    onAlertToggle() {
        this.setState({ alertToggle: !this.state.alertToggle });
    }

    componentDidMount() {
        this.props.getDocsBic(idCompany);
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = new FormData(e.target);
        let files = this.pond.getFiles();
        let timeout = 3500;
        document.getElementById("loadingBIC").style = "display:block";
        document.getElementById("warningAlert").style = "display:none";
        files.forEach((file) => {
            form.append("files", file.file);
        });
        form.append("idCompany", idCompany);
        form.append("docType", this.props.docType);
        this.props.uploadBrakeInspectorCertificate(form);

        setTimeout(() => {
            document.getElementById("loadingBIC").style = "display:none";
        }, timeout);

        document.getElementById("Certificate").value = "";
        document.getElementById("MechanicName").value = null;
    }

    mapBrakeInspectionCertificateForDataTable(items) {
        let data = null;
        if (items !== null) {
            data = items.map((row) => {
                let BIC = {};
                BIC.id = row.Id;
                BIC.DescriptionDoc = row.DescriptionDoc;
                BIC.Certificate = row.Certificate;
                BIC.MechanicName = row.MechanicName;
                BIC.OPTIONS = (
                    <OptionMenu reduxProps={this.props} id={row.Id} DocName={row.DocName} />
                );
                return BIC;
            });
        }
        return data;
    }


    render() {
        const columns = [
            {
                name: 'FILE NAME',
                selector: 'DescriptionDoc',
                center: true,
            },
            {
                name: 'CERTIFICATE',
                selector: 'Certificate',
                center: true,
                sortable: true,
            },
            {
                name: 'MECHANIC NAME',
                selector: 'MechanicName',
                center: true,
                sortable: true,
            },
            {
                name: 'OPTIONS',
                selector: 'OPTIONS',
                center: true,
                grow: 0,
            },
        ];

        var Datosparatabla = null;
        this.props.docsBIC !== null ? Datosparatabla = this.mapBrakeInspectionCertificateForDataTable(this.props.docsBIC) : Datosparatabla = null;

        return (
            <React.Fragment>
                <Alert
                    className="Alert"
                    id="aaa"
                    isOpen={this.state.alertToggle}
                    toggle={() => this.onAlertToggle()}
                    style={{
                        backgroundColor: "#dff0fe",
                        borderLeft: "4px solid #dff0fe",
                        borderColor: "#4788c7",
                        color: "#4788c7",
                        padding: "15px 20px",
                    }}
                >
                    Notice: <i className="fas fa-exclamation-circle"></i>{" "}
                    Please Upload Required Inspector Certificates{" "}
                </Alert>

                <Form onSubmit={this.handleSubmit} id="FormBIC">
                    <FormGroup row>
                        <Col>
                            <Label htmlFor="text-input">File Upload</Label>
                            <FilePond
                                ref={(ref) => (this.pond = ref)}
                                allowFileTypeValidation={false}
                                allowRevert={true}
                                instantUpload={false}
                                allowMultiple={false}
                                maxFiles={100}
                                maxParallelUploads={100}
                                id="FilePond"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="6">
                            <Label htmlFor="Certificate">Certificate</Label>
                            <select
                                id="Certificate"
                                className="form-control"
                                name="Certificate"
                                onChange={this.onChange}
                                required
                            >
                                <option value="" selected disabled>SELECT</option>
                                <option value="GENERAL INSPECTOR">GENERAL INSPECTOR</option>
                                <option value="BRAKE INSPECTOR">BRAKE INSPECTOR</option>
                            </select>
                        </Col>
                        <Col md="6">
                            <Label>Mechanic Name</Label>
                            <input
                                style={{ height: "38px" }}
                                type="text"
                                id="MechanicName"
                                className="form-control"
                                maxLength="20"
                                name="MechanicName"
                                required
                            />
                        </Col>
                    </FormGroup>
                    <br />
                    <FormGroup row>
                        <Col md="6">
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Save Files
                            </button>
                            {"  "}
                        </Col>
                        <Col md="12" style={{ textAlign: "center" }}>
                            <Alert
                                id="warningAlert"
                                color="warning"
                                style={{ display: "none" }}
                            >
                                No file has been added for upload
                            </Alert>

                            <img
                                id="loadingBIC"
                                className="imgLoading"
                                style={{
                                    display: "none",
                                }}
                                src="../../assets/img/icons/loading2.gif"
                                alt="loadingBIC"
                            />
                        </Col>
                    </FormGroup>
                </Form>
                <DataTable
                    responsive={true}
                    pagination
                    columns={columns}
                    data={Datosparatabla}
                />
                <AlertDelete
                    modalType={'Delete'}
                    message={'Are you sure you want to delete this brake inspector certificate?'}
                    modal={this.props.modalDeleteBIC}
                    toggle={() => {
                        this.props.toggleDeleteBIC(this.props.idDeleteBIC);
                    }}
                    delete={() => {
                        this.props.deleteBIC(this.props.idDeleteBIC, idCompany);
                    }}
                />
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => state.maintenance,
    (dispatch) => bindActionCreators(actionCreators, dispatch)
)(BrakeInspectorCertificate);