import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  NavLink
} from "react-router-dom";
import { Route, Redirect } from "react-router";
import UserProfile from "../UserList/userProfile";
import Typography from "@material-ui/core/Typography";


export default function CustomizedTables(props) {
  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.background.default
      }
    }
  }))(TableRow);

  function createData(name, nic, email, sex, role) {
    return { name, nic, email, sex, role };
  }

  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: 10,
      marginLeft: 35,
      marginRight: 30,
      display: "grid",
      overflowX: "auto",
      padding: 20
    },
    table: {
      minWidth: 700
    },
    fab: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      margin: theme.spacing(1)
    }
  }));

  const [data, setData] = useState([]);
  const [state, setState] = useState("previous");
  const [logged, setLogged] = useState(true);
  const [rowUser, setrowUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:9090/users");
      console.log(result.data.data);
      setData(result.data.data);
    };
    fetchData();
  }, [rowUser, setrowUser]);

  const classes = useStyles();

  if (state == "previous") {
    return (
      <div>
        <Paper className={classes.root}>
          <Link to={"/admin/create"}>
            <Fab
              variant="extended"
              color="primary"
              aria-label="delete"
              className={classes.fab}
            >
              <NavigationIcon className={classes.extendedIcon} />
              <Typography variant="h5">
              Add User
            </Typography>
            </Fab>
          </Link>

          <div class="table-responsive table-full-width" >
            <table class="table table-hover table-striped" marginLeft="">
              <thead>
                <th>Name</th>
                <th>NIC</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Title</th>
              </thead>
              <tbody>
              {data.map(row => (
                // <Link
                //   to={{
                //     pathname: "/admin/user/profile",
                //     state: {
                //       user: row
                //     }
                //   }}
                // >
                <tr key={row.first_name}
                    onClick={() => setrowUser(row)}>
                <Link>

                  <td>{row.first_name} {row.last_name}</td>
                  </Link>

                  <td>{row.nic}</td>
                  <td>{row.email}</td>
                  <td>{row.gender}</td>
                  <td>{row.role}</td>

                </tr>
                 ))}
            </tbody>
        </table>
        </div>          
                 </Paper>

      </div>
    );
  } else {
    return (
      <div>
        <h1>Lorem Ipsum is simply dummy text</h1>
        <h2>{rowUser}</h2>
      </div>
    );
  }
}
