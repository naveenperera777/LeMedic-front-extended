import React, { useState, useEffect } from "react";
import { Form,FormGroup,FormControl,ControlLabel,Button} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";

export default function Login(props) {
     // function isAuthed(){
    //     // const token = localStorage.getItem('token');
    //     // console.log("token->",token);
    //     // if(token){
    //     //    return true; 
    //     // }
    //     return false;
    // }
  return (
    <div>
        <Form inline>
        <FormGroup controlId="username">
            <ControlLabel>Name</ControlLabel>{' '}
            <FormControl type="text" placeholder="username" onChange={props.onClickHandler}/>
        </FormGroup>{' '}
        <FormGroup controlId="password">
            <ControlLabel>Email</ControlLabel>{' '}
            <FormControl type="password" placeholder="password" onChange={props.onClickHandler}/>
        </FormGroup>{' '}
        <Button  onClick={props.onSubmitHandler}>Login</Button>
        </Form>
    </div>
    
  );
}
