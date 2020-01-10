import React, { useEffect, useState } from "react";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PatientProfile from "./PatientProfile.js";
import Modal from "./ModalHome";
import DiagnosisConsultation from "./DiagnosisConsultation.js";
import MedicationsConsultation from "./MedicationsConsultation.js";
import PricingConsultation from "./PricingConsultation.js";
import ConfirmationConsultation from "./Confirmation.js";
import ConfirmationModal from "./ConfirmationModal.js";
const uuidv4 = require('uuid/v4');



let suggestions = [];
let selected_user = {};

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const full_name =
  suggestion.first_name + " " + suggestion.last_name + " " + suggestion.nic;
  const matches = match(full_name, query);
  const parts = parse(full_name, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span
            key={part.text}
            style={{ fontWeight: part.highlight ? 500 : 400 }}
          >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.first_name.slice(0, inputLength).toLowerCase() ===
            inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  selected_user = suggestion;
  return suggestion.last_name;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing(2)
  }
}));

export default function IntegrationAutosuggest(props) {
  let stepperState = props.currentStepperState;

  console.log("searchstate", props.currentStepperState);
  const [user , setUser] = useState("");

  useEffect(() => {
    const user = localStorage.getItem('user');
    setUser(user);
    console.log("stepper state", props.currentStepperState);
    console.log("diagnosis_State", Diagnosis);
    console.log("medication_State", Medication);
    console.log("pricing_state", Pricing);

    const fetchData = async () => {
      const result = await axios("http://localhost:9090/patient/all");
      suggestions = result.data.data;
      console.log("suggestions", suggestions);
    };
    fetchData();
  }, [props]);

  const classes = useStyles();
  const [state, setState] = React.useState({
    single: "",
    popper: ""
  });
  const [Diagnosis, setDiagnosis] =React.useState({});
  const [Medication, setMedication] =React.useState({
  });
  const [Pricing, setPricing] =React.useState({
  });
  const [stateSuggestions, setSuggestions] = React.useState([]);

  const [confirmation, setConfirmation] = useState(false);

  const [errors , setErrors] = useState({});


  function checkValidation(type,val,addOrDel){
    if(addOrDel == "add"){
      console.log("validation checked",type,val)
    } else {
      console.log("delete")
    }

    props.checkValidation();
  }


  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    console.log("state", newValue);

    setState({
      ...state,
      [name]: newValue
    });
  };


  const diagnosisChangeHandler = name => (event) => {
    console.log("event---> : " , name , " value:--->", event.target.value)
    setDiagnosis({
      ...Diagnosis,
      [name]: event.target.value
    });
  };
  
  const medicationChangeHandler = name => (event) => {
    console.log("event---> : " , name , " value:--->", event.target.value)
    setMedication({
      ...Medication,
      [name]: event.target.value
    });
  };

  const pricingChangeHandler = name => (event) => {
    console.log("event---> : " , name , " value:--->", event.target.value)
    setPricing({
      ...Pricing,
      [name]: event.target.value
    });
   
  };

  function setTotal(total){
    setPricing({
      ...Pricing,
      ["total"]: total
    });
   
  }

   async function saveMedicalRecord(){  
    var todayDate = new Date().toISOString().slice(0,10); 
        const headers = {
          headers: { user: "user1" }
        }
        let session_id = uuidv4();
        const body = {
          "patient_id": selected_user.patient_id,
          "consultant_id" : user,
          "timestamp" : todayDate,
          "session_id" : session_id,
          "complain": Diagnosis.complain,
          "signs" : Diagnosis.signs,
          "general_exam": Diagnosis.general_exam,
          "system_exam" : Diagnosis.system_exam,
          "investigation" : Diagnosis.investigation,
          "medical_management" : Medication.medicalmgt,
          "surgical_management" : Medication.surgicalmgt,
          "next_date" : Medication.nextdate,
          "remarks": Medication.remarks
        }
        console.log("Session set API",body);
        const result = await axios.post('http://localhost:9090/session/set', body,  headers);
        console.log("result", result.data);
        const pricingBody = {
          "sessionId": session_id,
          "consultationFees": Pricing.consultationFee,
          "medicationFees" : Pricing.medicationFee,
          "tax" : Pricing.tax,
          "miscellaneous": Pricing.miscellaneous,
          "total": Pricing.total
        }
        const emailBody = {
          "receiver": selected_user.email,
          "title": `Medical report of ${selected_user.first_name} ${selected_user.last_name}`,
          "diagnosis" :Diagnosis,
          "medication": {
            "medical_management":Medication.medicalmgt,
            "surgical_management": Medication.surgicalmgt,
            "next_date": Medication.nextdate,
            "remarks": Medication.remarks
          },
          "pricing": {
            "consultationFees" : Pricing.consultationFee,
            "medicationFees": Pricing.medicationFee,
            "medicationFees": Pricing.miscellaneous,
            "tax": Pricing.tax,
            "total": Pricing.total
          }
        }
        await axios.post('http://localhost:9090/session/pricing', pricingBody,  headers);
        //send email
        console.log("email body",emailBody);
        await axios.post('http://localhost:9090/admin/email',emailBody,headers);
      setConfirmation(true);    
      console.log("result", result.data.data);
 
  }


  
  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion
  };

  if(confirmation){
    return(
       <div>
        <ConfirmationModal user={selected_user}/>
       </div>
     )  
     }
         
  switch (stepperState) {
    case 0:
      return (
        <div className={classes.root}>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              id: "react-autosuggest-simple",       
              placeholder: "Enter a Patient Name ...",
              value: state.single,
              onChange: handleChange("single")
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
          <PatientProfile selected_user={selected_user} />
        </div>
      );
    case 1:
      return (
        <div>
          <Modal selected_patient={selected_user} />
        </div>
      );
    case 2:
      return (
        <div>
          <h1>Diagnosis</h1>
          <DiagnosisConsultation
          handleDiagnosisChange = {diagnosisChangeHandler}
          diagnosisData = {Diagnosis}
          checkValidation = {checkValidation}
          />
        </div>
      );
    case 3:
      return (
        <div>
          <h1>Treatment</h1>
          <MedicationsConsultation
          handleMedicationChange={medicationChangeHandler}
          medicationData = {Medication}
          />
        </div>
      );
    case 4:
      return (
        <div>
          <h1>Pricing</h1>
          <PricingConsultation 
          handlePricingChange={pricingChangeHandler}
          pricingData = {Pricing}
          setTotal={setTotal}
          />
        </div>
      );
    case 5:
      return (
        <div>
          <h1>Confirmation</h1>
          <ConfirmationConsultation 
          diagnosisData={Diagnosis}
          medicationData={Medication}
          pricingData={Pricing}
          patient={selected_user}
          />
        </div>
      );
      case 6:
          saveMedicalRecord();
        return(
          <div>
            <h1>Awaiting Confirmation.....</h1>
          </div>
        )

  }
}
