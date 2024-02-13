import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

//DRIVER FITNESS MODAL

class DriverFitness extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.openclick = this.openclick.bind(this);
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

  openclick(name) {
    if (name === "Pre-Employment") {
      this.animacion(1);
    } else if (name === "Employment Application") {
      this.animacion(2);
    }
    // else if (name === "Letter of Inquiry") {
    //   this.animacion(3);
    // } 
    else if (name === "Employment History") {
      this.animacion(3);
    } else if (name === "DMV Record") {
      this.animacion(4);
    } else if (name === "Road Test") {
      this.animacion(5);
    } else if (name === "Medical Certificate") {
      this.animacion(6);
    } else if (name === "Annual DMV Review") {
      this.animacion(7);
    } else if (name === "Certification of Violations") {
      this.animacion(8);
    } else if (name === "Clearing House") {
      this.animacion(9);
    }
  }

  animacion(id) {
    document.getElementsByClassName("col-md-3")[id].style.animationName =
      "resaltar";
    document.getElementsByClassName("col-md-3")[id].style.animationDuration =
      "9s";
    document.getElementsByClassName("col-md-3")[id].classList.add("resaltar");
    setTimeout(function () {
      document
        .getElementsByClassName("col-md-3")
      [id].classList.remove("resaltar");
      document.getElementsByClassName("col-md-3")[id].style.animationName = "";
      document.getElementsByClassName("col-md-3")[id].style.animationDuration =
        "";
    }, 5000);
    document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
    document.getElementById("1").click();
    this.setState({ open: !this.state.open });
    setTimeout(function () {
      window.scrollTo(0, 420);
    }, 500);
  }

  //      "Ok",
  //"Clearing House"
  render() {
    var names = [
      "Pre-Employment",
      "Employment Application",
      // "Letter of Inquiry",
      "Employment History",
      "DMV Record",
      "Clearing House",
      "Road Test",
      "Medical Certificate",
      "Review of DMV",
      "Certification of Violations",
    ];

    var optionItems = this.props.fitness.map((f, index) =>
      f === 1 ? (
        <button
          onClick={() => this.openclick(names[index])}
          className={"br-alerts list-group-item list-group-item-danger"}
          key={index}
        >
          {names[index]}
        </button>
      ) : (
        ""
      )
    );
    return (
      <div>
        <Button
          type="submit"
          onClick={this.toggle}
          size="md"
          style={{
            width: "92px",
            bColor: "#ffc107",
            color: "#fff",
            fontSize: "0.76563rem",
          }}
          color={this.props.bColor}
          disabled={this.props.statusR === "ACTIVE" ? false : true}
          className="btn-fluid"
        >
          {" "}
          View Details
        </Button>
        <Modal
          isOpen={this.state.open}
          className={"modal-md"}
          toggle={this.toggle}
          backdrop={"static"}
        >
          <ModalHeader name="modal1" toggle={this.toggle}>
            DRIVER FITNESS
          </ModalHeader>
          <ModalBody>
            <div name="FitnessList" className="list-group">
              {optionItems[0] === "" &&
                optionItems[1] === "" &&
                optionItems[2] === "" &&
                optionItems[3] === "" &&
                optionItems[4] === "" &&
                optionItems[5] === "" &&
                optionItems[6] === "" &&
                optionItems[7] === "" &&
                optionItems[8] === ""
                ? (
                  <div style={{ textAlign: "center" }}>
                    <img
                      alt="Check"
                      src="/assets/icons/icons8-checkmark.svg"
                      style={{ width: "50px" }}
                    />
                    <h4>You're All Caught Up!</h4>
                    <span style={{ fontSize: "15px", color: "#b2bec3" }}>
                      You've completed your driver qualification file!
                    </span>
                  </div>
                ) : (
                  optionItems
                )}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DriverFitness;
