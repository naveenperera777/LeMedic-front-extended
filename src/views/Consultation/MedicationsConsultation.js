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
  }
});

export default function FormUserDetails(props) {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <div>
      <form className={classes.form}>
         <label>Medical Management</label>
        <textarea class="form-control" placeholder="Here can be your nice text" rows="3"
            id="medmgt"
            type="text"
            onChange={props.handleMedicationChange("medicalmgt")}
            value={props.medicationData.medicalmgt} />
         <label>Surgical Management (Optional)</label>
        <textarea class="form-control" placeholder="Here can be your nice text" rows="3"
            id="surgicalmgt"
            type="text"
            onChange={props.handleMedicationChange("surgicalmgt")}
            value={props.medicationData.surgicalmgt} />
            
         <label>Special Remarks (Optional)</label>
        <textarea class="form-control" placeholder="Here can be your nice text" rows="3"
            id="remarks"
            type="text"
            onChange={props.handleMedicationChange("remarks")}
            value={props.medicationData.remarks} />     
      <label>Next Date (Optional)</label> 
      <textarea class="form-control" placeholder="Here can be your nice text" rows="3"
        id="nextdate"
        type="text"
        onChange={props.handleMedicationChange("nextdate")}
        value={props.medicationData.nextdate} />        
      </form>
    </div>
  );
}
