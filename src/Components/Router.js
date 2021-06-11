import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AdminLogin from './Admin/AdminLogin';
import AddUser from './Admin/AddUser';



export default function RouterExample() {
  return (
    <Router>
      <div>
      

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
        <Route exact path="/">
            <AdminLogin />
          </Route>
          <Route exact path="/home">
            <AddUser />
          </Route>
         
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.




