import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '..';
import stylesPrivateRoute from './style';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <div style={stylesPrivateRoute.container}>
        {React.cloneElement(children, props)}
      </div>
    </>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateLayout;
