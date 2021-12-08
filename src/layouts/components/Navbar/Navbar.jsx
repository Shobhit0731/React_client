import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// import { AddDialog } from '../../../components/Trainee/components';

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1 }}>
          <Button component={Link} to="/" color="inherit">
            <Typography component="div">
              Trainee Portal
            </Typography>
          </Button>
        </Typography>
        <Button component={Link} to="/" color="inherit">TRAINEE</Button>
        <Button component={Link} to="/textFieldDemo" color="inherit">TEXTFIELD DEMO</Button>
        <Button component={Link} to="/inputDemo" color="inherit">INPUT DEMO</Button>
        <Button component={Link} to="/childrenDemo" color="inherit">CHILDREN DEMO</Button>
        <Button component={Link} to="/login" style={{ marginLeft: '35px' }} color="inherit">LOGOUT</Button>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
