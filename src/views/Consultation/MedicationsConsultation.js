import React, { useState, useEffect } from "react";
import {Button,Alert,Form,FormControl,FormGroup, ControlLabel, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

export default function FormUserDetails(props) {

  useEffect(() => {}, []);

  function getValidationState(type) {
    if( type in props.medicationData){
      let len = props.medicationData[type].length;
      if(len<6 && len>=4) return 'warning';
      if(len<4){
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
      <FormGroup controlId="medicalmgt" validationState={getValidationState("medicalmgt")}>
                <ControlLabel>Medical Management</ControlLabel>{' '}
                <FormControl componentClass="textarea" placeholder="Enter Patient's Medical management details" 
                  onChange={props.handleMedicationChange("medicalmgt")}
                  value={props.medicationData.medicalmgt} />
                </FormGroup>{' '}
      <FormGroup controlId="surgicalmgt" validationState={getValidationState("surgicalmgt")}>
                <ControlLabel>Surgical Management</ControlLabel>{' '}
                <FormControl componentClass="textarea" placeholder="Enter Patient's Surgical management details" 
                  onChange={props.handleMedicationChange("surgicalmgt")}
                  value={props.medicationData.surgicalmgt} />
                </FormGroup>{' '}
          <FormGroup controlId="remarks" validationState={getValidationState("remarks")}>
          <ControlLabel>Special Remarks (Optional)</ControlLabel>{' '}
          <FormControl componentClass="textarea" placeholder="Enter Special Remarks" 
            onChange={props.handleMedicationChange("remarks")}
            value={props.medicationData.remarks} />
          </FormGroup>{' '}
            <FormGroup controlId="nextdate" validationState={getValidationState("nextdate")}>
            <ControlLabel>Next Date (Optional)</ControlLabel>{' '}
            <FormControl type="date" placeholder="Enter Patient's medical management details" 
              onChange={props.handleMedicationChange("nextdate")}
              value={props.medicationData.nextdate} />
            </FormGroup>{' '}
      </Form>      
    </div>
  );
}
