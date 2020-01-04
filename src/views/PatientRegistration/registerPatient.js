import React, { useState, useEffect } from "react";
import {Button,Alert,Form,FormControl,FormGroup, ControlLabel, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import axios from "axios";

const uuidv4 = require('uuid/v4');


export default function RegisterPatient(props) {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [nic, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [errors , setErrors] = useState({});
  const [active, setActive] = useState(false);

  // useEffect(() => {      
  //     getFormSuccessState();
  //  },[]);
 
  console.log("errors",errors);
  console.log("fname", fname, "lname", lname, "gender", gender, "nic", nic, "email", email, "mobile", mobile, "city", city, "district", district);

  const form_data = {
    patient_id : uuidv4() , 
    nic: nic,
    email: email,
    gender: gender,
    first_name: fname,
    last_name: lname,
    city: city,
    district : district,
    mobile : mobile
  };

  const handleSubmit = async () => {
    console.log("form_data",form_data);
    const response = await axios({
      method: "post",
      url: "http://localhost:9090/patient/add",
      data: form_data
    });
  };


  function validateField (type,value) {
    let regexp;
    switch(type){
      case "email":
        regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;  
      case "fname":
      case "lname":
      case "city":
      case "district":
        regexp = /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;
        break;
      case "nic":
        regexp = /^[0-9]{9}[vVxX]$/;
        break;
      case "mobile":
        regexp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    }
    let resp =  regexp.test(value);
    console.log("resp",resp);
    return resp;
  }

  function handleChange(event) {
      const { id, value } = event.target;
      console.log("id",id,"value",value, "length",value.length);
      if(value === ""){
        console.log("eventid",id,"emptyyyyyyyy",errors.fname)
        delete errors.lname;
      }
    switch(event.target.id){
      case "fname":
          if(!validateField(id,value)){
            setErrors(errors => ({ ...errors, [id]: 'First Name must be at least 2 Characters long without special characters!'}));
            console.log("error log");
          } else {
            delete errors.fname;
            setFirstName(value);
          }
          break;
      case "lname":
        if(!validateField(id,value)){
         setErrors(errors => ({ ...errors, [id]: 'Last Name must be at least 2 Characters long without special characters!'}));
        } else {
          delete errors.lname;
          setLastName(value);
        }
          break;
      case "nic":
        if(!validateField(id,value)){
          setErrors(errors => ({ ...errors, [id]: 'Invalid NIC format!'}));
        } else {
          delete errors.nic;
          setNIC(value);
        }
        break;    
      case "email":
        if(!validateField(id,value)){
          setErrors(errors => ({ ...errors, [id]: 'Invalid Email format!'}));
        } else {
          delete errors.email;
          setEmail(value);
        }
        break;          
      case "mobile":
        if(!validateField(id,value)){
          setErrors(errors => ({ ...errors, [id]: 'Invalid Mobile number format!'}));
        } else {
          delete errors.mobile;
          setMobile(value);
        }
        break; 
      case "city":
        if(value === ""){
         delete errors.city
        } else {
        if(!validateField(id,value)){
          setErrors(errors => ({ ...errors, [id]: 'City value must be at least 2 Characters long without special characters!'}));
        } else {
          delete errors.city;
          setCity(value);
        }}
        break;
      case "district":
        if(!validateField(id,value)){
          setErrors(errors => ({ ...errors, [id]: 'District value must be at least 2 Characters long without special characters!'}));
        } else {
          delete errors.district;
          setDistrict(value);
        }
        
     }
     console.log("this ")

    console.log(event.target.id, "value", event.target.value);
  }

  function onSelect(value){
    setGender(value);
  }

  function getFormSuccessState(){
    console.log("error length>",Object.keys(errors).length);
    if(Object.keys(errors).length == 0 && fname && lname && email && gender && nic && mobile && district){
     return true;
    }
    return false;
  }

  function getValidationStates(){
    console.log("sucess");
    return "success";
  }


  return (
    <div className="content">
      <h3>Register Patient</h3><br></br>
     
            <Form>
                <FormGroup controlId="fname" validationState="success">
                <ControlLabel>First Name</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter First Name" onChange={handleChange}/>
                {errors.fname && 
                <Alert bsStyle="danger">
                <strong>{errors.fname}</strong>
              </Alert>              
              }
                </FormGroup>{' '}
            <FormGroup controlId="lname">
                <ControlLabel>Last Name</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter Last Name" onChange={handleChange} />
                {errors.lname && 
                <Alert bsStyle="danger">
                <strong>{errors.lname}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="email">
                <ControlLabel>Email</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter Email" onChange={handleChange} />
                {errors.email && 
                <Alert bsStyle="danger">
                <strong>{errors.email}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="gender">
            <ControlLabel>Gender</ControlLabel>{' '}
            <ButtonToolbar>
              <DropdownButton title={gender} id="dropdown-size-medium">
                <MenuItem eventKey="1" onSelect={() => onSelect("Male")}>Male</MenuItem>
                <MenuItem eventKey="2" onSelect={() => onSelect("Female")}>Female</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
            </FormGroup>
            <FormGroup controlId="nic">
                <ControlLabel>NIC</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter NIC number" onChange={handleChange} />
                {errors.nic && 
                <Alert bsStyle="danger">
                <strong>{errors.nic}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="mobile">
                <ControlLabel>Contact Number</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter mobile number" onChange={handleChange} />
                {errors.mobile && 
                <Alert bsStyle="danger">
                <strong>{errors.mobile}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="city">
                <ControlLabel>Please Enter City</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter City" onChange={handleChange} />
                {errors.city && 
                <Alert bsStyle="danger">
                <strong>{errors.city}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <FormGroup controlId="district">
                <ControlLabel>Please Select District</ControlLabel>{' '}
                <FormControl type="text" placeholder="Enter District" onChange={handleChange} />
                {errors.district && 
                <Alert bsStyle="danger">
                <strong>{errors.district}</strong>
              </Alert>              
              }
            </FormGroup>{' '}
            <ButtonToolbar>
              {
                getFormSuccessState() ? (
                  <Button bsSize="large" bsStyle="primary" block onClick={handleSubmit} active>Register Patient</Button>
                ) : (
                <Button bsSize="large" bsStyle="primary" block onClick={handleSubmit} disabled>Register Patient</Button>           
                )
              }
             </ButtonToolbar>
            </Form>
    </div>
  );
}
