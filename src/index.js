
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import UserProfile from "./views/UserList/userProfile";
import UserList from "./views/UserList/userList";
import Welcome from "./views/welcome"
import AdminNavbar from "./components/Navbars/AdminNavbar";

import AdminLayout from "layouts/Admin.jsx";

ReactDOM.render(
  <Router>
    <Switch>
    {/* <Route path="/test" exact component={UserProfile} /> */}
    <Route path="/admin/usermgt/id" exact component={UserProfile} />   
    {/* <Route path="/admin/create" exact component={Welcome} /> */}
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}

      <AdminNavbar
            // {...this.props}
            // brandText={this.getBrandText(this.props.location.pathname)}
          />

    </Switch>
  </Router>,
  document.getElementById("root")
);
