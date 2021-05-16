import { useEffect, useState, useContext, useRef } from "react";
import { Typography, Fab, makeStyles } from "@material-ui/core";

import WeekGrid from "./WeekGrid";
import WeekHeader from "./WeekHeader";
import NavigationBar from "./NavigationBar";

import {
  getActiveMonthFromWeek,
  getCurrentWeek,
  getPreviousWeek,
  getNextWeek,
  getNearestQuaterlySlot,
} from "../utils";

import { DIRECTIONS } from "../constants";
import { Add } from "@material-ui/icons";
import CreateEventPopup from "./CreateEventPopup";
import { CalendarContext } from "../Context";
import dayjs from "dayjs";
import EditEventPopup from "./EditEventPopup";
import SuccessEventAlert from "./SuccessEventAlert";

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

function getDefaultEventDates() {
  const from = getNearestQuaterlySlot(dayjs());
  const to = from.add(1, "hour");
  return { defaultFromDate: from, defaultToDate: to };
}

function WeekViewMain(props) {
  const [activeWeek, setActiveWeek] = useState([]);
  const [activeMonth, setActiveMonth] = useState(null);
  const [showCreateEventPopup, setShowCreateEventPopup] = useState(false);
  const [selectedFromDate, setSelectedFromDate] = useState();
  const [selecetdToDate, setSelectedToDate] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [showSuccessAlert, setShowSuccessALert] = useState(false);
  const { createEvent, editEvent, deleteEvent } = useContext(CalendarContext);
  const classes = useStyles();
  const gridContainerRef = useRef();
  const eventPopupRef = useRef();

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

  const openEventCreatePopup = (from, to) => {
    setShowCreateEventPopup(true);
    setSelectedFromDate(from);
    setSelectedToDate(to);
  };

  const openEventEditPopup = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateEvent = () => {
    const { defaultFromDate, defaultToDate } = getDefaultEventDates();
    openEventCreatePopup(defaultFromDate, defaultToDate);
  };

  const onSuccess = () => {
    setShowSuccessALert(true);
  };

  const scrollGrid = (amount) => {
    gridContainerRef.current.scroll(amount);
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
      <WeekGrid
        eventPopupRef={eventPopupRef}
        openEventCreatePopup={openEventCreatePopup}
        openEventEditPopup={openEventEditPopup}
        ref={gridContainerRef}
        activeWeek={activeWeek}
      />
      <Fab
        onClick={handleCreateEvent}
        className={classes.createEventBtn}
        color="primary"
      >
        <Add />
      </Fab>

      {showCreateEventPopup && (
        <CreateEventPopup
          fromDate={selectedFromDate}
          toDate={selecetdToDate}
          isOpen={true}
          onClose={() => setShowCreateEventPopup(false)}
          onSave={({ title, from, to }) =>
            createEvent({ title, from, to }, onSuccess)
          }
          scrollGrid={scrollGrid}
        />
      )}
      {selectedEvent && (
        <EditEventPopup
          isOpen={true}
          event={selectedEvent}
          onClose={() => setSelectedEvent()}
          onDelete={(eventId) => deleteEvent(eventId)}
          onSave={({ title, from, to }) =>
            editEvent(selectedEvent.id, { title, from, to }, onSuccess)
          }
        />
      )}

      <SuccessEventAlert
        open={showSuccessAlert}
        onClose={() => setShowSuccessALert(false)}
      />
    </div>
  );
}

export default WeekViewMain;
