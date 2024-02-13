import React from "react";
import {
    NavItem,
    NavLink,
  } from "reactstrap";
   
function NavItemContainer(props) {                               
    return (
        <NavItem>
            <NavLink
            active={props.active}
            onClick={() => props.getClick(props.id)}
            >
            {props.item}
            </NavLink>
        </NavItem>
    )
}

export default NavItemContainer;
