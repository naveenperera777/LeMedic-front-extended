import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.jsx";
import Login from "./views/Login/login.js";
import ResetPassword from "./views/Login/resetPassword";
import axios from "axios";

export default function App() {

    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [isAuthed, setisAuthed] = useState(false);
    const [resetPassword, setresetPassword] = useState(false);
    const [authUser, setUser] = useState({});

    function onClickHandler(event){
        let id = event.target.id;
        let value = event.target.value;
        if(id == 'username')
        setuserName(value);
        else {
            setpassword(value);
        }
    }

    async function onSubmitHandler(){
        const headers = {
            headers: { user: "user1" }
          }
          const body = {
              "username": userName,
              "password": password
          }
          try{
            const result = await axios.post('http://localhost:9090/login',body,headers);  
            const loginResponse = result.data.data[0];
            console.log("loginResponse",loginResponse);
            setUser(loginResponse);
            if(loginResponse["sessionCount"]>0){
                setisAuthed(true);  
            } else {
                console.log("first time login");
                setresetPassword(true);
            }
          } catch(e){
            console.log("Invalid credentials");
          }
        }

    function logoutHandler(){
        console.log("logout")
        setisAuthed(false);
    }

    
    console.log("username",userName,"password",password);
  return (
      <div>
          {
          resetPassword ? 
          <div>
              <ResetPassword />
          </div>
          : (
            <div>
                {isAuthed ? 
              <Router>
              <Switch>
              {/* <Route path="/test" exact component={UserProfile} /> */}
               <Route path="/admin" render={props => <AdminLayout {...props} loggedInUser= {authUser}logoutHandler={logoutHandler}/>} />
                {/* <Redirect from="/" to="/admin/dashboard" /> */}
                {/* <AdminNavbar handler={logoutHandler} text={"hello"} */}
                    {/* //   {...this.props} */}
                      {/* // brandText={this.getBrandText(this.props.location.pathname)} */}
                    {/* /> */}
              </Switch>
            </Router>
          : (
        <div>
            <Login onClickHandler={onClickHandler} onSubmitHandler={onSubmitHandler}/>
        </div> 
     )}
            </div>
          )
          }
          

          
     
  </div>
  );
}
