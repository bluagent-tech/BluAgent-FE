import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Col,
  Label,
  Fade,
  Input,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import DatePicker from "../../../components/DatePicker";

//ADD ANNUAL INSPECTION

class AddInspection extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill("1"),
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
      <div className="col-md-6">
        <Button type="button" onClick={this.toggle} color="primary">
          + ADD INSPECTION
        </Button>
        <Modal isOpen={this.state.open} className={"modal-lg "}>
          <ModalHeader name="modal1" toggle={this.toggle}>
            {" "}
          </ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md="6">
                <Input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Please enter your Equipment"
                />
              </Col>
              <Col md="6">
                <Button type="button" color="primary">
                  Search
                </Button>
              </Col>
            </FormGroup>
            <FormGroup row>
              <DatePicker id="date" name="date" labelText="Date" />
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">VIN</Label>
                <Input type="text" id="vin" name="vin" />
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">Vehicle Number</Label>
                <Input type="text" id="itype" name="itype" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Vehicle Type</Label>
                <Input type="text" id="type" name="type" />
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">Plate</Label>
                <Input type="text" id="plate" name="plate" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Inspection Type</Label>
                <Input type="select" id="itype" name="itype" />
              </Col>

              <Col md="6">
                <Label htmlFor="text-input">Inspector Name</Label>
                <Input type="text" id="iname" name="iname" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="text-input">Tire Size</Label>
                <Input type="text" id="tire" name="tire" />
              </Col>
              <Col md="6">
                <Label htmlFor="text-input">Tire VIN</Label>
                <Input type="text" id="tirev" name="tirev" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <label htmlFor="projectinput1">
                  This Inspector Meets The Qualification Requirements In Section
                  396.19
                </label>
                <p>
                  {" "}
                  <label>
                    Yes &nbsp;
                    <input id="Checkbox1" type="checkbox" />
                  </label>
                </p>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col xs="12">
                <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                  <Card>
                    <CardBody>
                      <Col>
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "1"}
                              onClick={() => {
                                this.toggle1(0, "1");
                              }}
                            >
                              BRAKES
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "2"}
                              onClick={() => {
                                this.toggle1(0, "2");
                              }}
                            >
                              MECHANICAL
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "3"}
                              onClick={() => {
                                this.toggle1(0, "3");
                              }}
                            >
                              ELECTRICAL
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "4"}
                              onClick={() => {
                                this.toggle1(0, "4");
                              }}
                            >
                              TIRES
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "5"}
                              onClick={() => {
                                this.toggle1(0, "5");
                              }}
                            >
                              BODYSHOP
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "6"}
                              onClick={() => {
                                this.toggle1(0, "6");
                              }}
                            >
                              SAFE
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              active={this.state.activeTab[0] === "7"}
                              onClick={() => {
                                this.toggle1(0, "7");
                              }}
                            >
                              HEATING
                            </NavLink>
                          </NavItem>
                        </Nav>
                        {/*1*/}
                        <TabContent activeTab={this.state.activeTab[0]}>
                          <TabPane tabId="1">
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  BRAKES SYSTEM
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Service Brakes
                                </Label>
                                <Input type="select" id="Bsa" name="Bsa" />

                                <Label htmlFor="text-input">
                                  Parking Brake System
                                </Label>
                                <Input type="select" id="bsb" name="Bsb" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Brake Drums or Rotors
                                </Label>
                                <Input type="select" id="bsc" name="Bsc" />

                                <Label htmlFor="text-input">Brake Hose</Label>
                                <Input type="select" id="Bsd" name="bsd" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">Brake Tubing</Label>
                                <Input type="select" id="Bse" name="Bse" />

                                <Label htmlFor="text-input">
                                  Low Pressure Warning Device
                                </Label>
                                <Input type="select" id="Bsf" name="Bsf" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Tractor Protection Valve
                                </Label>
                                <Input type="select" id="Bsg" name="Bsg" />

                                <Label htmlFor="text-input">
                                  Air Compressor
                                </Label>
                                <Input type="select" id="Bsh" name="Bsh" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Electric Brakes
                                </Label>
                                <Input type="select" id="Bsi" name="Bsi" />

                                <Label htmlFor="text-input">
                                  Hydraulic Brakes
                                </Label>
                                <Input type="select" id="Bsj" name="BsK" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Vacuum System
                                </Label>
                                <Input type="select" id="Bsk" name="Bsk" />
                              </Col>
                            </FormGroup>
                          </TabPane>
                          {/*2*/}
                          <TabPane tabId="2">
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  COUPLING DEVICE
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">Fifth Wheels</Label>
                                <Input type="select" id="Mca" name="Mca" />

                                <Label htmlFor="text-input">Pintle Hooks</Label>
                                <Input type="select" id="Mcb" name="Mcb" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Drawbar/Towbar Eye
                                </Label>
                                <Input type="select" id="Mcd" name="Mcd" />

                                <Label htmlFor="text-input">
                                  Drawbar/Towbar Tongue
                                </Label>
                                <Input type="select" id="Mce" name="Mse" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Safety Devices
                                </Label>
                                <Input type="select" id="Mcf" name="Mcf" />

                                <Label htmlFor="text-input">
                                  Saddle-Mounts
                                </Label>
                                <Input type="select" id="Mcg" name="Mcg" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  EXAHUST SYSTEM
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Any exhaust system determined to be leaking ot
                                  a point forward of or directly below the
                                  driver/sleeper compartment
                                </Label>
                                <Input type="select" id="Mea" name="Mea" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  A bus exhaust system leaking or discharging to
                                  the atmosphere in violation of standards
                                </Label>
                                <Input type="select" id="Meb" name="Meb" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  No part of the exhaust system of any motor
                                  vehicle shall be so located as would be likely
                                  to result in burning,charring, or damaging the
                                  electrical wiring,the fuel supply,or any
                                  combustible part of the motor vehicle
                                </Label>
                                <Input type="select" id="Mec" name="Mec" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  FUEL SYSTEM
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">Visible leak</Label>
                                <Input type="select" id="Mfa" name="Mfa" />

                                <Label htmlFor="text-input">
                                  Fuel tank filler cap missing
                                </Label>
                                <Input type="select" id="Mfb" name="Mfb" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Fuel tank securely attached
                                </Label>
                                <Input type="select" id="Mfc" name="Mfc" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  STEERING MECHANISM
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Steering wheel free play
                                </Label>
                                <Input type="select" id="Msa" name="Msa" />

                                <Label htmlFor="text-input">
                                  Steering column
                                </Label>
                                <Input type="select" id="Msb" name="Msb" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Steering system
                                </Label>
                                <Input type="select" id="Msc" name="Msc" />

                                <Label htmlFor="text-input">
                                  Steering gear box
                                </Label>
                                <Input type="select" id="Msd" name="Msd" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">Pitman Arm</Label>
                                <Input type="select" id="Mse" name="Mse" />

                                <Label htmlFor="text-input">
                                  Power Steering
                                </Label>
                                <Input type="select" id="Msf" name="Msf" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Ball and drag links
                                </Label>
                                <Input type="select" id="Msg" name="Msg" />

                                <Label htmlFor="text-input">
                                  Tie rods drag links
                                </Label>
                                <Input type="select" id="Msh" name="Msh" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">Nuts</Label>
                                <Input type="select" id="Msi" name="Msi" />

                                <Label htmlFor="text-input">
                                  Front axle beam and ALL steering components
                                  other than steering column
                                </Label>
                                <Input type="select" id="Msj" name="Msj" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  SUSPENSION
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Torque, radius, or tracking components
                                </Label>
                                <Input type="select" id="Msua" name="Msua" />

                                <Label htmlFor="text-input">
                                  Spring assembly
                                </Label>
                                <Input type="select" id="Msub" name="Msub" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Any U-bolt(s),spring hanger(s),or other axle
                                  positioning part(s) cracked, briken, loose or
                                  missing resulting in shifting of an axle from
                                  its normal position
                                </Label>
                                <Input type="select" id="Msuc" name="Msuc" />
                              </Col>
                            </FormGroup>
                          </TabPane>
                          {/*3*/}
                          <TabPane tabId="3">
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  LIGHTING DEVICES
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">Head-Stop</Label>
                                <Input type="select" id="Ela" name="Ela" />

                                <Label htmlFor="text-input">Tail-Dash</Label>
                                <Input type="select" id="Elb" name="Elb" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Turn Indications
                                </Label>
                                <Input type="select" id="Elc" name="Elc" />

                                <Label htmlFor="text-input">
                                  All light devices and reflectors required by
                                  Section 393 shall be operable
                                </Label>
                                <Input type="select" id="Eld" name="Eld" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  PARTS
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">Tachograph</Label>
                                <Input type="select" id="Epa" name="Epa" />

                                <Label htmlFor="text-input">Starter</Label>
                                <Input type="select" id="Epb" name="Epb" />
                              </Col>
                            </FormGroup>
                          </TabPane>
                          {/*4*/}
                          <TabPane tabId="4">
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  TIRES
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Tires on any steering axle of a power unit
                                </Label>
                                <Input type="select" id="Ta" name="Ta" />

                                <Label htmlFor="text-input">
                                  All other tires
                                </Label>
                                <Input type="select" id="Tb" name="Tb" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  WHEELS AND RIMS
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Locks or side ring
                                </Label>
                                <Input type="select" id="Twa" name="Twa" />

                                <Label htmlFor="text-input">
                                  Wheels and rims
                                </Label>
                                <Input type="select" id="Twb" name="Twb" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">Fasteners</Label>
                                <Input type="select" id="Twc" name="Twc" />

                                <Label htmlFor="text-input">Welds</Label>
                                <Input type="select" id="Twd" name="Twd" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  FRAME
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Frame Members
                                </Label>
                                <Input type="select" id="Tfa" name="Tfa" />

                                <Label htmlFor="text-input">
                                  Tire and wheels Clearance
                                </Label>
                                <Input type="select" id="Tfb" name="Tfb" />
                              </Col>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Adjustable axle assembling(Sliding subframes)
                                </Label>
                                <Input type="select" id="Tfc" name="Tfc" />
                              </Col>
                            </FormGroup>
                          </TabPane>
                          {/*5*/}
                          <TabPane tabId="5">
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  WINDSHIELD GLAZING
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Requirements and exceptions as stated
                                  pertaining to any crack,discoloration or
                                  vision reducing matter(reference 393.60 for
                                  exceptions)
                                </Label>
                                <Input type="select" id="Bga" name="Bga" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  WINDSHIELD WIPERS
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Any power unit that has an inoperative
                                  wiper,or missing or damaged parts that render
                                  it ineffective
                                </Label>
                                <Input type="select" id="Bwa" name="Bwa" />

                                <Label htmlFor="text-input">
                                  List any other condition which may prevent
                                  safe operation if this vehicle
                                </Label>
                                <Input type="select" id="Bwb" name="Bwb" />
                              </Col>
                            </FormGroup>
                          </TabPane>
                          {/*6*/}
                          <TabPane tabId="6">
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  SAFETY EQUIPMENT
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Fire Extinguisher
                                </Label>
                                <Input type="select" id="Sea" name="Sea" />

                                <Label htmlFor="text-input">
                                  Flags-Flares-Fuses
                                </Label>
                                <Input type="select" id="Seb" name="Seb" />
                              </Col>

                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Spare bulbs & fuses
                                </Label>
                                <Input type="select" id="Sec" name="Sec" />

                                <Label htmlFor="text-input">
                                  Spare seal beam
                                </Label>
                                <Input type="select" id="Sed" name="Sed" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  SAFETY LOADING
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Protection against shifting cargo
                                </Label>
                                <Input type="select" id="Sla" name="Sla" />

                                <Label htmlFor="text-input">
                                  Part(s) of vehicle or condition of loading
                                  such that the spare tire or any part of the
                                  load or dunnage can fall onto the roadway
                                </Label>
                                <Input type="select" id="Slb" name="Slb" />
                              </Col>
                            </FormGroup>
                          </TabPane>
                          {/*7*/}
                          <TabPane tabId="7">
                            <FormGroup row>
                              <Col md="6">
                                <Label
                                  htmlFor="text-input"
                                  className="text-primary"
                                >
                                  A/C HEATING
                                </Label>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">Leaks</Label>
                                <Input type="select" id="Ha" name="Ha" />

                                <Label htmlFor="text-input">
                                  Faulty gasket
                                </Label>
                                <Input type="select" id="Hb" name="Hb" />
                              </Col>

                              <Col md="6">
                                <Label htmlFor="text-input">Worn hose</Label>
                                <Input type="select" id="Hc" name="Hc" />

                                <Label htmlFor="text-input">Compressor</Label>
                                <Input type="select" id="Hd" name="Hd" />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Magnetic Clutch
                                </Label>
                                <Input type="select" id="He" name="He" />

                                <Label htmlFor="text-input">Refrigerant</Label>
                                <Input type="select" id="Hf" name="Hf" />
                              </Col>

                              <Col md="6">
                                <Label htmlFor="text-input">
                                  Flushing contaminated
                                </Label>
                                <Input type="select" id="Hg" name="Hg" />

                                <Label htmlFor="text-input">
                                  System recharging
                                </Label>
                                <Input type="select" id="Hh" name="Hh" />
                              </Col>
                            </FormGroup>
                          </TabPane>
                        </TabContent>
                      </Col>
                    </CardBody>
                  </Card>
                </Fade>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button outline color="primary" onClick={this.toggle}>
              Save
            </Button>{" "}
            <Button outline color="primary" onClick={this.toggle}>
              Cancel
            </Button>{" "}
            <Button outline color="success" onClick={this.toggleLarge}>
              View
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddInspection;
