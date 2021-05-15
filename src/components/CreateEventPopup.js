import React, { useState } from "react";
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

function CreateEventPopup(props) {
  const { isOpen = true, onClose, onSave } = props;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [title, setTitle] = useState();
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave({
      title,
      from: dayjs(from),
      to: dayjs(to),
    });
    onClose();
  };

  const handleFromDateChange = (evt) => {
    setFrom(evt.target.value);
  };

  const handleToDateChange = (evt) => {
    setTo(evt.target.value);
  };

  return (
    <div>
      <Dialog className={classes.root} open={isOpen} onClose={handleClose}>
        <DialogTitle>Create new event</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.title}
            fullWidth
            label="Add Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="From"
            type="datetime-local"
            onChange={handleFromDateChange}
          />

          <TextField
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
export default CreateEventPopup;
