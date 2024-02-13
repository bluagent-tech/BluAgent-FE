import React, { useState } from 'react'
import {
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    UncontrolledDropdown,
  } from "reactstrap";

const DropDownCamera = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
      }

    let menuOptions = props.menuOptions;
    var rowItems = [];
    for (var index in menuOptions) {
        if (menuOptions[index][0] === "Assign") {
          rowItems.push(
            <DropdownItem
              key={props.itemID + index + 1}
              onClick={()=> 
                {
                    menuOptions[index][1]();
                }
              }>
              Assigned
            </DropdownItem>,
          );
        }
        else if (menuOptions[index][0] === "Request Unassign") {
            rowItems.push(
                <DropdownItem
                  key={props.itemID + index + 1}
                  onClick={()=> 
                    {
                        menuOptions[index][1]();
                    }
                  }>
                  Request Unassign
                </DropdownItem>,
              );
        }
        else if (menuOptions[index][0] === "Waiting request") {
          rowItems.push(
            <DropdownItem
              key={props.itemID + index + 1}
              // target="_blank"
            >
              Waiting Request
            </DropdownItem>
          );
        }
        else if (menuOptions[index][0] === "Accept Request"){
          rowItems.push(
            <DropdownItem
            key={props.itemID + index + 1}
            onClick={()=> 
              {
                  menuOptions[index][1]();
              }
            }>
            Acept Request
          </DropdownItem>,
          )
        }
        else if(menuOptions[index][0] === ""){
          rowItems.push(
            <DropdownItem
            key={props.itemID + index + 1}>
            ...
          </DropdownItem>,
          )
        }
    }

    return (
      <>
        <Dropdown
          direction={props.direction}
          isOpen={dropdownOpen}
          toggle={toggle}
          className={props.class}
        ></Dropdown>
        <DropdownToggle
          tag="i"
          onClick={toggle}
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
          className="icon-options-vertical font-2x2icon-close icons font-2xl d-block "
        />

        <DropdownMenu positionFixed>{rowItems}</DropdownMenu>
      </>
    );
}

export default DropDownCamera