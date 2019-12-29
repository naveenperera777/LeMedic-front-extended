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

  return (
 <div>
   Hi!
 </div>
   
  );
}
