import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%"
  },
  backButton: {
    // marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: 10,
    // marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return [
    "Selecting a Patient ",
    "View Past Medical Records",
    "Diagnosis",
    "Medications",
    "Pricing",
    "Finish"
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Select Patient Profile";
    case 1:
      return "Take a look at your Patient's history";
    case 2:
      return "Let's Diagnose your Patient";
    case 3:
      return "Prescribe medications to your Patient";
    case 4:
      return "Time to have your payment";
    case 5:
      return "Take a look at the Summary before you confirm";  
    default:
      return "Uknown stepIndex";
  }
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  function handleNext() {
    props.stepperNextFunc();
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    props.stepperBackFunc();
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

   return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          // <Typography variant="h1">
          <Step key={label}>
       
            <StepLabel>{label}</StepLabel>
 
          </Step>
          // </Typography>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography variant="h4">
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {
                props.isActive ? (
                  <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}  
                >{activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
                ) : (
                  <Button variant="contained" disabled>
                  Disabled
                </Button>
                )
              }
              {/* <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}

              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
