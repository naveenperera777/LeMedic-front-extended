import React, { useState, useEffect } from "react";
import FormUserDetails from "./FormUserDetails";
import UserProfessional from "./UserProfessional";
import axios from "axios";


export default function UserForm() {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [gender, setGender] = useState("Female");
  const [nic, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Consultant");
  const [stage, setStage] = useState(0);
  const [errors , setErrors] = useState({});

  console.log("fname", fname, "lname", lname, "gender", gender, "nic", nic, "email", email, "role", role);
  console.log("form errors --->",errors);
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
    }
    let resp =  regexp.test(value);
    console.log("resp",resp);
    return resp;
  }

  function handleChange(event) {
    const { id, value } = event.target;
    console.log("event details", event)
    if(event.target.id !== undefined){
    switch(event.target.id){
      case "fname":
        if(!validateField(id,value)){
          setErrors(errors => ({ ...errors, [id]: 'First Name must be at least 2 Characters long without special characters!'}));
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
      case "role":
          setRole(event.target.value);
     }
  } else {
    setGender(event.target.value);
  }

    console.log(event.target.id, "value", event.target.value);
  }


  function onSelect(value){
    setGender(value);
  }

  function onSelectRole(value){
    setRole(value);
  }

   function handleStage() {
    setStage(stage + 1);
    console.log("stage is ", stage);
  }

  function handleBack(){
    setStage(stage -1);
  }

  const form_data = {
    nic: nic,
    email: email,
    gender: gender,
    first_name: fname,
    last_name: lname,
    role: role
  };
  const handleSubmit = async () => {
    setStage(stage + 1);

    const response = await axios({
      method: "post",
      url: "http://localhost:9090/users/add",
      data: form_data
    });
  };

  if (stage == 0) {
    return (
      <div className="content">
      <FormUserDetails
          handleChange={handleChange}
          firstname={fname}
          lastname={lname}
          gender={gender}
          stage={handleStage}
          onSelect={onSelect}
          errors={errors}
        />
      </div>
    );
  } else if (stage == 1) {
    return (
      <div className="content">
      <UserProfessional
          handleChange={handleChange}
          role={role}
          handleSubmit={handleSubmit}
          onSelectRole={onSelectRole}
          errors={errors}
          handleBack={handleBack}
        />
      </div>
    );
  } else {
    // return <Redirect to={"/user/profile"} />;
    return (<div>     
             <h1>User Added Successfully!</h1>           
    </div>)
  }
}
