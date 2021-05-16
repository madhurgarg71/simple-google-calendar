import { makeStyles, Typography } from "@material-ui/core";
import dayjs from "dayjs";

const MIN_HEIGHT = 15;
// `calc((${60 / 60}px * ${4}))`,
const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
    display: "inline-block",
    position: "absolute",
    left: (props) => `calc((100%/7) * ${props.dayDifference})`,
    top: (props) => props.top,
    height: (props) => {
      const { possibleHeight } = props;
      if (possibleHeight < MIN_HEIGHT) {
        return MIN_HEIGHT;
      }
      return possibleHeight;
    },
    fontWeight: "600",
    backgroundColor: "#e91e63",
    color: "#fff",
    borderRadius: 4,
    width: (props) => `calc(((100%)/7)*${1})`,
  },
  title: {
    fontSize: 12,
    pointerEvents: "none",
  },
}));

function EventChip(props) {
  const { from, to, title, eventId } = props;
  const startDayOfWeek = dayjs(from).startOf("week");
  const dayDifference = from.diff(startDayOfWeek, "day");
  const possibleHeight = to.diff(from, "minute");
  const top = from.hour() * 60 + from.minute();
  const classes = useStyles({ dayDifference, possibleHeight, top });

  return (
    <div data-eventid={eventId} className={`event-chip ${classes.root}`}>
      <Typography className={classes.title}>{title}</Typography>
    </div>
  );
}

export default EventChip;
