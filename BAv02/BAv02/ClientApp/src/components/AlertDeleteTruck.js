import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import CustomDatePicker from "./DatePicker";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Swal from "sweetalert2";
const idCompany = localStorage["idCompany"];
const id = JSON.parse(localStorage.getItem('user')).Id;
import axios from "axios";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Maintenance';

class AlertDeleteTruck extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
    this.restore = this.restore.bind(this);
    this.postFiles = this.postFiles.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      valueSelect: 'SELECT',
      date: null,
      files: [],
    };
    this.onDrop = (files) => {
      this.setState({ files })
    };
  }

  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  handleSelect(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.setState({ valueSelect: event.target.value });
    if (value === 'SOLD') {
      document.getElementById("uploadSold").style = "display:block";
    } else {
      document.getElementById("uploadSold").style = "display:none";
    }
  }

  handleDatePicker = (e) => {
    this.setState({ date: e })
  }

  delete() {
    console.log("Delete");
    var form = new FormData(document.getElementById("formDeleteTruck"));
    form.append("id", this.props.idV);
    form.append("idu", this.props.id);
    this.props.inactivateTruck(form);
    this.setState({
      files: [],
      valueSelect: 'SELECT',
      date: null,
    });
  }

  deleteSold() {
    console.log("DeleteSold");
    this.handleSubmit();
    this.setState({
      files: [],
      valueSelect: 'SELECT',
      date: null,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Validating...",
      html: "Our Support Team Is Validating Your Attachment <br/>(Bill Of Sale). <br/><br/>When It Is Validated, Your Vehicle Will Be Deactivated"
    });
  }


  restore() {
    this.props.activateTruck(
      this.props.idV, id
    );
  }

  toggle() {
    this.props.toggleD1(this.props.idV, 'Deactivate');
    this.setState({
      files: [],
      valueSelect: 'SELECT',
      date: null,
    });
  }

  async handleSubmit() {
  var form = new FormData();
  let files = this.pond.getFiles();
  files.forEach((file) => {
    form.append("files", file.file);
  });
  form.append("id", this.props.idV);
  form.append("idCompany", idCompany);
  
  await this.postFiles(form); 
  
  var formEmail = new FormData();
  formEmail.append("idUser", id);
  formEmail.append("idCompany", idCompany);
  formEmail.append("idTruck", this.props.idV);
  formEmail.append("DeactivationReason", document.getElementById("DeactivationReason").value);
  formEmail.append("DeactivationDate", document.getElementById("DeactivationDate").value);
  await this.props.emailArchivedTruck(formEmail); 

    this.setState({
      files: [], 
      valueSelect: 'SELECT',
      date: null,
    });
}


postFiles = (form) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/Maintenance/postFiles', form)
      .then((response) => {
        const r = JSON.parse(response.data);
        if (r.status === 0) {
          console.log("Guardado con éxito");
          resolve(); 
        } else {
          console.log("Guardado sin éxito");
          reject(); 
        }
      })
      .catch(error => {
        console.log(error);
        reject(); 
      });
  });
}


  render() {
    var body;
    var Color = "danger ";
    var modalHeader = "Delete";
    if (this.props.modalType === "restore") {
      Color = "primary ";
      modalHeader = "Restore";
    } else if (this.props.modalType === "Deactivate") {
      if (this.props.modalHeader === undefined) {
        modalHeader = this.props.modalType;
      } else {
        modalHeader = "Yes";
      }
    } else if (this.props.modalType === "Remove") {
      modalHeader = "Remove";
      Color = "danger ";
    }

    var message = [
      "Are you sure you want to Deactivate this vehicle?",
      "Please Select The Reasons For Deactivation",
    ];
    if (this.props.modalType === 'restore') {
      message = ['Are you sure you want to restore this vehicle?'];
    }

    if (message.length > 0) {
      body =
        <div>
          {message[0]}
          <br />
          {message[1]}
        </div>;
    } else {
      body =
        <div>
          {message[0]}
        </div>;
    }
    return (
      <Modal isOpen={this.props.modal} className={"modal-" + Color}>
        <ModalHeader toggle={this.props.toggle}>
          {this.props.modalHeader === undefined
            ? modalHeader
            : this.props.modalHeader}
        </ModalHeader>
        <ModalBody>
          <div>{body}</div>
          {this.props.modalType == "Deactivate" ?
            <div>
              <Form id="formDeleteTruck">
                <br />
                <Row form>
                  <Col md="6">
                    <Label for="DeactivationReason">Reasons For Deactivation</Label>
                    <Input type="select" name="DeactivationReason" id="DeactivationReason" onChange={this.handleSelect} value={this.state.valueSelect}>
                      <option disabled>SELECT</option>
                      <option>SOLD</option>
                      <option>IN MAINTENANCE</option>
                      <option>LEASED</option>
                    </Input>
                  </Col>
                  <Col md="6">
                    <CustomDatePicker
                      id="DeactivationDate"
                      name="DeactivationDate"
                      required={true}
                      labelText={"Date"}
                      withLabel={true}
                      handleDatePicker={this.handleDatePicker}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="12">
                    <div id="uploadSold" style={{ display: "none" }}>
                      <FilePond
                        labelIdle='Please attach your Bill Of Sale to continue <span class="filepond--label-action"> Browse </span>'
                        ref={ref => (this.pond = ref)}
                        files={this.state.files}
                        allowMultiple={false}
                        allowReorder={true}
                        maxFiles={1}
                        instantUpload={false}
                        name="files"
                        oninit={() => this.handleInit()}
                        onupdatefiles={(countFiles) => {
                          this.setState({
                            countFiles: countFiles.length,
                            files: countFiles.map(fileItem => fileItem.file)
                          });
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Form>
            </div> : ""
          }
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={
              this.state.valueSelect != "SOLD" ?
                false :
                this.state.files.length > 0 ?
                  false :
                  true
            }
            color={Color}
            onClick={() => {
              modalHeader === "Restore" ?
                this.restore() :
                this.state.valueSelect === "SOLD" ?
                  this.deleteSold() :
                  this.delete()
            }}
          >{" "}
            {this.props.modalHeader === undefined
              ? modalHeader + " It"
              : modalHeader}
          </Button>{" "}
          <Button color="secondary" onClick={() => {
            this.toggle();
          }}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default connect(
  (state) => state.maintenance,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(AlertDeleteTruck);