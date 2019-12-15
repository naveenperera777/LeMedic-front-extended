import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
const uuidv4 = require('uuid/v4');


const useStyles = makeStyles({
  form: {
    maxWidth: 345,
    marginLeft: 80,
    marginBottom: 560,
    marginTop: 10
  }
});

export default function RegisterPatient(props) {
  const classes = useStyles();
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {}, []);

  function handleChange(event) {
    console.log("event details", event)
    if(event.target.id !== undefined){
    switch(event.target.id){
      case "fname":
          setFirstName(event.target.value);
      case "lname":
          setLastName(event.target.value);
      case "nic":
          setNIC(event.target.value);    
      case "email":
          setEmail(event.target.value);      
      case "mobile":
          setMobile(event.target.value);
      case "city":
          setCity(event.target.value);
      case "district":
          setDistrict(event.target.value);
     }
  } else {
    setGender(event.target.value);
  }

    console.log(event.target.id, "value", event.target.value);
  }

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

  return (
    <div>
      <form className={classes.form}>
        <h3>Register a Patient</h3>

        <label>First Name</label>
      <input type="text" class="form-control" 
          placeholder="First Name" id="fname"
          id="fname"
          type="text"
          onChange={handleChange}
      />

      <label>Last Name</label>
      <input type="text" class="form-control" 
          placeholder="Last Name" id="lname"
          id="lname"
          type="text"
          onChange={handleChange}
      />

      <label>Gender</label> <br></br>
        <FormControl className={classes.formControl}>
        <InputLabel id="gender"></InputLabel>
        <Select
          labelId="gender"
          id="gender"
          name="gender"
          value={gender}
          onChange={handleChange}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
      </FormControl>
      <br></br>


      <label>NIC</label>
      <input type="text" class="form-control" 
          placeholder="NIC" 
          id="nic"
          type="text"
          onChange={handleChange}
      />


      <label>Email</label>
      <input type="text" class="form-control" 
          placeholder="Email" 
          id="email"
          type="text"
          onChange={handleChange}
      />

    <label>Mobile</label>
      <input type="text" class="form-control" 
          placeholder="Mobile" 
          id="mobile"
          type="text"
          onChange={handleChange}
      />


        <label>City</label>
        <input type="text" class="form-control" 
          placeholder="city" 
          id="city"
          type="text"
          onChange={handleChange}
        />

        <label>District</label>
        <input type="text" class="form-control" 
          placeholder="District" 
          id="district"
          type="text"
          onChange={handleChange}
        />

       <br></br>

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
