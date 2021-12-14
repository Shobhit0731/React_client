import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
  TextFieldDemo, InputDemo, ChildrenDemo, Trainee, Login, PageNotFound,
} from './pages';
import theme from './theme';
import { AuthRoute, PrivateRoute } from './routes';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Switch>
          <PrivateRoute exact path="/" component={Trainee} />
          <PrivateRoute path="/trainee" component={Trainee} />
          <PrivateRoute exact path="/textFieldDemo" component={TextFieldDemo} />
          <PrivateRoute exact path="/inputDemo" component={InputDemo} />
          <PrivateRoute exact path="/childrenDemo" component={ChildrenDemo} />
          <AuthRoute exact path="/login" component={Login} />
          <PrivateRoute component={PageNotFound} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>

  );
}

export default App;
