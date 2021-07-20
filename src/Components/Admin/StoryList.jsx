import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Admin/style.css";
import Navmenu from "../NavMenu/Navmenu";
import axios from "axios";
class StoryList extends Component {
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

          story_created_by: {
            id: 2,
            name: "kumar",
          },

          story_assignee: {
            id: 1,
            name: "k",
          },

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

          story_created_by: {
            id: 2,
            name: "kumar",
          },

          story_assignee: {
            id: 1,
            name: "k",
          },

          story_completed_hours: 1,

          story_estimated_hours: 2,

          story_sprint: 2,
        },
        {
          story_id: 3,

          story_name: "test",

          story_description: "sdfsdf",

          story_priority: "high",

          story_points: 1,

          story_status: "active",

          story_created_by: {
            id: 1,
            name: "k",
          },

          story_assignee: {
            id: 2,
            name: "kumar",
          },

          story_completed_hours: 1,

          story_estimated_hours: 2,

          story_sprint: 2,
        },
      ],
      users: [
        {
          user_id: 1,
          emp_id: 1,
          user_name: "k",
          user_email: "sdfsdf",
          user_password: "sdfsdf",
          user_phone_number: 14565,
          role_type: "developer",
          role: "user",
        },
        {
          user_id: 2,
          emp_id: 1,
          user_name: "kumar",
          user_email: "sdfsdf",
          user_password: "sdfsdf",
          user_phone_number: 14565,
          role_type: "developer",
          role: "user",
        },
      ],
      story_name: "",
      story_description: "",
      story_priority: "",
      story_points: "",
      story_status: "",
      story_created_by: localStorage.getItem("id"),
      story_assignee: "",
      story_completed_hours: "0",
      story_estimated_hours: "",
      story_id: "",
      sprint_id: "",
    };
    this.updateStory = this.updateStory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { name } = event.target;
    this.setState({ ...this.state, [name]: event.target.value });
  }
  getUsersList() {
    const port = localStorage.getItem("port");
    axios
      .get(port + "/userslist")
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(res.data.body);
          this.setState({ users: res.data.body });
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
  updateStory() {
    const port = localStorage.getItem("port");
    const data = {
      story_id: this.state.story_id,
      story_name: this.state.story_name,
      story_description: this.state.story_description,
      story_priority: this.state.story_priority,
      story_points: this.state.story_points,
      story_status: this.state.story_status,
      story_assignee: this.state.story_assignee,
      story_completed_hours: this.state.story_completed_hours,
      story_estimated_hours: this.state.story_estimated_hours,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(port + "/updatestory", data, headers)
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(data);
          console.log(res.data.body);
          window.alert(res.data.body);
          this.getListOfStories();
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
    this.setState({
      story_id: "",
      story_name: "",
      story_description: "",
      story_priority: "",
      story_points: "",
      story_status: "",
      story_assignee: "",
      story_completed_hours: "",
      story_estimated_hours: "",
    });
  }
  componentDidMount() {
    this.getUsersList();
    this.getSprints();
    this.getListOfStories();
  }

  render() {
    return (
      <>
        <div className="dashboard-content">
          <div id="menu_nav" className={this.state.active && "active"}>
            <div id="side-menu" className={this.state.active && "active"}>
              <Navmenu />
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
                        <div className="d-none d-xl-inline-block">Admin</div>
                      </p>
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
                {this.state.sprints.length !== 0 && (
                  <div>
                    {this.state.sprints.map((r, index) => (
                      <div className="accordion">
                        <div className="accordion-item" key={index}>
                          <h2 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button fw-bold"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={"#new" + r.sprint_id}
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              {r.sprint_name}
                            </button>
                          </h2>
                          <table
                            id={"new" + r.sprint_id}
                            className="accordion-collapse collapse table table-bordered"
                            aria-labelledby="headingOne"
                          >
                            <thead>
                              <tr>
                                <th scope="col">Story Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Points</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Assignee</th>
                                <th scope="col">Estimated Hours</th>
                                <th scope="col">Completed Hours</th>
                                <th scope="col">Edit</th>
                              </tr>
                            </thead>

                            {this.state.stories.length === 0 && (
                              <div>No stories found</div>
                            )}
                            {this.state.stories.length !== 0 && (
                              <tbody>
                                {this.state.stories
                                  .filter((e) => e.story_sprint === r.sprint_id)
                                  .map((p, i) => (
                                    <tr key={i}>
                                      <td>{p.story_name}</td>
                                      <td>{p.story_description}</td>
                                      <td>{p.story_priority}</td>
                                      <td>{p.story_points}</td>
                                      <td>{p.story_status}</td>
                                      <td>{p.story_created_by.name}</td>
                                      <td>{p.story_assignee.name}</td>
                                      <td>{p.story_estimated_hours}</td>
                                      <td>{p.story_completed_hours}</td>
                                      <td>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          data-bs-toggle="modal"
                                          data-bs-target="#updatestory"
                                          onClick={() => {
                                            localStorage.setItem(
                                              "sprint_id",
                                              p.story_sprint
                                            );
                                            this.setState({
                                              story_id: p.story_id,
                                              story_name: p.story_name,
                                              story_description:
                                                p.story_description,
                                              story_priority: p.story_priority,
                                              story_points: p.story_points,
                                              story_status: p.story_status,
                                              story_created_by:
                                                p.story_created_by.id,
                                              story_assignee:
                                                p.story_assignee.id,
                                              story_completed_hours: 0,
                                              story_estimated_hours:
                                                p.story_estimated_hours,
                                            });
                                          }}
                                        >
                                          Edit
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className="modal fade"
              id="updatestory"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title fw-bold" id="exampleModalLabel">
                      Update Story
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div className="mb-3">
                          <label className="form-label">Story Name</label>
                          <textarea
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            name="story_name"
                            value={this.state.story_name}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="mb-3">
                          <label className="form-label">Priority</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="story_priority"
                            value={this.state.story_priority}
                            onChange={this.handleChange}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div className="mb-3">
                          <label className="form-label">Points</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="story_points"
                            value={this.state.story_points}
                            onChange={this.handleChange}
                          >
                            <option value={this.state.story_points} selected>{this.state.story_points}</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="story_status"
                            value={this.state.story_status}
                            onChange={this.handleChange}
                          >
                            <option  value={this.state.story_status} selected> {this.state.story_status}</option>
                            <option value="done">Done</option>
                            <option value="to be verified">
                              To be verified
                            </option>
                            <option value="in progress">In Progress</option>
                            <option value="redo">Redo</option>
                            <option value="to do">To do</option>
                            <option value="hold">hold</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div class="mb-3">
                          <label className="form-label">Assignee</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="story_assignee"
                            value={this.state.story_assignee}
                            onChange={this.handleChange}
                          >
                            {this.state.users.length !== 0 && (
                              <React.Fragment>
                                {this.state.users.map((p, index) => (
                                  <option key={index} value={p.user_id}>
                                    {p.user_name}
                                  </option>
                                ))}
                              </React.Fragment>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div className="mb-3">
                          <label className="form-label">Estimated Hours</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput3"
                            name="story_estimated_hours"
                            value={this.state.story_estimated_hours}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                        <div className="mb-3">
                          <label className="form-label">Completed Hours</label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput3"
                            name="story_completed_hours"
                            value={this.state.story_completed_hours}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Story Description
                          </label>
                          <textarea
                            type="text"
                            style={{ height: 300 }}
                            className="form-control"
                            id="exampleFormControlInput3"
                            name="story_description"
                            value={this.state.story_description}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 text-end">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-dismiss="modal"
                          onClick={this.updateStory}
                        >
                          Update Story
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StoryList;
