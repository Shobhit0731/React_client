/* eslint-disable import/named */
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Login, Navbar, Trainee } from './pages';

function App() {
  return (
    <div>
      <CssBaseline>
        <Navbar />
        {/* <InputDemo /> */}
        {/* <TextFieldDemo /> */}
        {/* <ChildrenDemo /> */}
        <Trainee />
        <Login />
      </CssBaseline>
    </div>
  );
}

export default App;
