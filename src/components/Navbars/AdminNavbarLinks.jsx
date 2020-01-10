import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Button } from "@material-ui/core";


export default function AdminNavbarLinks(props){
  console.log("read",props.read);
  return (
    <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="pe-7s-helm" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>          
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Account
          </NavItem>         
          <NavItem eventKey={4} onClick={props.logoutHandler}>Log out</NavItem>
        </Nav>
    </div>
    
  );
}