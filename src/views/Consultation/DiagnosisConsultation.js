// import React, { useState, useEffect } from "react";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    console.log("handleChangeDiagnosis", state.complain);
  }, []);

  const [state, setState] = React.useState({
  });

  return (
    <div>
      <form className={classes.form}>
      <label>Complain</label>
      <input type="text" class="form-control" 
      placeholder="Complain" id="complain"
      onChange={props.handleDiagnosisChange("complain")} 
      value={props.diagnosisData.complain} />

        <label>Signs</label>
        <textarea class="form-control" placeholder="Here can be your nice text" rows="3"
            id="signs"
            type="text"
            onChange={props.handleDiagnosisChange("signs")}
            value={props.diagnosisData.signs} />

         <label>General Examination</label>
        <textarea class="form-control" placeholder="Here can be your nice text" rows="3"
            id="general"
            type="text"
            onChange={props.handleDiagnosisChange("general_exam")}
            value={props.diagnosisData.general} />  

          <label>General Examination</label>
        <textarea class="form-control" placeholder="Here can be your nice text" rows="3"
            id="systemic"
            type="text"
            onChange={props.handleDiagnosisChange("system_exam")}
            value={props.diagnosisData.systemic}/>   

        <label>Investigation</label>
        <textarea class="form-control" placeholder="Here can be your nice text" rows="3"
            id="investigation"
            type="text"
            onChange={props.handleDiagnosisChange("investigation")}
            value={props.diagnosisData.investigation}/>           
      </form>
    </div>
  );
}
