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

const useStyles = makeStyles({
  card: {
    maxWidth: 200,
    marginLeft: 275,
    marginBottom: 30,
    marginTop: 20
    // height: 400
  },
  media: {
    maxHeight: 175
  }
});

export default function MediaCard(props) {
  const user = props.selected_user;
  console.log("thisprop", user);

  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const classes = useStyles();

  return (
    // <Router>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          style={{ height: 300 }}
          image={require("/home/naveenthe/Documents/Medic/LeMedic-Front-extended/src/assets/img/male-character-with-hat-and-camera-free-vector.jpg")}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {/* {props.location.state.user.first_name}{" "}
            {props.location.state.user.last_name} */}
          </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            {props.selected_user.first_name} {props.selected_user.last_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.selected_user.gender}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.selected_user.nic}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    // </Router>
  );
}
