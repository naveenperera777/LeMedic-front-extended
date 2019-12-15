import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Route, Redirect } from "react-router";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  NavLink
} from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginLeft: 400,
    marginBottom: 30,
    marginTop: 100
  },
  media: {
    // height: 140
  }
});

export default function MediaCard(props) {
  useEffect(() => {}, []);

  const [redirect, setRedirect] = useState(false);
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDeleteClose() {
    axios
      .delete(
        `http://localhost:9090/users/delete/${props.location.state.user.user_id}`
      )
      .then(res => {
        console.log(res);
      })
      .catch(function(err) {
        console.log("The error", err);
      });

    setOpen(false);
    setRedirect(true);
  }

  const classes = useStyles();

  if (redirect) {
    return <Redirect to="/usermgt" />;
  }
  return (
    // <Router>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          style={{ height: 300 }}
          // image={require("src/assets/img/male-character-with-hat-and-camera-free-vector.jpg")}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.location.state.user.first_name}{" "}
            {props.location.state.user.last_name}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            Consultant Physician
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Medical Officer
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {/* {props.user.email} */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={handleClickOpen}>
          Delete
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          {/* <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure?
              </DialogContentText>
            </DialogContent> */}

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              No
            </Button>
            <Button onClick={handleDeleteClose} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
    // </Router>
  );
}
