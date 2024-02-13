import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from 'reactstrap';
import ListAlerts from '../../../components/Alerts';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      open: false,
    };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  toggle1(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    return (
      <div className="mt-1">
        <Row>
          <Col>
            <Modal
              isOpen={this.state.open}
              className={"modal-lg"}
              toggle={this.toggle}
              backdrop={"static"}
            >
              <ModalHeader name="modal1" toggle={this.toggle}>
                NOTIFICATIONS
              </ModalHeader>
              <ModalBody>
                <ListAlerts options={this.props.alerts} name="Alert" />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
          </Col>
          <Col className="text-right mobile-small">
            <Button
              className="text-white text-uppercase"
              type="submit"
              onClick={this.toggle}
              color={this.props.count > 0 ? "warning" : "success"}
              disabled={this.props.count > 0 ? false : true}
            >
              {" "}
              Needs Work
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Notifications;
