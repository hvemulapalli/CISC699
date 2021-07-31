import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Admin/style.css";
import TesterMenu from "../NavMenu/TesterMenu";
import axios from "axios";
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

          bug_name: "new",

          bug_description: "sdfsdf",

          bug_priority: "high",

          bug_points: 1,

          bug_status: "active",

          bug_created_by: {
            id: 2,
            name: "kumar",
          },

          bug_assignee: {
            id: 1,
            name: "k",
          },

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
          bug_created_by: {
            id: 1,
            name: "k",
          },

          bug_assignee: {
            id: 2,
            name: "kumar",
          },

          bug_completed_hours: 1,

          bug_estimated_hours: 2,

          bug_sprint: 2,
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
      bug_id: "",
      bug_name: "",
      bug_description: "",
      bug_priority: "",
      bug_points: "",
      bug_status: "",
      bug_created_by: localStorage.getItem("id"),
      bug_assignee: "",
      bug_completed_hours: "0",
      bug_estimated_hours: "",
      search:"",
      collapsableclass:"accordion-collapse collapse table table-bordered"
    };
    this.handleChange = this.handleChange.bind(this);
    this.editBug = this.editBug.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(event) {
    const { name } = event.target;
    this.setState({ ...this.state, [name]: event.target.value });
    this.setState({collapsableclass:"accordion-collapse collapse show table table-bordered"})
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
          console.log("users list");
          var loginid = localStorage.getItem("id");
          var data = res.data.body;
          let filterList = data.filter((ll) => {
            if (ll.user_id !== parseInt(loginid)) {
                return true;

            }
            return false;
        })
        console.log(filterList);
          console.log("users list");
          this.setState({ users: filterList });
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
  editBug() {
    const port = localStorage.getItem("port");
    const data = {
      bug_id: this.state.bug_id,
      bug_name: this.state.bug_name,
      bug_description: this.state.bug_description,
      bug_priority: this.state.bug_priority,
      bug_points: this.state.bug_points,
      bug_status: this.state.bug_status,
      bug_created_by: localStorage.getItem("id"),
      bug_assignee: this.state.bug_assignee,
      bug_completed_hours: this.state.bug_completed_hours,
      bug_estimated_hours: this.state.bug_estimated_hours,
    };
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(port + "/updatebug", data, headers)
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(data);
          console.log(res.data.body);
          window.alert(res.data.body);
          this.getListOfBugs();
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
      bug_id: "",
      bug_name: "",
      bug_description: "this.state.bug_description",
      bug_priority: "",
      bug_points: "",
      bug_status: "",
      bug_created_by: localStorage.getItem("id"),
      bug_assignee: "",
      bug_completed_hours: "",
      bug_estimated_hours: "",
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
  getListOfBugs() {
    const port = localStorage.getItem("port");
    axios
      .get(port + "/listbugs")
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(res.data.body);
          this.setState({ bugs: res.data.body });
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
    this.getListOfBugs();
    this.getUsersList();
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
              <div className="d-flex d-flex justify-content-end m-1">
                  <input
                    className="border border-secondary text-primary p-1"
                    placeholder="Search Bug By Name"
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                  />
                  
                </div>
                <div className="card-header bg-white">
                  <h5 className="mb-0 text-primary fw-bold">Bugs List</h5>
                </div>
                <div className="card-body">
                  <div>
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
                                className={this.state.collapsableclass}
                                aria-labelledby="headingOne"
                              >
                                <thead>
                                  <tr>
                                    <th scope="col">Bug Name</th>
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

                                {this.state.bugs.length === 0 && (
                                  <div>No Bugs found</div>
                                )}
                                {this.state.bugs.length !== 0 && (
                                  <tbody>
                                    {this.state.bugs
                                      .filter(
                                        (e) => e.bug_sprint === r.sprint_id
                                      )
                                      .map((p, i) => (<React.Fragment>
                                        {p.bug_name.match(this.state.search)&&
                                        <tr key={i}>
                                          <td>{p.bug_name}</td>
                                          <td>{p.bug_description}</td>
                                          <td>{p.bug_priority}</td>
                                          <td>{p.bug_points}</td>
                                          <td>{p.bug_status}</td>
                                          <td>{p.bug_created_by.name}</td>
                                          <td>{p.bug_assignee.name}</td>
                                          <td>{p.bug_estimated_hours}</td>
                                          <td>{p.bug_completed_hours}</td>
                                          <td>
                                            <button
                                              type="button"
                                              className="btn btn-primary"
                                              data-bs-toggle="modal"
                                              data-bs-target="#CreateBug"
                                              onClick={() => {
                                                this.setState({
                                                  bug_id: p.bug_id,
                                                  bug_name: p.bug_name,
                                                  bug_description:
                                                    p.bug_description,
                                                  bug_created_by:
                                                    p.bug_created_by.id,
                                                  bug_priority: p.bug_priority,
                                                  bug_points: p.bug_points,
                                                  bug_status: p.bug_status,
                                                  bug_assignee:
                                                    p.bug_assignee.id,
                                                  bug_completed_hours: 0,
                                                  bug_estimated_hours:
                                                    p.bug_estimated_hours,
                                                });
                                              }}
                                            >
                                              Edit
                                            </button>
                                          </td>
                                        </tr>}
                                        </React.Fragment>
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
              </div>

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
                      <h5
                        className="modal-title fw-bold"
                        id="exampleModalLabel"
                      >
                        Update Bug
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
                               <option value={this.state.bug_points} selected hidden>{this.state.bug_points}</option>
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
                              <option  value={this.state.bugs_status} hidden selected> {this.state.bugs_status}</option>
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
                              name="bug_assignee"
                              value={this.state.bug_assignee}
                              onChange={this.handleChange}
                            >
                              {this.state.users.length !== 0 && (
                                <React.Fragment>
                                  {this.state.users.map((p, index) => (
                                    <React.Fragment>
                                      <option key={index} value={p.user_id}>
                                        {p.user_name}
                                      </option>
                                    </React.Fragment>
                                  ))}
                                </React.Fragment>
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Estimated Hours
                            </label>
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
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Completed Hours
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleFormControlInput3"
                              name="bug_completed_hours"
                              value={this.state.bug_completed_hours}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Bug Description
                            </label>
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
                            onClick={this.editBug}
                          >
                            Update Bug
                          </button>
                        </div>
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
