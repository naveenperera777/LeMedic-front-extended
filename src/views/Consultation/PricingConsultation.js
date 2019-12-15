import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  form: {
    maxWidth: 345,
    marginLeft: 10,
    marginBottom: 30,
    marginTop: 10
  },
  followup: {
    maxWidth: 345,
    marginLeft: 100,
    marginBottom: 30,
    marginTop: 100
  }
});

export default function FormUserDetails(props) {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div>
      <form className={classes.form}>

      <label>Consultation Fees</label>
      <input type="text" class="form-control" 
      placeholder="1000.00" id="consultationFee"
      onChange={props.handlePricingChange("consultationFee")} 
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
      value={props.pricingData.total} />
      </form>
     
    </div>
  );
}
