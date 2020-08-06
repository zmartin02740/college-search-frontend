import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Results from './pages/Results';
import Search from './pages/Search';
import CollegeDetails from './pages/CollegeInfo';

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Results} />
        <Route path="/colleges/:name" component={CollegeDetails} />
        {/* <Route exact path="/" component={Search} /> */}
      </Switch>
    </Router>
  )
}