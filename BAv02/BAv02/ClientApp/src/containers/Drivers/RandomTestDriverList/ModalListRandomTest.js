import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Fade,
  Col,
  Row,
  TabContent,
  UncontrolledTooltip,
  TabPane,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "./../../../store/DrugAndAlcoholTesting";
import PdfRS from "../../../containers/Test/pdf/PdfRS";
import axios from "axios";
import DrugTestRandom from "./DrugTestRandom";
import LogsRandom from "./LogsRandom";

let Files = {
  data: [],
};

const idCompany = JSON.parse(localStorage.getItem("idCompany"));
var idu = JSON.parse(localStorage.getItem("user")).Id;
var dateYear = new Date().getFullYear();
var validateRandom;
class ModalListRandomTest extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
      activeTab: new Array(2).fill("1"),
      isLoading: false,
      allFiles: [],
    };
    this.tabs = this.tabs.bind(this);
    this.createDriversRandomList = this.createDriversRandomList.bind(this);
    this.quarterValidation = this.quarterValidation.bind(this);
  }

  toggle() {
    this.setState({ open: !this.state.open });
  }

  tabs(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({ activeTab: newArray });
  }

  quarterValidation(q) {
    var date = new Date();
    var month = date.getMonth() + 1;
    if (q === "1" && month >= 1 && month <= 3) {
      return false;
    } else if (q === "2" && month >= 4 && month <= 6) {
      return false;
    } else if (q === "3" && month >= 7 && month <= 9) {
      return false;
    } else if (q === "4" && month >= 10 && month <= 12) {
      return false;
    } else {
      return true;
    }
  }

  componentDidMount() {
    this.props.getDOTDrivers(idu, 1, 1, 1000);
    // this.props.getDOTDrivers(idCompany);
  }

  // componentWillReceiveProps() {
  //   Files.data = this.props.DOTDrivers;
  //   const { data: allFiles = [] } = Files;
  //   this.setState({ allFiles });
  //   console.log("datos dentro del will receive props: ", this.state.allFiles);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // this.props.getDOTDrivers(idu, 1, 1, 1000);
  //   console.log("prevprops: ", prevProps.DOTDrivers, this.props.DOTDrivers);
  //   if (prevProps.DOTDrivers !== this.props.DOTDrivers) {
  //     Files.data = this.props.DOTDrivers;
  //     const { data: allFiles = [] } = Files;
  //     this.setState({ allFiles });
  //     console.log("datos dentro del update: ", this.state.allFiles);
  //   }
  // }

  createDriversRandomList(q) {
    this.setState({ open: !this.state.open });
    var form = new FormData();
    form.append("q", q);
    form.append("idCompany", idCompany);
    form.append("percentage", 60);
    form.append("year", this.props.isYear);
    let callback = () => {
      //this.props.sendEmail(form)
      this.props.getStats();
    };
    if (this.props.type === "drug") {
      this.props.remainingDrivers !== 0 || this.props.completedDrivers !== 0
        ? (this.props.generateRandomTest(form, callback), this.props.validateRandom(0))
        : axios
            .get(
              "/api/DrugAndAlcoholTesting/validateRandom?idCompany=" +
                idCompany +
                "&year=" +
                this.props.isYear
            )
            .then((response) => {
              var validation = JSON.parse(response.data);

              if (validation.status == 0) {
                this.props.generateRandomTest(form, callback);
                this.props.validateRandom(validation.status);
              } else {
                this.props.validateRandom(validation.status);
              }
            })
            .catch((err) => {
              console.log(err);
            });
    } else { this.props.remainingDrivers !== 0 || this.props.completedDrivers !== 0
      ? (this.props.generateRandomAlcoholTest(form, callback), this.props.validateRandom(0))
      : 
      (axios
        .get(
          "/api/DrugAndAlcoholTesting/validateRandomAlcohol?idCompany=" +
            idCompany +
            "&year=" +
            this.props.isYear
        )
        .then((response) => {
          var validation = JSON.parse(response.data);

          if (validation.status == 0) {
            this.props.generateRandomAlcoholTest(form, callback);
            this.props.validateRandom(validation.status);
          } else {
            this.props.validateRandom(validation.status);
          }
        })
        .catch((err) => {
          console.log(err);
        }))
    }
  }

  render() {
    return (
      <div>
        <Button
          disabled={
            (this.quarterValidation(this.props.quarter) &&
              this.props.complete != "Completed") ||
            (this.quarterValidation(this.props.quarter) &&
              this.props.remainingDrivers === 0 &&
              this.props.completedDrivers === 0) ||
            (this.quarterValidation(this.props.quarter) === false &&
              this.props.remainingDrivers === 0 &&
              this.props.completedDrivers === 0 &&
              this.props.isYear !== dateYear)
          }
          id="viewList"
          style={{ width: "-webkit-fill-available" }}
          type="submit"
          color="primary"
          className="btn-fluid buttons-royal text-white pt-1"
          onClick={() => this.createDriversRandomList(this.props.quarter)}
        >
          {this.props.porcent !== 0 ? "View Selections" : "Start Random"}
        </Button>
        <UncontrolledTooltip placement="bottom" target="viewList">
          See list of selected drivers
        </UncontrolledTooltip>
        <Modal
          isOpen={this.state.open}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.toggle}
        >
          <ModalHeader name="modal1" toggle={this.toggle}>
            {this.props.type === "alcohol" ? "Alcohol" : "Drug"} Random Testing
            Quarter {this.props.quarter} Selections
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab[0] === "1"}
                        onClick={() => {
                          this.tabs(0, "1");
                        }}
                      >
                        {this.props.type === "alcohol" ? "ALCOHOL" : "DRUG"}{" "}
                        TEST
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab[0] === "2"}
                        onClick={() => {
                          this.tabs(0, "2");
                        }}
                      >
                        RANDOM LOGS
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab[0]}>
                    <TabPane tabId="1">
                      {this.props.isLoadingRandom == false ? (
                        <DrugTestRandom
                          randomDrivers={this.props.driversRandomList}
                          complete={this.props.complete}
                          type={this.props.type}
                        />
                      ) : (
                        <div>Not need More Selections</div>
                      )}
                    </TabPane>
                    <TabPane tabId="2">
                      <LogsRandom logsRandom={this.props.logsRandom} />
                    </TabPane>
                  </TabContent>
                </Fade>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <PdfRS
              getdot={this.props.getDOTDrivers}
              iduser={idu}
              percent={this.props.porcent}
              // countListDriverCompany={this.props.countListDriverCompany}
              countListDriverCompany={this.props.DOTDrivers}
              className="pt-1"
              quarter={this.props.quarter}
              index={"pdf" + this.props.quarter}
              randomDrivers={this.props.driversRandomList}
              type={this.props.type}
            ></PdfRS>
            <Button
              className="px-5 buttons-royal text-white"
              onClick={this.toggle}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (state) => state.drugAndAlcoholTesting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(ModalListRandomTest);
