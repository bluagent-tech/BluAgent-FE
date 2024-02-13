import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store/Maintenance";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.testingMethod2 = this.testingMethod2.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  testingMethod2() {
    this.props.toggleDeleteModal();
  }

  testingMethod3() {
    this.props.toggleWorkOrderModal();
  }

  render() {
    let menuOptions = this.props.menuOptions;
    let new_function = undefined;
    var rowItems = [];
    for (var index in menuOptions) {
      if (menuOptions[index][1] !== undefined) {
        if (menuOptions[index][1] === "downloadBIC") {
          rowItems.push(
            <DropdownItem
              key={this.props.itemID + index + 1}
              target="_blank"
              href={`https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.idCompany}/BrakeInspectorCertificate/${this.props.DocName}`}
              download
            >
              Download
            </DropdownItem>
          );
        } else if (menuOptions[index][1] === "This is a function") {
          rowItems.push(
            <DropdownItem
              disabled={this.props.itemsDisabled}
              onClick={() => {
                this.testingMethod2();
              }}
              key={this.props.itemID + index + 1}
              itemID={this.props.itemID}
            >
              {menuOptions[index][0]}
            </DropdownItem>
          );
        } else {
          if (menuOptions[index][1] === "This is a function2") {
            rowItems.push(
              <DropdownItem
                disabled={this.props.itemsDisabled}
                onClick={() => {
                  this.testingMethod3();
                }}
                key={this.props.itemID + index + 1}
                itemID={this.props.itemID}
              >
                {menuOptions[index][0]}
              </DropdownItem>
            );
          } else if (menuOptions[index][1] === "Download") {
            rowItems.push(
              <DropdownItem
                key={this.props.itemID + index + 1}
                target="_blank"
                href={`https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.idCompany}/MaintenanceFile/${this.props.idVehicleInspection}/${this.props.inspectionType}/${this.props.fileName}`}
                download
              >
                Download
              </DropdownItem>
            );
          } else if (menuOptions[index][1] === "Delete") {
            rowItems.push(
              <DropdownItem
                key={this.props.itemID + index + 1}
                onClick={() =>
                  this.props.toggleDeleteInspection(
                    this.props.itemID,
                    this.props.idVehicleInspection,
                    this.props.inspectionType
                  )
                }
              >
                Delete
              </DropdownItem>
            );
          } else if (menuOptions[index][1] === "DeleteTruck") {
            rowItems.push(
              <DropdownItem
                key={this.props.itemID + index + 1}
                onClick={() =>
                  this.props.toggleDeleteInspection(
                    this.props.itemID,
                    this.props.idVehicle,
                    this.props.inspectionType
                  )
                }
              >
                Delete
              </DropdownItem>
            );
          } else if (menuOptions[index][1] === "downloadResult") {
            if (this.props.fileName !== null) {
              rowItems.push(
                <DropdownItem
                  key={this.props.itemID + index + 1}
                  target="_blank"
                  href={`https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.idCompany}/Drivers/${this.props.idDriver}/DrugTestFile/${this.props.fileName}`}
                  download
                >
                  Download
                </DropdownItem>
              );
            } else {
              rowItems.push(
                <DropdownItem disabled="true">
                  Result not yet available
                </DropdownItem>
              );
            }
          }else if (menuOptions[index][1] === "downloadResultAlcohol") {
            if (this.props.fileName !== null) {
              rowItems.push(
                <DropdownItem
                  key={this.props.itemID + index + 1}
                  target="_blank"
                  href={`https://bluagent-files.s3-us-west-2.amazonaws.com/${this.props.idCompany}/Drivers/${this.props.idDriver}/AlcoholTestFile/${this.props.fileName}`}
                  download
                >
                  Download
                </DropdownItem>
              );
            } else {
              rowItems.push(
                <DropdownItem disabled="true">
                  Result not yet available
                </DropdownItem>
              );
            }
          } else {
            new_function = menuOptions[index][1];
            rowItems.push(
              <DropdownItem
                disabled={this.props.itemsDisabled}
                onClick={new_function}
                key={this.props.itemID + index + 1}
                itemID={this.props.itemID}
              >
                {menuOptions[index][0]}
              </DropdownItem>
            );
          }
        }
      } else {
        rowItems.push(
          <DropdownItem
            disabled={this.props.itemsDisabled}
            key={this.props.itemID + index + 1}
            itemID={this.props.itemID}
          >
            {menuOptions[index][0]}
          </DropdownItem>
        );
      }
    }
    return (
      <>
        <Dropdown
          direction={this.props.direction}
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className={this.props.class}
        ></Dropdown>
        <DropdownToggle
          tag="i"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
          className="icon-options-vertical font-2x2icon-close icons font-2xl d-block "
        />

        <DropdownMenu positionFixed>{rowItems}</DropdownMenu>
      </>
    );
  }
}

export default connect(
  (state) => state.maintenance,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Example);
