import React, { useState, useEffect } from "react";
import FormUserDetails from "./FormUserDetails";
import UserProfessional from "./UserProfessional";
import axios from "axios";
import { Route, Redirect } from "react-router";
import Typography from "material-ui/styles/typography";

export default function UserForm() {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNIC] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [stage, setStage] = useState(0);

  console.log("fname", fname, "lname", lname, "gender", gender, "nic", nic, "email", email, "role", role);

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
      case "role":
          setRole(event.target.value);
     }
  } else {
    setGender(event.target.value);
  }

    console.log(event.target.id, "value", event.target.value);
  }

   function handleStage() {
    setStage(stage + 1);
    console.log("stage is ", stage);
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
      <div>
        <FormUserDetails
          handleChange={handleChange}
          firstname={fname}
          lastname={lname}
          gender={gender}
          stage={handleStage}
        />
      </div>
    );
  } else if (stage == 1) {
    return (
      <div>
        <UserProfessional
          handleChange={handleChange}
          role={role}
          handleSubmit={handleSubmit}
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
