import { Grid, makeStyles } from "@material-ui/core";
import WeekDayBox from "./WeekDayBox";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "100%",
    top: 64,
    left: 0,
    backgroundColor: "#fff",
    paddingLeft: 85,
    zIndex: 2,
  },
}));

function WeekHeader(props) {
  const { activeWeek } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="flex-start">
      {activeWeek.map((day) => {
        const dayOfTheWeek = day.format("ddd");
        const dayOfTheMonth = day.format("DD");
        return (
          <WeekDayBox
            key={day}
            dayOfTheWeek={dayOfTheWeek}
            dayOfTheMonth={dayOfTheMonth}
          />
        );
      })}
    </Grid>
  );
}

export default WeekHeader;
