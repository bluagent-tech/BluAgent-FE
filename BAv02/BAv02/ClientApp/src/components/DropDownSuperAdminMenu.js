import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { companiesActions } from "../store/companyStore";
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap";
import AlertDeactivateCompany from "./AlertDeactivateCompany";
import AlertDelete from "./AlertDelete";

class DropDownSuperAdminMenu extends React.Component {

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

  archivedTruck() {
    this.props.archivedTruck();
  }

  deactivateModal() { () => console.log('deactivate') }

  render() {

    const modalTitle = 'Are you sure you want to deactivate this company';
    let menuOptions = this.props.menuOptions;
    let new_function = undefined;
    var rowItems = [];
    for (var index in menuOptions) {
      if (menuOptions[index][1] !== undefined) {
        if (menuOptions[index][1] === "deactivate") {
          rowItems.push(
            <DropdownItem
              key={this.props.itemID + index + 1}
              disabled={false}
              onClick={()=> 
                this.props.onModal(this.props.itemID)
              }>
              Deactivate
            </DropdownItem>,
          );
        }
        else 
        if (menuOptions[index][1] === "Archived") {
          rowItems.push(
            <DropdownItem
              disabled={this.props.itemsDisabled}
              onClick={() => {
                this.archivedTruck();
              }}
              key={this.props.itemID + index + 1}
              itemID={this.props.itemID}
            >
              {menuOptions[index][0]}
            </DropdownItem>
          );
        } else 
        if (menuOptions[index][1] === "Reset Password") {
          rowItems.push(
            <DropdownItem
              key={this.props.itemID + index + 1}
              onClick={()=>
                this.props.onModal2(this.props.itemID)
              }
            >
              Reset Pasword
            </DropdownItem>
          );
        }
        else if (menuOptions[index][1] === "Activate") {
          rowItems.push(
            <DropdownItem
              key={this.props.itemID + index + 1}
              onClick={()=>
                this.props.onModal3(this.props.itemID)
              }
            >
              Activate
            </DropdownItem>
          );
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
  (state) => state.companies,
  (dispatch) => bindActionCreators(companiesActions, dispatch)
)(DropDownSuperAdminMenu);
