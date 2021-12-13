//* eslint-disable padded-blocks *
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
// import { isTouched } from '../../../../helpers/helpers';

const EditDialog = ({
  open, onClose, onSubmit,
}) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
  });
  const onHandleChangeData = (event) => {
    const { value } = event.target;
    setValues({
      ...values,
      name: value.name,
      email: value.email,
    });
  };
  return (
    <Box>
      <Dialog open={open}>
        <DialogTitle>Edit Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Your Trainee Details
          </DialogContentText>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={values.name}
                fullWidth
                onChange={onHandleChangeData}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                value={values.email}
                fullWidth
                onChange={onHandleChangeData}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            // disabled={!isTouched(touched)}
            onClick={onSubmit}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditDialog;
