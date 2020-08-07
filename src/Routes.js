import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import CollegeDetails from './pages/CollegeInfo';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route path="/colleges/:name" component={CollegeDetails} />
      </Switch>
    </Router>
  )
}