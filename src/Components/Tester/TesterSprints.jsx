import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Admin/style.css";
import TesterMenu from '../NavMenu/TesterMenu';
import dateFormat from "dateformat";
import axios from "axios";
class TesterSprints extends Component {
  constructor(props) {
    super(props);
    this.addActiveClass = this.addActiveClass.bind(this);
    this.state = {
      active: false,
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
      ],
      admin_id: "",
      sprint_name: "",
      sprint_duration: "15",
      sprint_start_time: "",
      sprint_end_time: "",
      sprint_admin: localStorage.getItem("id"),
      story_name: "",
      story_description: "",
      story_priority: "",
      story_points: "",
      story_status: "",
      story_created_by: localStorage.getItem("id"),
      story_assignee: "",
      story_completed_hours: "0",
      story_estimated_hours: "",
      sprint_id: localStorage.getItem("sprint_id"),
      bug_name: "",
      bug_description: "",
      bug_priority: "",
      bug_points: "",
      bug_status: "",
      bug_created_by: localStorage.getItem("id"),
      bug_assignee: "",
      bug_completed_hours: "0",
      bug_estimated_hours: "",
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
    this.handleChange = this.handleChange.bind(this);
    this.addSprint = this.addSprint.bind(this);
    this.addStory = this.addStory.bind(this);
    this.addBug = this.addBug.bind(this);
    this.editSprint = this.editSprint.bind(this);
  }
  handleChange(event) {
    const { name } = event.target;
    this.setState({ ...this.state, [name]: event.target.value });
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

  componentDidMount() {
    this.getSprints();
    this.getUsersList();
  }
  addActiveClass(index) {
    const activeClasses = [
      ...this.state.activeClasses.slice(0, index),
      !this.state.activeClasses[index],
      this.state.activeClasses.slice(index + 1),
    ].flat();
    this.setState({ activeClasses });
  }
  addSprint() {
    const port = localStorage.getItem("port");
    const data = {
      sprint_name: this.state.sprint_name,
      sprint_duration: this.state.sprint_duration,
      sprint_start_time: this.state.sprint_start_time.split('T')[0],
      sprint_end_time: this.state.sprint_end_time.split('T')[0],
      sprint_admin: localStorage.getItem("id"),
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(port + "/createsprint", data, headers)
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(data);
          console.log(res.data.body);
          window.alert(res.data.body);
          this.getSprints();
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
        sprint_name: "",
        sprint_duration: "",
        sprint_start_time: "",
        sprint_end_time:"",
        sprint_admin: localStorage.getItem("id"),
      })
  }
  addStory() {
    const port = localStorage.getItem("port");
    const data = {
      story_name: this.state.story_name,
      story_description: this.state.story_description,
      story_priority: this.state.story_priority,
      story_points: this.state.story_points,
      story_status: this.state.story_status,
      story_created_by: localStorage.getItem("id"),
      story_assignee: this.state.story_assignee,
      story_completed_hours: this.state.story_completed_hours,
      story_estimated_hours: this.state.story_estimated_hours,
      sprint_id: localStorage.getItem("sprint_id"),
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(port + "/createstory", data, headers)
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(data);
          console.log(res.data.body);
          window.alert(res.data.body);
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
        story_name: "",
        story_description: "",
        story_priority:"",
        story_points: "",
        story_status:"",
        story_created_by: localStorage.getItem("id"),
        story_assignee: "",
        story_completed_hours: "",
        story_estimated_hours: "",
        sprint_id: localStorage.getItem("sprint_id"),
      })
  }
  addBug() {
    const port = localStorage.getItem("port");
    const data = {
      bug_name: this.state.bug_name,
      bug_description: this.state.bug_description,
      bug_priority: this.state.bug_priority,
      bug_points: this.state.bug_points,
      bug_status: this.state.bug_status,
      bug_created_by: localStorage.getItem("id"),
      bug_assignee: this.state.bug_assignee,
      bug_completed_hours: this.state.bug_completed_hours,
      bug_estimated_hours: this.state.bug_estimated_hours,
      sprint_id: localStorage.getItem("sprint_id"),
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(port + "/createbugs", data, headers)
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(data);
          console.log(res.data.body);
          window.alert(res.data.body);
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
        bug_name: "",
        bug_description: "",
        bug_priority:"",
        bug_points:"",
        bug_status: "",
        bug_created_by: localStorage.getItem("id"),
        bug_assignee:"",
        bug_completed_hours:"",
        bug_estimated_hours:"",
        sprint_id: localStorage.getItem("sprint_id"),
      })
  }
  editSprint() {
    const port = localStorage.getItem("port");
    const data = {
      sprint_id: this.state.sprint_id,
      sprint_name: this.state.sprint_name,
      sprint_duration: this.state.sprint_duration,
      sprint_start_time: this.state.sprint_start_time.split('T')[0],
      sprint_end_time: this.state.sprint_end_time.split('T')[0],
      admin_id: this.state.admin_id,
    };
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(port + "/updatesprint", data, headers)
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(data);
          console.log(res.data.body);
          window.alert(res.data.body);
          this.getSprints();
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
        sprint_id: "",
        sprint_name: "",
        sprint_duration: "",
        sprint_start_time: "",
        sprint_end_time: "",
        admin_id: "",
      })
  }
  render() {
    return (
      <>
        <div className="dashboard-content">
          <div id="menu_nav" className={this.state.active && "active"}>
            <div id="side-menu" className={this.state.active && "active"}>
              <TesterMenu />
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
                        <div className="d-none d-xl-inline-block">Tester</div>
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
                  <h5 className="mb-0 text-primary fw-bold">SprintList</h5>
                  {/* <!-- Button trigger modal --> */}
                  {/* <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#CreateSprint"
                  >
                    Create Sprint
                  </button> */}
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sprint Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Create Story</th>
                        <th scope="col">Create Bug</th>
                        {/* <th scope="col">Edit Sprint</th> */}
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
                              <td>
                                {/* <!-- Button trigger modal --> */}
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#CreateStory"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "sprint_id",
                                      p.sprint_id
                                    );
                                  }}
                                >
                                  Story
                                </button>
                              </td>
                              <td>
                                {/* <!-- Button trigger modal --> */}
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#CreateBug"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "sprint_id",
                                      p.sprint_id
                                    );
                                  }}
                                >
                                  Bug
                                </button>
                              </td>
                              {/* <td>
                                
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editsprint"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "sprint_id",
                                      p.sprint_id
                                    );
                                    this.setState({
                                      sprint_id: p.sprint_id,
                                      sprint_name: p.sprint_name,
                                      sprint_duration: p.sprint_duration,
                                      sprint_start_time: p.sprint_start_time.split('T')[0],
                                      sprint_end_time: p.sprint_end_time.split('T')[0],
                                      admin_id: localStorage.getItem("id"),
                                    });
                                  }}
                                >
                                  Edit
                                </button>
                              </td> */}
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

        {/* //  <!-- Create Sprint Modal --> */}

        <div
          className="modal fade"
          id="CreateSprint"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  Create Sprint
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mt-4">
                  <div className=" offset-2 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                    <div class="mb-4">
                      <label className="form-label">
                        Semi-Monthly Sprint Name
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="sprint_name"
                        value={this.state.sprint_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className=" offset-2 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                    <div className="mb-4">
                      <div>
                        <label className="form-label text-left">
                          Sprint Start Date
                        </label>
                      </div>
                      <input
                        type="date"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="sprint_start_time"
                        value={this.state.sprint_start_time}
                        onChange={this.handleChange}
                        onBlur={() => {
                          var today = new Date(this.state.sprint_start_time);
                          var tomorrow = new Date();
                          tomorrow.setDate(today.getDate() + 15);
                          console.log(tomorrow);
                          console.log(tomorrow.toDateString());
                          const d = dateFormat(tomorrow, "yyyy-mm-dd");
                          console.log(d);
                          this.setState({
                            sprint_name: this.state.sprint_name,
                            sprint_duration: "15",
                            sprint_start_time: this.state.sprint_start_time,
                            sprint_end_time: d,
                            sprint_admin: this.state.sprint_admin,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="offset-2 col-xl-8 col-lg-8 col-md-8 col-sm-8 text-end mt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={this.addSprint}
                    >
                      create sprint
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- edit Sprint Modal --> */}
        <div
          className="modal fade"
          id="editsprint"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  Edit Sprint
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mt-4">
                  <div className=" offset-2 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                    <div class="mb-4">
                      <label className="form-label">
                        Semi-Monthly Sprint Name
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="sprint_name"
                        value={this.state.sprint_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className=" offset-2 col-xl-8 col-lg-8 col-md-8 col-sm-8">
                    <div className="mb-4">
                      <div>
                        <label className="form-label text-left">
                          Sprint Start Date
                        </label>
                      </div>
                      <input
                        type="date"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="sprint_start_time"
                        value={this.state.sprint_start_time}
                        onChange={this.handleChange}
                        onBlur={() => {
                          var today = new Date(this.state.sprint_start_time);
                          var tomorrow = new Date();
                          tomorrow.setDate(today.getDate() + 15);
                          console.log(tomorrow);
                          console.log(tomorrow.toDateString());
                          const d = dateFormat(tomorrow, "yyyy-mm-dd");
                          console.log(d);
                          this.setState({
                            sprint_name: this.state.sprint_name,
                            sprint_duration: "15",
                            sprint_start_time: this.state.sprint_start_time,
                            sprint_end_time: d,
                            sprint_admin: this.state.sprint_admin,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="offset-2 col-xl-8 col-lg-8 col-md-8 col-sm-8 text-end mt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={this.editSprint}
                    >
                      Update Sprint
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //  <!-- Create Story Modal --> */}

        <div
          className="modal fade"
          id="CreateStory"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  Create Story
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
                        <option selected>Select</option>
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
                        <option selected>Select</option>
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
                        <option selected>Select</option>
                        <option value="done">Done</option>
                        <option value="to be verified">To be verified</option>
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
                        <option selected>Select</option>
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
                  {/* <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
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
     </div>*/}
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Story Description</label>
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
                      onClick={this.addStory}
                    >
                      Create Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Create Story Modal --> */}
        {/* //  <!-- Create Bug Modal --> */}

        <div
          className="modal fade"
          id="CreateBug"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold" id="exampleModalLabel">
                  Create Bug
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
                      <label className="form-label">Bug Name</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="bug_name"
                        value={this.state.bug_name}
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
                        name="bug_priority"
                        value={this.state.bug_priority}
                        onChange={this.handleChange}
                      >
                        <option selected>Select</option>
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
                        name="bug_points"
                        value={this.state.bug_points}
                        onChange={this.handleChange}
                      >
                        <option selected>Select</option>
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
                        name="bug_status"
                        value={this.state.bug_status}
                        onChange={this.handleChange}
                      >
                        <option selected>Select</option>
                        <option value="done">Done</option>
                        <option value="to be verified">To be verified</option>
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
                        name="bug_assignee"
                        value={this.state.bug_assignee}
                        onChange={this.handleChange}
                      >
                        <option selected>Select</option>
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
                        name="bug_estimated_hours"
                        value={this.state.bug_estimated_hours}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
      <div className="mb-3">
        <label className="form-label">Completed Hours</label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput3"
          name="bug_completed_hours"
          value={this.state.bug_completed_hours}
          onChange={this.handleChange}
        />
      </div>
    </div>*/}
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Bug Description</label>
                      <textarea
                        type="text"
                        style={{ height: 300 }}
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="bug_description"
                        value={this.state.bug_description}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 text-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={this.addBug}
                    >
                      Create Bug
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Create Bug Modal --> */}
      </>
    );
  }
}

export default TesterSprints;
