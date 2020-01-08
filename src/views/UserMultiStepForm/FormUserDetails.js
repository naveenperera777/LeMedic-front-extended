import React, { useState, useEffect } from "react";
import {Button,Alert,Form,FormControl,FormGroup, ControlLabel, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';


export default function FormUserDetails(props) {

  useEffect(() => {}, []);

  const [errors, setErrors] =  useState({});


  function getFormSuccessState(){
    console.log("error length>",Object.keys(props.errors).length);
    if(Object.keys(props.errors).length == 0 && props.firstname && props.lastname){
     return true;
    }
    return false;
  }
 
  return (
    <div className="content">
            <Form>
                <FormGroup controlId="fname">
                <ControlLabel>First Name</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter First Name" onChange={props.handleChange} value={props.firstname}/>
                {props.errors.fname && 
                <Alert bsStyle="danger">
                <strong>{props.errors.fname}</strong>
              </Alert>              
              }
                </FormGroup>{' '}
            <FormGroup controlId="lname">
                <ControlLabel>Last Name</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter Last Name" onChange={props.handleChange} value={props.lastname}/>
                {props.errors.lname && 
                <Alert bsStyle="danger">
                <strong>{props.errors.lname}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="gender">
            <ControlLabel>Gender</ControlLabel>{' '}
            <ButtonToolbar>
              <DropdownButton title={props.gender} id="dropdown-size-medium">
                <MenuItem eventKey="1" onSelect={() => props.onSelect("Male")}>Male</MenuItem>
                <MenuItem eventKey="2" onSelect={() => props.onSelect("Female")}>Female</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
            </FormGroup>
            {/* <ButtonToolbar>
              {
                
              }
            <Button bsStyle="primary" bsSize="default" onClick={props.stage}>
              Next
            </Button>
          </ButtonToolbar> */}
          <ButtonToolbar>
              {
                getFormSuccessState() ? (
                  <Button bsSize="large" bsStyle="primary" block onClick={props.stage} active>Next</Button>
                ) : (
                <Button bsSize="large" bsStyle="primary" block disabled>Next</Button>           
                )
              }
             </ButtonToolbar>
            </Form>
    </div>
  );
}


