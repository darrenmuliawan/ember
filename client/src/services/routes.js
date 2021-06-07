import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardPage from '../screens/Dashboard/Dashboard';

const Routes = () => {
    return (
        <Switch>
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
    )
}

export default Routes;