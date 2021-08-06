import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminLogin from "./Admin/AdminLogin";
import SprintList from "./Admin/SprintList";
import StoryList from "./Admin/StoryList";
import BugsList from "./Admin/BugsList";
import UsersList from "./Admin/UsersList";
import TesterStories from "./Tester/TesterStories";
import TesterSprints from "./Tester/TesterSprints";
import TesterBugs from "./Tester/TesterBugs";
import DevsSprints from "./Developer/DevsSprints";
import DevsBugs from "./Developer/DevsBugs";
import DevsStories from "./Developer/DevsStories";
import ManagerBugs from "./Manager/ManagerBugs";
import ManagerSprints from "./Manager/ManagerSprints";
import ManagerStories from "./Manager/ManagerStories";
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
            <SprintList />
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
          {/* Routing for tester */}
          <Route exact path="/tester/sprints">
            <TesterSprints />
          </Route>
          <Route exact path="/tester/stories">
            <TesterStories />
          </Route>
          <Route exact path="/tester/bugs">
            <TesterBugs />
          </Route>
          {/* Routing for developer */}
          <Route exact path="/devs/sprints">
            <DevsSprints />
          </Route>
          <Route exact path="/devs/stories">
            <DevsStories />
          </Route>
          <Route exact path="/devs/bugs">
            <DevsBugs />
          </Route>
           {/* Routing for Manager */}
           <Route exact path="/manager/sprints">
            <ManagerSprints />
          </Route>
          <Route exact path="/manager/stories">
            <ManagerStories />
          </Route>
          <Route exact path="/manager/bugs">
            <ManagerBugs />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
