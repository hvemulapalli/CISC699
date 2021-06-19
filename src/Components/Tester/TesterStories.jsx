import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Admin/style.css";

import axios from "axios";
import UserMenu from "../NavMenu/UserMenu";
export default class TesterStories extends Component {
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
      stories: [
        {
          story_id: 1,

          story_name: "one",

          story_description: "sdfsdf",

          story_priority: "high",

          story_points: 1,

          story_status: "active",

          story_created_by: 1,

          story_assignee: 2,

          story_completed_hours: 1,

          story_estimated_hours: 2,

          story_sprint: 1,
        },
        {
          story_id: 2,

          story_name: "two",

          story_description: "sdfsdf",

          story_priority: "high",

          story_points: 1,

          story_status: "active",

          story_created_by: 1,

          story_assignee: 2,

          story_completed_hours: 1,

          story_estimated_hours: 2,

          story_sprint: 2,
        },
        {
          story_id: 2,

          story_name: "two",

          story_description: "sdfsdf",

          story_priority: "high",

          story_points: 1,

          story_status: "active",

          story_created_by: 1,

          story_assignee: 2,

          story_completed_hours: 1,

          story_estimated_hours: 2,

          story_sprint: 2,
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
  getListOfStories() {
    const port = localStorage.getItem("port");
    axios
      .get(port + "/getlistofstories")
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(res.data.body);
          this.setState({ stories: res.data.body });
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
  componentDidMount() {
    this.getSprints();
    this.getListOfStories();
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
                  <h5 className="mb-0 text-primary fw-bold">Story List</h5>
                </div>

                <div className="card-body">
                  {this.state.sprints.length !== 0 && (
                    <React.Fragment>
                      {this.state.sprints.map((r, index) => (
                        <div key={index}>
                          <h5 className="mb-0 text-primary fw-bold">
                            {r.sprint_name}
                          </h5>
                          {this.state.stories.length=== 0 &&<div>No storiess found</div>}
                          {this.state.stories.length !== 0 && (
                            <React.Fragment>
                              {this.state.stories
                                .filter((e) => e.story_sprint === r.sprint_id)
                                .map((p, i) => (
                                  <div className="row">
                                    <div className="offset-md-2 col-md-6">
                                      <div className="card card-body shadow-sm">
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Story Name :</p>
                                        <p>{p.story_name}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Story Description :</p>
                                          
                                          <p>{p.story_description}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Story Priority :</p>
                                          
                                          <p>{p.story_priority}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Story Points :</p>
                                          
                                          <p>{p.story_points}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Story Status :</p>
                                          
                                          <p>{p.story_status}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Story Created By :</p>
                                          
                                          <p>{p.story_created_by}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Story Asignee :</p>
                                        <p>{p.story_assignee}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" > Story Completed Hours :</p>
                                          <p>{p.story_completed_hours}</p>
                                        </div>
                                        <div className="d-flex d-flex justify-content-around">
                                          <p className="fw-bold" >Story Estimated Hours :</p>
                                          
                                          <p >{p.story_estimated_hours}</p>
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

 
