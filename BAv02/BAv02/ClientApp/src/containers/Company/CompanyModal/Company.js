import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
class Company extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      activeTab: new Array(4).fill("1"),
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: "Closed",
      fadeIn: true,
      timeout: 300,
      open: false,
    };
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state,
    });
  }

  toggle1(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  render() {
    var names = [
      "Company Information",
      "Contact Information",
      "Cargo",
      "Vehicle & Driver Information",
      "MCS-150/B",
    ];
    let optionItems;

    if (this.props.incomplete !== undefined) {
      optionItems = this.props.incomplete.map((f, index) =>
        f === 0 ? (
          <button
            className={"list-group-item list-group-item-danger"}
            key={index}
          >
            {names[index]}
          </button>
        ) : null
      );
    }

    return (
      <div>
        <Row>
          <Col className="text-right">
            <Button
              type="submit"
              onClick={this.toggle}
              // color="danger"
              size="sm"
              color={
                this.props.count <= 50
                  ? "danger"
                  : this.props.count > 50 && this.props.count <= 99
                  ? "warning"
                  : "success"
              }
              disabled={this.props.count < 100 ? false : true}
              className="text-white text-uppercase"
            >
              {" "}
              view details
            </Button>
            <Modal
              size="lg"
              isOpen={this.state.open}
              className={"modal-md"}
              toggle={this.toggle}
              backdrop={"static"}
            >
              <ModalHeader name="modal1" toggle={this.toggle}>
                COMPANY FITNESS
              </ModalHeader>
              <ModalBody>
                <div name="FitnessList" className="list-group">
                  {optionItems}
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Company;
