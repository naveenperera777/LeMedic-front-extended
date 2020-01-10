import React, { useState, useEffect } from "react";
import { Form,FormGroup,FormControl,ControlLabel,Button} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";

export default function Login(props) {
  return (
    <div>
        <Form inline>
        <FormGroup controlId="ftpassword">
            <ControlLabel>New password</ControlLabel>{' '}
            <FormControl type="text" placeholder="ftpassword" onChange={props.onClickHandler}/>
        </FormGroup>{' '}
        <FormGroup controlId="repassword">
            <ControlLabel>Retye password</ControlLabel>{' '}
            <FormControl type="password" placeholder="repassword" onChange={props.onClickHandler}/>
        </FormGroup>{' '}
        <Button  onClick={props.onSubmitHandler}>Login</Button>
        </Form>
    </div>
    
  );
}
