import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Admin/style.css";
import DevsMenu from "../NavMenu/DevsMenu";
import axios from "axios";
class DevsSprints extends Component {
  constructor(props) {
    super(props);
    this.addActiveClass = this.addActiveClass.bind(this);
    this.state = {
      active: false,
      sprints: [
        {
          sprint_id: 1,
          sprint_name: "sprint 1",
          sprint_duration: 15,
          sprint_start_time: "2021-06-05",
          sprint_end_time: "2021-06-20",
          sprint_admin: 1,
        },
      ],
    };
   
  }
  
  getSprints() {
    const port = localStorage.getItem("port");
    axios
      .get(port + "/getallsprints")
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(res.data.body);
          this.setState({ sprints: res.data.body });
        } else if (res.data.statuscode === 400) {
          console.log(res.data.body);
          window.alert(res.data.body);
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
 

  componentDidMount() {
    this.getSprints();
 
  }
  addActiveClass(index) {
    const activeClasses = [
      ...this.state.activeClasses.slice(0, index),
      !this.state.activeClasses[index],
      this.state.activeClasses.slice(index + 1),
    ].flat();
    this.setState({ activeClasses });
  }
 
  render() {
    return (
      <>
        <div className="dashboard-content">
          <div id="menu_nav" className={this.state.active && "active"}>
            <div id="side-menu" className={this.state.active && "active"}>
              <DevsMenu />
            </div>
            <div
              id="menu-backdrop"
              onClick={() => this.setState({ active: !this.state.active })}
            ></div>
          </div>
          <div id="side-wrapper" className={this.state.active && "active"}>
            <div className="header shadow-sm">
              <nav className="navbar navbar-expand navbar-light bg-admin">
                <div className="container-fluid">
                  <button
                    className="btn btn-light btn-circle text-theme order-1 order-sm-0"
                    id="sidebarCollapse"
                    onClick={() =>
                      this.setState({ active: !this.state.active })
                    }
                  >
                    <i className="fas fa-th"></i>
                  </button>
                  <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown no-arrow">
                      <p
                        className="nav-link dropdown-toggle pt-1"
                        id="userDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="far fa-user"></i>
                        <div className="d-none d-xl-inline-block">Developer</div>
                      </p>
                      <div
                        className="dropdown-menu dropdown-menu-end logout"
                        aria-labelledby="userDropdown"
                      >
                        <p
                          className="dropdown-item"
                          data-toggle="modal"
                          data-target="#logoutModal"
                          onClick={() => {
                            window.location.href = window.location.origin;
                          }}
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          Logout
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="wrapper-content p-4 text-start">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-primary fw-bold">Sprints List</h5>
                 
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sprint Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.sprints.length ===0 && <p>No sprints found</p>}
                      {this.state.sprints.length !== 0 && (
                        <React.Fragment>
                          {this.state.sprints.map((p, index) => (
                            <tr key={index}>
                              <td>{p.sprint_name}</td>
                              <td>{p.sprint_duration}</td>
                              <td>{p.sprint_start_time.split('T')[0]}</td>
                              <td>{p.sprint_end_time.split('T')[0]}</td>
                             
                            </tr>
                          ))}
                        </React.Fragment>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

    

      </>
    );
  }
}

export default DevsSprints;
