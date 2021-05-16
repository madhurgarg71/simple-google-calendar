import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { DIRECTIONS } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    flexGrow: 1,
    zIndex: 2,
  },
  todayBtn: {
    marginLeft: 40,
  },
  navigationBtnContainer: {
    marginLeft: 20,
  },
  renderClass: {
    marginLeft: 20,
  },
}));

function TodayButton(props) {
  const { classes, onClick } = props;
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      className={classes.todayBtn}
      color="inherit"
    >
      Today
    </Button>
  );
}

function NavigationControl(props) {
  const { classes, onChange } = props;

  return (
    <div className={classes.navigationBtnContainer}>
      <IconButton onClick={() => onChange(DIRECTIONS.LEFT)} color="inherit">
        <NavigateBefore />
      </IconButton>
      <IconButton onClick={() => onChange(DIRECTIONS.RIGHT)} color="inherit">
        <NavigateNext />
      </IconButton>
    </div>
  );
}

export default function NavigationBar(props) {
  const { onNavigationChange, onClickToday, render } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gogole Calendar</Typography>
          <TodayButton onClick={onClickToday} classes={classes} />
          <NavigationControl onChange={onNavigationChange} classes={classes} />
          {render(classes)}
        </Toolbar>
      </AppBar>
    </div>
  );
}
