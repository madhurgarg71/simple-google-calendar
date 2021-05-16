import { makeStyles } from "@material-ui/core";
import { TIME_SLOT_HEIGHT } from "../constants";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    height: TIME_SLOT_HEIGHT - 1,
    width: "100%",
    border: "1px solid #dfdfdf",
    borderRight: 0,
    borderBottom: 0,
  },
}));

function HourSlice(props) {
  const { from, to } = props;
  const classes = useStyles();

  return (
    <div
      data-from={dayjs(from).format("YYYY-MM-DDTHH:mm")}
      data-to={dayjs(to).format("YYYY-MM-DDTHH:mm")}
      className={`hour-slice ${classes.root}`}
    ></div>
  );
}

export default HourSlice;
