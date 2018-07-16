import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from './Login';
import Data from './Data';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <PrivateRoute path="/data" exact component={Data}/>
        </Switch>
    </BrowserRouter>
);

export default App;
