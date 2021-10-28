import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { PrivateLayout } from '../layouts';

const PrivateRoute = ({
  exact, path, component: Component,
}) => (
  <Route
    exact={exact}
    path={path}
    render={
      ({
        match,
        history,
        location,
      }) => (
        <PrivateLayout
          match={match}
          history={history}
          location={location}
        >
          <Component />
        </PrivateLayout>
      )
    }
  />
);

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
