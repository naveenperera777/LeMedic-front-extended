import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  form: {
    maxWidth: 345,
    marginLeft: 80,
    marginBottom: 560,
    marginTop: 10
  }
});

export default function FormUserDetails(props) {
  const classes = useStyles();

  useEffect(() => {}, []);
  const [gender, setGender] = React.useState('Male');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
 
  const handleChange = event => {
    setGender(event.target.value);
  };

  return (
    <div>  
      <form className={classes.form}>
        <h3>Register A User</h3>
        <form>
        <label>First Name</label>
      <input type="text" class="form-control" 
          placeholder="First Name" id="fname"
          id="fname"
          type="text"
          // value={props.firstname}
          onChange={props.handleChange}
      />

      <label>Last Name</label>
      <input type="text" class="form-control" 
          placeholder="Last Name" id="lname"
          id="lname"
          type="text"
          // value={props.lastname}
          onChange={props.handleChange}
      />

      {/* <InputLabel id="demo-simple-select-label"> Gender</InputLabel> */}
      <label>Gender</label> <br></br>
        <FormControl className={classes.formControl}>
        <InputLabel id="gender"></InputLabel>
        <Select
          labelId="gender"
          id="gender"
          name="gender"
          value={props.gender}
          onChange={props.handleChange}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </Select>
      </FormControl>
        </form> 
        <br></br>   

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={props.stage}
        >
          Next
        </Button>
      </form> 
    </div>
  );
}


