import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Components/Admin/style.css';


class Navmenu extends Component {
    render() {
        return (
          <div>
          <div className="img-div text-center shadow-sm">
          <h2>Ticketing</h2>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light admin-menu">
          <ul className="admin-details list-unstyled">
              <li className="nav-item nav__menu-item">
                  <a href="/" className="nav-link text-reset text-decoration-none"><i className="fas fa-tachometer-alt pe-2"></i><span>Dashboard</span>
                  </a>
              </li>
              
              <li className="nav-item nav__menu-item">
                  <a href="/" className="nav-link text-reset text-decoration-none"><i className="fas fa-users pe-2"></i><span>Users</span>
                  </a>
              </li>
              <li className="nav-item nav__menu-item">
                  <a href="/" className="nav-link text-reset text-decoration-none"><i className="fas fa-columns pe-2"></i><span>Sprints</span>
                  </a>
              </li>
                         
              {/* <li className="nav-item nav__menu-item">
                <a className="nav-link collapsed text-reset text-decoration-none" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <i className="fas fa-book-open  pr-2"></i><span>Books</span>
                </a>
                <div className="collapse" id="collapseExample">
                  <ul className="nav__sub-menu ml-3">
                    <li><a href="/" className="nav-sub-menu-link">Add Books</a></li>
                    <li><a href="/" className="nav-sub-menu-link">View Books</a></li>
                  </ul>
                </div>
              </li> */}
              
          </ul>
      </nav>
      </div>
        )
    }
}

export default Navmenu
