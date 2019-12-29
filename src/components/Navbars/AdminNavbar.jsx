import React, { useState, useEffect } from "react";
import { Form,FormGroup,FormControl,ControlLabel,Button} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";

  const Login = props => {


  const [sidebarExists,setsidebarExists] = useState(false);

  function mobileSidebarToggle(e) {
    if (sidebarExists === false) {
      setsidebarExists(true);
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }

   return (
    <div>
   <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#pablo">{props.brandText}</a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <AdminNavbarLinks logoutHandler={props.logoutHandler}/>
        </Navbar.Collapse>
      </Navbar>
    </div>
    
  );
}

export default Login;