import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Route, Redirect } from "react-router";
import SearchBarConsultation from "./SearchBarConsultation.js";
import StepperConsultation from "./StepperConsultation.js";

export default function CustomizedTables(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      height: 590,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      display: "grid",
      overflowX: "auto",
      padding: 20
    },
    stepper: {
      height: 200 ,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      display: "grid",
      overflowX: "auto",
      padding: 20
    }
  }));

  const [stepperState, setstepperState] = useState(0);
  const [active, isActive] = useState(false);


  useEffect(() => {}, []);

  const classes = useStyles();

  function ChangeNextStepperState() {
    setstepperState(stepperState + 1);
  }

  function ChangeBackStepperState() {
    setstepperState(stepperState - 1);
  }

  function checkValidation(){
    console.log("validation checked")
    isActive(true);
  }

  return (
    <div>
      <Paper className={classes.root}>
        <SearchBarConsultation currentStepperState={stepperState} checkValidation={checkValidation}/>
      </Paper>
      <Paper className={classes.stepper}>
        <StepperConsultation
          stepperNextFunc={ChangeNextStepperState}
          stepperBackFunc={ChangeBackStepperState}
          isActive={active}
        />
      </Paper> 
    </div>
  );
}
