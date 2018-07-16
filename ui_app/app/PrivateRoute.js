import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = (props) => {
    const isLoggedIn = true;
    if (isLoggedIn) {
        const Component = props.component;
        return <Route {...props}/>
    }
    return <Redirect to="/"/>
}

export default PrivateRoute;