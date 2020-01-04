import React, { useState, useEffect } from "react";
import {Button,Alert,Form,FormControl,FormGroup, ControlLabel, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import { makeStyles } from "@material-ui/core/styles";


export default function FormUserDetails(props) {

  useEffect(() => {}, []);

  const [total , setTotal] = useState(0);
  const [errors , setErrors] = useState({});

  function pricingHandler(){
   let price = props.pricingData;
   let total = 0;
   let tax = 0;
   for (let key in price) {
     console.log("key is ",key);
     if(key == 'tax'){
      tax = Number(price['tax'])
     } else {
      total += Number(price[key]);
     }
  }
    if(tax !== 0){
      let value = total * ((100+tax)/100);
      return Math.round(value);
    } else {
      return total;
    }
  }

  // 600 * 110/100
  
  function getValidationState(type) {
    if( type in props.pricingData){
      let cost = props.pricingData[type];
      if(cost === ""){
        return 'error';
      }
      console.log(cost);
      let regExp = /^[0-9]*$/;
      let resp =  regExp.test(cost);
      if(resp){
        return 'success';
      } else {
        return 'error';
      }
    } else {
      return null;
    }
  }

  return (
    <div>
      {/* <form className={classes.form}> */}
        <Form>

        <FormGroup controlId="consultationFee" validationState={getValidationState("consultationFee")}>
                <ControlLabel>Consultation Fees</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter Consultation Fees" 
                onChange={ props.handlePricingChange("consultationFee")}
                value={props.pricingData.consultationFee} />
        </FormGroup>{' '}

        <FormGroup controlId="medicationFee" validationState={getValidationState("medicationFee")}>
                <ControlLabel>Fees for Medications (Optional)</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter Consultation Fees" 
                onChange={ props.handlePricingChange("medicationFee")}
                value={props.pricingData.medicationFee} />
        </FormGroup>{' '}

        <FormGroup controlId="tax" validationState={getValidationState("tax")}>
                <ControlLabel>Tax Percentage (Optional)</ControlLabel>{' '}
                <FormControl type="text" placeholder="Tax" 
                onChange={ props.handlePricingChange("tax")}
                value={props.pricingData.tax} />
        </FormGroup>{' '}

        <FormGroup controlId="miscellaneous" validationState={getValidationState("miscellaneous")}>
                <ControlLabel>Miscellaneous Charges (Optional)</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter Miscellaneous Fees" 
                onChange={ props.handlePricingChange("miscellaneous")}
                value={props.pricingData.miscellaneous} />
        </FormGroup>{' '}

        <FormGroup controlId="total" validationState={getValidationState("total")}>
                <ControlLabel>Total Charges</ControlLabel>{' '}
                <FormControl type="text" 
                onChange={ props.handlePricingChange("total")}
                value={pricingHandler()} />
        </FormGroup>{' '}

        </Form>

      {/* <label>Consultation Fees</label>
      <input type="text" class="form-control" 
      placeholder="1000.00" id="consultationFee"
      onChange={pricingHandler()} 
      value={props.pricingData.consultationFee} />

      <label>Fees for Medications (Optional)</label>
      <input type="text" class="form-control" 
      placeholder="2000.00" id="medicationFee"
      onChange={props.handlePricingChange("medicationFee")} 
      value={props.pricingData.medicationFee} />

      <label>Tax Percentage (Optional)</label>
      <input type="text" class="form-control" 
      placeholder="3%" id="tax"
      onChange={props.handlePricingChange("tax")} 
      value={props.pricingData.tax} />

      <label>Miscellaneous Charges (Optional)</label>
      <input type="text" class="form-control" 
      placeholder="1000.00" id="miscellaneous"
      onChange={props.handlePricingChange("miscellaneous")} 
      value={props.pricingData.miscellaneous} />

      <label>Total</label>
      <input type="text" class="form-control" 
      placeholder="6000.00" id="total"
      onChange={props.handlePricingChange("total")} 
      value={total} />
      </form> */}
     
    </div>
  );
}
