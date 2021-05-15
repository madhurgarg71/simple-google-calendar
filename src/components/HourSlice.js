import { makeStyles } from "@material-ui/core";
import { TIME_SLOT_HEIGHT } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    height: TIME_SLOT_HEIGHT - 1,
    width: "100%",
    border: "1px solid #dfdfdf",
    borderRight: 0,
    borderBottom: 0,
  },
}));

function HourSlice(from, to) {
  const classes = useStyles();
  return <div className={`hour-slice ${classes.root}`}></div>;
}

export default HourSlice;
