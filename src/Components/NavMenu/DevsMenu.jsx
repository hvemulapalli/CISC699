import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Components/Admin/style.css';
import {NavLink} from 'react-router-dom';

class DevsMenu extends Component {
    render() {
        return (
          <div>
          <div className="img-div text-center shadow-sm">
          <h2>Ticketing</h2>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light admin-menu">
          <ul className="admin-details list-unstyled">
              <li className="nav-item nav__menu-item">
                  <NavLink to="/devs/sprints" className="nav-link text-reset text-decoration-none"><i className="fas fa-tachometer-alt pe-2"></i><span>Sprints</span>
                  </NavLink>
              </li>
              
              <li className="nav-item nav__menu-item">
                  <NavLink to="/devs/stories" className="nav-link text-reset text-decoration-none"><i className="fas fa-columns pe-2"></i><span>Stories</span>
                  </NavLink>
              </li>
              <li className="nav-item nav__menu-item">
                  <NavLink to="/devs/bugs" className="nav-link text-reset text-decoration-none"><i className="fas fa-columns pe-2"></i><span>Bugs</span>
                  </NavLink>
              </li>
            </ul>
      </nav>
      </div>
        )
    }
}

export default DevsMenu
