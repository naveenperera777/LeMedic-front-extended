import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import AdminNavbar from "./components/Navbars/AdminNavbar";
import AdminLayout from "layouts/Admin.jsx";
import Login from "./views/Login/login.js";

export default function App() {

    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [isAuthed, setisAuthed] = useState(false);
    // let isAuthed = false;

    function onClickHandler(event){
        let id = event.target.id;
        let value = event.target.value;
        if(id == 'username')
        setuserName(value);
        else {
            setpassword(value);
        }
    }

    function onSubmitHandler(){
        localStorage.setItem('token',"123");
        setisAuthed(true);
        
    }

    function logoutHandler(){
        console.log("logout")
        setisAuthed(false);
    }

    
    console.log("username",userName,"password",password);
  return (
      <div>
          {isAuthed ? 
              <Router>
              <Switch>
              {/* <Route path="/test" exact component={UserProfile} /> */}
               <Route path="/admin" render={props => <AdminLayout {...props} logoutHandler={logoutHandler}/>} />
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
  );
}
