import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import PageServices from 'components/pages/page-services';
import PageNotFound from 'components/pages/page-not-found';
import * as urls from './urls';

export default (
    <BrowserRouter basename="/">
        <Switch>
            <Redirect from="/" exact to="/services" />
            <Route path={urls.URL_SERVICES} component={PageServices} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    </BrowserRouter>
);
