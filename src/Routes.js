import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage'
import HourlyForecast from './components/HourlyForecast'
import { routes } from './config';

const {
  HOME_PAGE,
  HOURLY_FORECAST,
} = routes;

class Routes extends Component {
  render() {
    return (
      <Router >
        <React.Fragment>
          <Switch>
            <Route exact path={HOME_PAGE} component={HomePage} />
            <Route exact path={HOURLY_FORECAST} component={HourlyForecast} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default Routes;
