import React, { useState, useEffect } from "react";
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
    marginLeft: 80,
    marginBottom: 560,
    marginTop: 10
  }
});

export default function UserProfessional(props) {
  const classes = useStyles();

  useEffect(() => {}, []);
  const [text, setText] = useState("");
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <form className={classes.form}>
        <h3>Other Details</h3>


      <label>NIC</label>
      <input type="text" class="form-control" 
          placeholder="NIC" id="nic"
          id="nic"
          type="text"
          onChange={props.handleChange}
      />


      <label>Email</label>
      <input type="text" class="form-control" 
          placeholder="Email" id="email"
          id="email"
          type="text"
          onChange={props.handleChange}
      />


        <label>Role</label>
        <input type="text" class="form-control" 
          placeholder="Role" id="role"
          id="role"
          type="text"
          onChange={props.handleChange}
        />
        <br></br>

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={props.handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
