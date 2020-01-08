import React, { useState, useEffect } from "react";
import {Button,Alert,Form,FormControl,FormGroup, ControlLabel, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

export default function UserProfessional(props) {

  useEffect(() => {}, []);

  function getFormSuccessState(){
    console.log("error length>",Object.keys(props.errors).length);
    if(Object.keys(props.errors).length == 0 && props.email && props.nic){
     return true;
    }
    return false;
  }

  return (
    <div className="content">
      <Form>
        <FormGroup controlId="nic">
        <ControlLabel>National Identity Card Number</ControlLabel>{' '}
        <FormControl type="text" placeholder="Enter National Identity Card Number" onChange={props.handleChange} value={props.nic}/>
        {props.errors.nic && 
        <Alert bsStyle="danger">
        <strong>{props.errors.nic}</strong>
      </Alert>              
      }
      </FormGroup>{' '}
      <FormGroup controlId="email">
      <ControlLabel>Email</ControlLabel>{' '}
      <FormControl type="text" placeholder="Enter Email" onChange={props.handleChange} value={props.email}/>
      {props.errors.email && 
      <Alert bsStyle="danger">
      <strong>{props.errors.email}</strong>
    </Alert>              
          }
        </FormGroup>{' '}
        <FormGroup controlId="role">
        <ControlLabel>Role</ControlLabel>{' '}
        <ButtonToolbar>
          <DropdownButton title={props.role} id="dropdown-size-medium">
            <MenuItem eventKey="1" onSelect={() => props.onSelectRole("Admin")}>Admin</MenuItem>
            <MenuItem eventKey="2" onSelect={() => props.onSelectRole("Consultant")}>Consultant</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
        </FormGroup>
          <ButtonToolbar>
          {
                getFormSuccessState() ? (
                  <Button bsStyle="success" bsSize="default" onClick={props.handleBack}>Back</Button>
                ) : (
                  <Button bsStyle="success" bsSize="default" disabled>Back</Button>         
                )
              }             
       
              {
                getFormSuccessState() ? (
                  <Button bsStyle="primary" bsSize="default"  onClick={props.handleSubmit} active>Submit</Button>
                ) : (
                <Button bsStyle="primary" bsSize="default"  disabled>Submit</Button>           
                )
              }
   
          </ButtonToolbar>
    </Form>
    </div>
  );
}
