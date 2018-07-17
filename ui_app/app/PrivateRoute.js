import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem('access_token');
  const render = (props) => {
    if (isLoggedIn) {
      const Component = component;
      return <Component {...props}/>;
    }
    return <Redirect to="/"/>;
  };

  return <Route
    {...rest}
    render={render}
  />;
};

export default PrivateRoute;