// import React, { useState, useEffect } from "react";
import React, { useEffect, useState } from "react";
import {Button,Alert,Form,FormControl,FormGroup, ControlLabel, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

export default function FormUserDetails(props) {

  useEffect(() => {
    console.log("handleChangeDiagnosis", state.complain);
  }, []);

  const [state, setState] = React.useState({});
  const [errors , setErrors] = useState({});



  function getValidationState(type) {
    if( type in props.diagnosisData){
      let len = props.diagnosisData[type].length;
      console.log("yes it is" ,len);
      if(len<6 && len>=4) return 'warning';
      if(len<4){
        props.checkValidation("diagnosis");
      return 'error';
      }
      if(len>=6){
        return 'success';
      } 
    } else {
      return null;
    }
  }
  return (
    <div>
       <Form>
            <FormGroup controlId="complain" validationState={getValidationState("complain")}>
                <ControlLabel>Patient Complain</ControlLabel>{' '}
                <FormControl componentClass="textarea" placeholder="Enter Patient's complain" 
                  onChange={props.handleDiagnosisChange("complain")}
                  value={props.diagnosisData.complain} />
                {errors.fname && 
                <Alert bsStyle="danger">
                <strong>{errors.fname}</strong>
              </Alert>              
              }
                </FormGroup>{' '}
            <FormGroup controlId="signs" validationState={getValidationState("signs")}>
                <ControlLabel>Signs</ControlLabel>{' '}
                <FormControl  componentClass="textarea" placeholder="Enter Patient Signs"
                 onChange={props.handleDiagnosisChange("signs")}
                 value={props.diagnosisData.signs} />
                {errors.lname && 
                <Alert bsStyle="danger">
                <strong>{errors.lname}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="general_exam" validationState={getValidationState("general_exam")}>
                <ControlLabel>General Examination</ControlLabel>{' '}
                <FormControl  componentClass="textarea" placeholder="Enter General Examination details" 
                 onChange={props.handleDiagnosisChange("general_exam")}
                 value={props.diagnosisData.general} />  
                
                {errors.email && 
                <Alert bsStyle="danger">
                <strong>{errors.email}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="system_exam" validationState={getValidationState("system_exam")}>
                <ControlLabel>Systemic Examination</ControlLabel>{' '}
                <FormControl componentClass="textarea" placeholder="Enter Systemic Examination details" 
                 onChange={props.handleDiagnosisChange("system_exam")}
                 value={props.diagnosisData.systemic}/>   
                {errors.nic && 
                <Alert bsStyle="danger">
                <strong>{errors.nic}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="investigation" validationState={getValidationState("investigation")}>
                <ControlLabel>Investigation</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter Investigation details" 
                onChange={props.handleDiagnosisChange("investigation")}
                value={props.diagnosisData.investigation}/>           
                {errors.mobile && 
                <Alert bsStyle="danger">
                <strong>{errors.mobile}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            {/* <ButtonToolbar>
              {
                getFormSuccessState() ? (
                  <Button bsSize="large" bsStyle="primary" block onClick={handleSubmit} active>Register Patient</Button>
                ) : (
                <Button bsSize="large" bsStyle="primary" block onClick={handleSubmit} disabled>Register Patient</Button>           
                )
              }
             </ButtonToolbar> */}
            </Form>
    </div>
  );
}
