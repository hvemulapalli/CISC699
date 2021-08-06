import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Admin/style.css";
import Navmenu from "../NavMenu/Navmenu";
import dateFormat from "dateformat";
import axios from "axios";
class SprintList extends Component {
  constructor(props) {
    super(props);
    this.addActiveClass = this.addActiveClass.bind(this);
    this.state = {
      active: false,
      admin_id: "",
      sprint_name: "",
      sprint_duration: "15",
      sprint_start_time: "",
      sprint_end_time: "",
      sprint_admin: localStorage.getItem("id"),
      sprint_id: localStorage.getItem("sprint_id"),
    sprints: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addSprint = this.addSprint.bind(this);
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
        sprint_start_time:"",
        sprint_end_time: "",
        sprint_admin: localStorage.getItem("id"),
      })
  }
 editSprint() {
    const port = localStorage.getItem("port");
    const data = {
      sprint_id: this.state.sprint_id,
      sprint_name: this.state.sprint_name,
      sprint_duration: this.state.sprint_duration,
      sprint_start_time: this.state.sprint_start_time,
      sprint_end_time: this.state.sprint_end_time,
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#CreateSprint"
                  >
                    Create Sprint
                  </button>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Sprint Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Edit Sprint</th>
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
                              </td>
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
</>
    );
  }
}

export default SprintList;
