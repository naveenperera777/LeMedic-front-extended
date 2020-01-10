import React, { useState, useEffect } from "react";
import { Form,FormGroup,FormControl,ControlLabel,Button} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";

export default function Login(props) {
  return (
    <div>
        <Form inline>
        <FormGroup controlId="username">
            <ControlLabel>New password</ControlLabel>{' '}
            <FormControl type="text" placeholder="username" />
        </FormGroup>{' '}
        <FormGroup controlId="password">
            <ControlLabel>Email</ControlLabel>{' '}
            <FormControl type="password" placeholder="password" />
        </FormGroup>{' '}
        <Button  onClick={props.onSubmitHandler}>Login</Button>
        </Form>
    </div>
    
  );
}
