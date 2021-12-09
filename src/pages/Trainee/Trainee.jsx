import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { TraineeList, TraineeDetail } from '.';

const Trainee = (props) => {
  const { match: { path } } = props;

  return (
    <Switch>
      <Route exact path={path} component={TraineeList} />
      <Route
        exact
        path={`${path}/:id`}
        component={(match) => <TraineeDetail match={match.match.params} />}
      />
    </Switch>
  );
};
Trainee.propTypes = {
  match: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Trainee;
