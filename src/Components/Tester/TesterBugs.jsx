import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Admin/style.css";
import axios from 'axios';
import UserMenu from "../NavMenu/UserMenu";
export default class TesterBugs extends Component {
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
          sprint_start_time: "2021-06-05T",
          sprint_end_time: "2021-06-20T18",
          sprint_admin: 1,
        },
        {
          sprint_id: 2,
          sprint_name: "sprint 2",
          sprint_duration: 15,
          sprint_start_time: "2021-06-05T",
          sprint_end_time: "2021-06-20T18",
          sprint_admin: 1,
        },
      ],
      bugs: [
        {
          bug_id: 3,

          bug_name: "one",

          bug_description: "sdfsdf",

          bug_priority: "high",

          bug_points: 1,

          bug_status: "active",

          bug_created_by: 1,

          bug_assignee: 2,

          bug_completed_hours: 1,

          bug_estimated_hours: 2,

          bug_sprint: 1,
        },
        {
          bug_id: 3,

          bug_name: "one",

          bug_description: "sdfsdf",

          bug_priority: "high",

          bug_points: 1,

          bug_status: "active",

          bug_created_by: 1,

          bug_assignee: 2,

          bug_completed_hours: 1,

          bug_estimated_hours: 2,

          bug_sprint: 1,
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
        if (res.data.statuscode == 200) {
          console.log(res.data.body);
          this.setState({ sprints: res.data.body });
        } else if (res.data.statuscode == 400) {
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
  addActiveClass(index) {
    const activeClasses = [
      ...this.state.activeClasses.slice(0, index),
      !this.state.activeClasses[index],
      this.state.activeClasses.slice(index + 1),
    ].flat();
    this.setState({ activeClasses });
  }
  getListOfBugs(){
    const port=localStorage.getItem('port');
    axios.get(port + "/listbugs")
    .then((res) => {
     console.log(res.data);
     if (res.data.statuscode === 200) {
      console.log(res.data.body);
      this.setState({bugs:res.data.body})
     } else if (res.data.statuscode === 400) {
       console.log(res.data.body);
      
     } else {
       return false;
     }
   })
   .catch((error) => {
     console.log(error);
   });
}
componentDidMount(){
  this.getSprints();
    this.getListOfBugs();
}
  render() {
    return (
      <>
        <div className="dashboard-content">
          <div id="menu_nav" className={this.state.active && "active"}>
            <div id="side-menu" className={this.state.active && "active"}>
              <UserMenu />
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
                      <a
                        className="nav-link dropdown-toggle pt-1"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="far fa-user"></i>
                        <div className="d-none d-xl-inline-block">Tester</div>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-end logout"
                        aria-labelledby="userDropdown"
                      >
                        <a
                          className="dropdown-item"
                          href={window.location.origin}
                          data-toggle="modal"
                          data-target="#logoutModal"
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          Logout
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="wrapper-content p-4 text-start">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white">
                  <h5 className="mb-0 text-primary fw-bold">Bugs List</h5>
                </div>
                <div className="card-body">
                  {this.state.sprints.length !== 0 && (
                    <React.Fragment>
                      {this.state.sprints.map((r, index) => (
                        <div key={index}>
                          <h5 className="mb-0 text-primary fw-bold">
                            {r.sprint_name}
                          </h5>
                          {this.state.bugs.length=== 0 &&<div>No bugs found</div>}
                          {this.state.bugs.length !== 0 && (
                            <React.Fragment>
                              {this.state.bugs
                                .filter((e) => e.bug_sprint === r.sprint_id)
                                .map((p, i) => (
                                  <div className="row">
                                    <div className="offset-md-2 col-md-6">
                                      <div className="card card-body shadow-sm">
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Bug Name :</p>
                                        <p>{p.bug_name}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Bug Description :</p>
                                          
                                          <p>{p.bug_description}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Bug Priority :</p>
                                          
                                          <p>{p.bug_priority}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Bug Points :</p>
                                          
                                          <p>{p.bug_points}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Bug Status :</p>
                                          
                                          <p>{p.bug_status}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Bug Created By :</p>
                                          
                                          <p>{p.bug_created_by}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Bug Asignee :</p>
                                        <p>{p.bug_assignee}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" > Bug Completed Hours :</p>
                                          <p>{p.bug_completed_hours}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Bug Estimated Hours :</p>
                                          
                                          <p >{p.bug_estimated_hours}</p>
                                        </div>
                                        
                                      </div>
                                    </div>
                                   
                                  </div>
                                ))}
                            </React.Fragment>
                          )}
                        </div>
                      ))}
                    </React.Fragment>
                  )}
                </div>
 </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}


