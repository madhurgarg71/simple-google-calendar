import { Typography, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100%/7)",
    height: 120,
    border: "1px solid #dfdfdf",
    borderRight: 0,
    alignContent: "center",
  },
  capitalize: {
    textTransform: "uppercase",
  },
  textCenter: {
    textAlign: "center",
  },
  cell: {
    padding: 5,
  },
}));

function WeekDayBox(props) {
  const { dayOfTheWeek, dayOfTheMonth } = props;
  const classes = useStyles();
  return (
    <Grid container className={classes.root} justify="center">
      <Grid className={classes.cell} item>
        <Typography
          className={`${classes.textCenter} ${classes.capitalize}`}
          variant="body2"
        >
          {dayOfTheWeek}
        </Typography>
        <Typography className={classes.textCenter} variant="h4">
          {dayOfTheMonth}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default WeekDayBox;
