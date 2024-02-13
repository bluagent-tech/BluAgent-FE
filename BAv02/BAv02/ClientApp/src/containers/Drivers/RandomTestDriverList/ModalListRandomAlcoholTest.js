import React, { Component } from 'react';
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
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './../../../store/DrugAndAlcoholTesting';
import PdfRS from "../../../containers/Test/pdf/PdfRS";

import DrugTestRandom from './DrugTestRandom';
const idCompany = JSON.parse(localStorage.getItem('idCompany'));

class ModalListRandomAlcoholTest extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false,
      activeTab: new Array(2).fill('1'),
      isLoading: false,
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

  quarterValidation(q){
    var date = new Date();
    var month = date.getMonth()+1;
    if(q === '1' && (month>=1 && month <=3)){
        return false;
    }else if(q === '2' && (month>=4 && month <=6)){
        return false;
    }else if(q === '3' && (month>=7 && month <=9)){
        return false;
    }else if(q === '4' && (month>=10 && month <=12)){
        return false;
    }else{
        return true;
    }
}

  createDriversRandomList(q) {
    this.setState({ open: !this.state.open });
    var form = new FormData();
    form.append('q', q);
    form.append('idCompany', idCompany);
    this.props.generateRandomAlcoholTest(form);
  }

  render() {
    return (
      <div>
        <Button
          disabled={this.quarterValidation(this.props.quarter)}
          id="viewList"
          style={{ width: "-webkit-fill-available" }}
          type="submit"
          color="primary"
          className="btn-fluid buttons-royal text-white pt-1"
          onClick={() => this.createDriversRandomList(this.props.quarter)}
        >
          {this.props.porcent !== 0 ? "View Selections" : "Start Random"}
        </Button>
        <Modal
          isOpen={this.state.open}
          className={"modal-lg"}
          backdrop={"static"}
          toggle={this.toggle}
        >
          <ModalHeader name="modal1" toggle={this.toggle}>
            Alcohol Random Testing Quarter {this.props.quarter} Selections
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
                        Alcohol TEST
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink
                        active={this.state.activeTab[0] === '2'}
                        onClick={() => {
                          this.tabs(0, '2');
                        }}
                      >
                        ALCOHOL TEST
                      </NavLink>
                    </NavItem> */}
                  </Nav>
                  <TabContent activeTab={this.state.activeTab[0]}>
                    <TabPane tabId="1">
                      <DrugTestRandom
                        randomDrivers={this.props.driversRandomList}
                      />
                    </TabPane>
                    <TabPane tabId="2"></TabPane>
                  </TabContent>
                </Fade>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <PdfRS
              percent={this.props.porcent}
              countListDriverCompany={this.props.countListDriverCompany}
              className="pt-1"
              quarter={this.props.quarter}
              index={"pdf" + this.props.quarter}
              randomDrivers={this.props.driversRandomList}
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
)(ModalListRandomAlcoholTest);
