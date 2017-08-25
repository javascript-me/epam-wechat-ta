import React from 'react';
import {
  Route,
  IndexRoute
} from 'react-router';
import App from './components/App';
import Homepage from './components/home/HomePage';
import JobDetailPage from './components/jobDetail/JobDetailPage';
import JobApplicationPage from './components/jobApplication/JobApplicationPage';
import RolesPage from './components/roles/RolesPage';

export default (
    <Route path = "/" component = {App} >
        <IndexRoute component={Homepage}/>
        <Route path="/:search" component={Homepage}/>
        <Route path="/job/:id" component={JobDetailPage} />
        <Route path="/apply/:id" component={JobApplicationPage}/>
    </Route>
);
