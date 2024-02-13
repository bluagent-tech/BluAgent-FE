import React from "react";
import { Modal, ModalHeader, ModalBody, FormGroup, Col } from "reactstrap";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/Drivers";
import ListAlerts from "../../../components/Alerts";

//DASHBOARD MODAL DRIVER ALERTS

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.toggleA();
  }

  render() {
    return (
      <div className="col-md-3">
        <Modal
          isOpen={this.props.modalDA}
          className={"modal-md "}
          toggle={this.onClose}
          backdrop={"static"}
        >
          <ModalHeader name="modalDA" toggle={this.onClose}>
            ALERTS
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="12">
                <ListAlerts options={this.props.alerts} name="Alert" />
              </Col>
            </FormGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

Alert.propTypes = {
  OnSubmit: PropTypes.func,
  toggle: PropTypes.func,
};

export default connect(
  (state) => state.drivers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Alert);
