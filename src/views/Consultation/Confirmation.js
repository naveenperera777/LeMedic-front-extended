import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {PanelGroup,Panel,ButtonToolbar,ListGroup,ListGroupItem} from "react-bootstrap";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <PanelGroup accordion id="accordion-example">
        <Panel eventKey="1" bsStyle="primary">
          <Panel.Heading>
            <Panel.Title toggle>Patient Information</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
          Name :  {props.patient.first_name} {props.patient.last_name} <br></br>
          NIC:  {props.patient.nic}
          </Panel.Body>
        </Panel>
        <Panel eventKey="2" bsStyle="success">
          <Panel.Heading>
            <Panel.Title toggle>Patient Diagnosis</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
          Complain :  {props.diagnosisData.complain} <br></br>
          Signs:  {props.diagnosisData.signs} <br></br>
          General Examination : {props.diagnosisData.general_exam}<br></br>
          Systemic Examination : {props.diagnosisData.system_exam}<br></br>
          Investigation: {props.diagnosisData.investigation}
          </Panel.Body>
        </Panel>
        <Panel eventKey="3" bsStyle="success">
          <Panel.Heading>
            <Panel.Title toggle>Patient Medications</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
          Medical Management :  {props.medicationData.medicalmgt} <br></br>
          Surgical Management:  {props.medicationData.surgicalmgt} <br></br>
          Next Visit Date : {props.medicationData.nextdate}<br></br>
          Remarks : {props.medicationData.remarks}<br></br>
          </Panel.Body>
        </Panel>
        <Panel eventKey="1" bsStyle="success">
          <Panel.Heading>
            <Panel.Title toggle>Pricing Details</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
          Consultation Fee :  {props.pricingData.consultationFee} <br></br>
          Medication Fee:  {props.pricingData.medicationFee} <br></br>
          Miscellaneous Charges : {props.pricingData.miscellaneous}<br></br>
          Tax Percentage : {props.pricingData.tax} %<br></br>
          Net Total : {props.pricingData.total}<br></br>
          </Panel.Body>
        </Panel>
        </PanelGroup>      
    </div>
  );
}
