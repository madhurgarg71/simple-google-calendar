import { useEffect, useState, useContext } from "react";
import { Typography, Fab, makeStyles } from "@material-ui/core";

import WeekGrid from "./WeekGrid";
import WeekHeader from "./WeekHeader";
import NavigationBar from "./NavigationBar";

import {
  getActiveMonthFromWeek,
  getCurrentWeek,
  getPreviousWeek,
  getNextWeek,
} from "../utils";

import { DIRECTIONS } from "../constants";
import { Add } from "@material-ui/icons";
import CreateEventPopup from "./CreateEventPopup";
import { CalendarContext } from "../Context";

const useStyles = makeStyles((theme) => ({
  createEventBtn: {
    position: "fixed",
    top: 96,
    left: 14,
    zIndex: 3,
  },
}));

function MonthSelector(props) {
  const { classes, activeMonth } = props;
  return (
    <div className={classes.renderClass}>
      <Typography>{activeMonth}</Typography>
    </div>
  );
}

function WeekViewMain(props) {
  const [activeWeek, setActiveWeek] = useState([]);
  const [activeMonth, setActiveMonth] = useState(null);
  const [showCreateEventPopup, setShowCreateEventPopup] = useState(false);
  const { createEvent } = useContext(CalendarContext);
  const classes = useStyles();

  const setDefaultWeek = () => {
    let week = getCurrentWeek();
    setActiveWeek(week);
  };

  const handleNavigationChange = (direction) => {
    let week;
    if (direction === DIRECTIONS.LEFT) {
      week = getPreviousWeek(activeWeek);
    } else {
      week = getNextWeek(activeWeek);
    }
    setActiveWeek(week);
  };

  const handleTodayClick = () => {
    setDefaultWeek();
  };

  const openEventCreatePopup = () => {
    setShowCreateEventPopup(true);
  };

  useEffect(() => {
    const activeMonth = getActiveMonthFromWeek(activeWeek);
    setActiveMonth(activeMonth);
  }, [activeWeek]);

  useEffect(() => {
    setDefaultWeek();
  }, []);
  return (
    <div>
      <NavigationBar
        render={(classes) => (
          <MonthSelector classes={classes} activeMonth={activeMonth} />
        )}
        onClickToday={handleTodayClick}
        onNavigationChange={handleNavigationChange}
      />

      <WeekHeader activeWeek={activeWeek} />
      <WeekGrid activeWeek={activeWeek} />
      <Fab
        onClick={openEventCreatePopup}
        className={classes.createEventBtn}
        color="primary"
      >
        <Add />
      </Fab>

      <CreateEventPopup
        isOpen={showCreateEventPopup}
        onClose={() => setShowCreateEventPopup(false)}
        onSave={({ title, from, to }) => createEvent(title, from, to)}
      />
    </div>
  );
}

export default WeekViewMain;
