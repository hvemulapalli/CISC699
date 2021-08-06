import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Components/Admin/style.css';
import {NavLink} from 'react-router-dom';

export default class ManagerMenu extends Component {
    render() {
        return (
          <div>
          <div className="img-div text-center shadow-sm">
          <h4>Manager Panel</h4>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light admin-menu">
          <ul className="admin-details list-unstyled">
              <li className="nav-item nav__menu-item">
                  <NavLink to="/manager/sprints" className="nav-link text-reset text-decoration-none"><i className="fas fa-tachometer-alt pe-2"></i><span>Sprints</span>
                  </NavLink>
              </li>
              
              <li className="nav-item nav__menu-item">
                  <NavLink to="/manager/stories" className="nav-link text-reset text-decoration-none"><i className="fas fa-columns pe-2"></i><span>Stories</span>
                  </NavLink>
              </li>
              <li className="nav-item nav__menu-item">
                  <NavLink to="/manager/bugs" className="nav-link text-reset text-decoration-none"><i className="fas fa-columns pe-2"></i><span>Bugs</span>
                  </NavLink>
              </li>
            </ul>
      </nav>
      </div>
        )
    }
}

