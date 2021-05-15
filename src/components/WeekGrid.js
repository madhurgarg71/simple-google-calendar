import DayTimeline from "./DayTimeline";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { getTimeSlots, isDateExistInWeek } from "../utils";
import EventChip from "./EventChip";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { useContext } from "react";
import { CalendarContext } from "../Context";
import { TIME_SLOT_HEIGHT } from "../constants";

dayjs.extend(customParseFormat);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 184,
  },
  day: {
    width: "calc(100%/7)",
  },
  timeSlot: {
    width: 84,
    height: TIME_SLOT_HEIGHT - 1, //60 - border 1px
    border: "1px solid transparent",
    borderRight: 0,
    borderBottom: 0,
    position: "relative",
  },
  timeTo: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: -10,
    fontSize: 12,
  },
  cells: {
    position: "relative",
    flexGrow: 1,
  },
}));

function DayColumn(props) {
  const { classes } = props;
  return (
    <Grid item className={classes.day}>
      <DayTimeline />
    </Grid>
  );
}

function TimeSlot(props) {
  const { classes, time } = props;
  return (
    <div className={classes.timeSlot}>
      <Typography className={classes.timeTo}>{time}</Typography>
    </div>
  );
}

function getCurrentWeekEvents(eventsData, activeWeek) {
  const currentWeekEvents = [];
  eventsData.forEach((event) => {
    const { fromDate } = event;
    if (isDateExistInWeek(activeWeek, fromDate)) {
      currentWeekEvents.push(event);
    }
  });
  return currentWeekEvents;
}

function WeekGrid(props) {
  const { activeWeek } = props;
  const classes = useStyles();
  const timeSlots = getTimeSlots();
  const { eventsData } = useContext(CalendarContext);
  const currentWeekEvents = getCurrentWeekEvents(eventsData, activeWeek);

  return (
    <div className={classes.root} id="week-grid">
      <Grid container justify="flex-start">
        <Grid item id="time-slots">
          {timeSlots.map((time, i) => (
            <TimeSlot key={i} time={time} classes={classes} />
          ))}
        </Grid>
        <Grid item className={classes.cells}>
          <Grid container justify="flex-start">
            {activeWeek.map((day, i) => (
              <DayColumn key={i} classes={classes} />
            ))}
          </Grid>

          {currentWeekEvents.map((event) => (
            <EventChip
              key={event.id}
              from={event.fromDate}
              to={event.toDate}
              title={event.title}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default WeekGrid;
