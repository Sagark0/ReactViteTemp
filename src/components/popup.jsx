import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup({isDisabled, handleSubmitTest, unansweredQuestions, open, setOpen}) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ mx: 'auto', my: '15px' }}
        disabled={isDisabled}
        onClick={handleClickOpen}>
        Submit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to submit the test?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Unanswered Questions: 
            {unansweredQuestions.map( (q) => {
                return <React.Fragment  key={q}>{q > 0 && ', '} { q+1}</React.Fragment>
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button color="success" onClick={handleSubmitTest} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}