import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/Dashboard">
                    <Dashboard />
                </Route>
                <Route path="/">
                    <Dashboard />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
