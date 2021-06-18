import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AdminLogin from './Admin/AdminLogin';
import SprintList from './Admin/SprintList';
import StoryList from './Admin/StoryList';
import BugsList from './Admin/BugsList';
import UsersList from './Admin/UsersList';
import Dashboard from './Admin/Dashboard';
import Dummy from './Admin/Dummy';
export default function RouterExample() {
  return (
    <Router>
      <div>
       <Switch>
        <Route exact path="/">
            <AdminLogin />
          </Route>
          {/* Routing for admin */}
          <Route exact path="/admin/sprints">
            <SprintList/>
          </Route>
          <Route exact path="/admin/users">
            <UsersList />
          </Route>
          <Route exact path="/admin/stories">
            <StoryList />
          </Route>
          <Route exact path="/admin/bugs">
            <BugsList />
          </Route>
         {/* Routing for User */}
         <Route exact path="/users/home">
         <Dummy/>
          </Route>
          <Route exact path="/users/sprints">
          <Dashboard/>
          </Route>
          <Route exact path="/users/stories">
            <Dummy/>
          </Route>
          <Route exact path="/users/bugs">
            <Dummy />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}






