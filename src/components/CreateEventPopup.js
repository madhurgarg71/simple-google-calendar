import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField, makeStyles } from "@material-ui/core";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  toDate: {
    marginLeft: 20,
  },
  title: {
    marginBottom: 20,
  },
}));

const DEFAULT_TITLE = "(No Title)";

function CreateEventPopup(props, ref) {
  const {
    isOpen = true,
    onClose,
    onSave,
    scrollGrid,
    fromDate,
    toDate,
  } = props;
  const [from, setFrom] = useState(fromDate);
  const [to, setTo] = useState(toDate);
  const [title, setTitle] = useState();
  const [fromDateError, setFromDateError] = useState();
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave({
      title: title ?? DEFAULT_TITLE,
      from,
      to,
    });
    onClose();
  };

  const handleFromDateChange = (evt) => {
    setFrom(dayjs(evt.target.value));
  };

  const handleToDateChange = (evt) => {
    setTo(dayjs(evt.target.value));
  };

  const validateFromDate = () => {
    if (!from || !to) {
      return;
    }
    const fromGreaterThanTo = dayjs(from).isAfter(dayjs(to));
    const fromEqualTo = dayjs(from).isSame(dayjs(to), "minutes");

    if (!fromGreaterThanTo && !fromEqualTo) {
      setFromDateError({
        error: false,
        text: "",
      });
      return;
    }

    setFromDateError({
      error: true,
      text: "From time must be less than To time",
    });
  };

  useEffect(() => {
    /* eslint-disable */
    validateFromDate();
    const scrollAmount = from.hour() * 60 + from.minute();
    scrollGrid(scrollAmount);
  }, [from, to]);

  useImperativeHandle(
    ref,
    () => ({
      setEventFromDate: setFrom,
      setEventToDate: setTo,
    }),
    []
  );

  return (
    <div>
      <Dialog className={classes.root} open={isOpen} onClose={handleClose}>
        <DialogTitle>Create new event</DialogTitle>
        <DialogContent>
          <TextField
            value={title}
            className={classes.title}
            fullWidth
            label="Add Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            value={from.format("YYYY-MM-DDTHH:mm")}
            error={fromDateError?.error}
            helperText={fromDateError?.text}
            label="From"
            type="datetime-local"
            onChange={handleFromDateChange}
          />

          <TextField
            value={to.format("YYYY-MM-DDTHH:mm")}
            className={classes.toDate}
            label="To"
            type="datetime-local"
            onChange={handleToDateChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default forwardRef(CreateEventPopup);
