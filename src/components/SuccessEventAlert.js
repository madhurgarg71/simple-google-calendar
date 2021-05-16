import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SuccessEventAlert(props) {
  const { open, onClose } = props;
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity="success">
        Event Saved
      </Alert>
    </Snackbar>
  );
}
export default SuccessEventAlert;
