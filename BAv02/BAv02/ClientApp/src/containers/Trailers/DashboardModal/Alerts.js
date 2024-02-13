import React from "react";
import { Modal, ModalHeader, ModalBody, FormGroup, Col } from "reactstrap";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../../store/Trailers";
import ListAlerts from "../../../components/Alerts";

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
          isOpen={this.props.modalA}
          className={"modal-md"}
          toggle={this.onClose}
          backdrop={"static"}
        >
          <ModalHeader name="modalA" toggle={this.onClose}>
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
  (state) => state.trailers,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Alert);
