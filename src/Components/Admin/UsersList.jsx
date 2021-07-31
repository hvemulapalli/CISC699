import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../Components/Admin/style.css";
import Navmenu from "../NavMenu/Navmenu";
import axios from "axios";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      user_id: "",
      emp_id: "",
      user_name: "",
      user_email: "",
      user_password: "",
      user_phone_number: "",
      role_type: "",
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
          emp_id: 2,
          user_name: "k2",
          user_email: "k2@gmail.com",
          user_password: "sdfsdf",
          user_phone_number: 14565,
          role_type: "developer",
        },
      ],
    };
    this.addActiveClass = this.addActiveClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }
  handleChange(event) {
    const { name } = event.target;
    this.setState({ ...this.state, [name]: event.target.value });
  }
 
  addActiveClass(index) {
    const activeClasses = [
      ...this.state.activeClasses.slice(0, index),
      !this.state.activeClasses[index],
      this.state.activeClasses.slice(index + 1),
    ].flat();
    this.setState({ activeClasses });
  }

  getListofUsers() {
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
  addUser() {
    const port = localStorage.getItem("port");
    const data = {
      emp_id: this.state.emp_id,
      user_name: this.state.user_name,
      user_email: this.state.user_email,
      user_password: this.state.user_password,
      user_phone_number: this.state.user_phone_number,
      role_type: this.state.role_type,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(port + "/createuser", data, headers)
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(data);
          console.log(res.data.body);
          window.alert(res.data.body);
          this.getListofUsers();
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
      emp_id: "",
      user_name: "",
      user_email: "",
      user_password: "",
      user_phone_number: "",
      role_type: "",
    });
  }
  editUser() {
    const port = localStorage.getItem("port");
    const data = {
      user_id: this.state.user_id,
      emp_id: this.state.emp_id,
      user_name: this.state.user_name,
      user_email: this.state.user_email,
      user_password: this.state.user_password,
      user_phone_number: this.state.user_phone_number,
      role_type: this.state.role_type,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    console.log(data);
    axios
      .put(port + "/userupdate", data, headers)
      .then((res) => {
        console.log(res.data);
        if (res.data.statuscode === 200) {
          console.log(data);
          console.log(res.data.body);
          window.alert(res.data.body);
          this.getListofUsers();
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
      emp_id: "",
      user_name: "",
      user_email: "",
      user_password: "",
      user_phone_number: "",
      role_type: "",
    });
  }
  
  validateMail = () => {
    if (!this.state.user_email) {
      window.alert("email required");
    } else if (
      !this.state.user_email.match(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
      )
    ) {
      window.alert("invalid email");
    }else {
      return true;
    }
  };
  componentDidMount() {
    this.getListofUsers();
  }
  render() {
    return (
      <div className="dashboard-content">
        <div id="side-menu" className={this.state.active && "active"}>
          <Navmenu />
        </div>
        <div id="menu-backdrop" className={this.state.active && "active"}></div>
        <div id="side-wrapper" className={this.state.active && "active"}>
          <div className="header shadow-sm">
            <nav className="navbar navbar-expand navbar-light bg-admin">
              <div className="container-fluid">
                <button
                  className="btn btn-light btn-circle text-theme order-1 order-sm-0"
                  id="sidebarCollapse"
                  onClick={() => this.setState({ active: !this.state.active })}
                >
                  <i className="fas fa-list"></i>
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
                      className="dropdown-menu dropdown-menu-right logout"
                      aria-labelledby="userDropdown"
                    >
                      <a
                        className="dropdown-item"
                        href={window.location.origin}
                      >
                        <i className="fas fa-sign-out-alt"> Logout</i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="wrapper-content p-4 text-left">
            <div className="users-info">
              <div className="card">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 font-weight-bold">User Info</h5>
                  <button
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#addUser"
                    type="button"
                  >
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    Add User
                  </button>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-responsive-md">
                    <thead>
                      <tr>
                        <th scope="col">Employee Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.length !== 0 && (
                        <React.Fragment>
                          {this.state.users.map((p, index) => (
                            <tr key={index}>
                              <td>{p.emp_id}</td>
                              <td>{p.user_name}</td>
                              <td>{p.user_email}</td>
                              <td>{p.role_type}</td>
                              <td>{p.user_phone_number}</td>
                              <td>
                                {" "}
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#CreateStory"
                                  onClick={() => {
                                    localStorage.setItem("emp_id", p.emp_id);
                                    this.setState({
                                      user_id: p.user_id,
                                      emp_id: p.emp_id,
                                      user_name: p.user_name,
                                      user_email: p.user_email,
                                      user_password: p.user_password,
                                      user_phone_number: p.user_phone_number,
                                      role_type: p.role_type,
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
                      {this.state.users.length === 0 && (
                        <React.Fragment>
                          <tr>
                            <td className="text-center">Users not found</td>
                          </tr>
                        </React.Fragment>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Add User Modal --> */}
        <div
          className="modal fade bd-example-modal-lg modal-edit"
          id="addUser"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content ">
              <div className="modal-header modal-header-edit">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add User
                </h5>
                <button
                  type="button"
                  className="close close-edit"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-left">
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Employee id</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="emp_id"
                        value={this.state.emp_id}
                        onChange={this.handleChange}
                      
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="user_name"
                        value={this.state.user_name}
                        onChange={this.handleChange}
                        
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="user_email"
                        value={this.state.user_email}
                        onChange={this.handleChange}
                        onBlur={this.validateMail}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleFormControlInput2"
                        name="user_password"
                        value={this.state.user_password}
                        onChange={this.handleChange}
                        
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="user_phone_number"
                        value={this.state.user_phone_number}
                        onChange={this.handleChange}
                        
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div class="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="role_type"
                        value={this.state.role_type}
                        onChange={this.handleChange}
                       
                      >
                        <option selected>Select</option>
                        <option value="developer">Developer</option>
                        <option value="tester">Tester</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={this.addUser}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Edit User Modal --> */}
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
                  Edit User
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    this.setState({
                      emp_id: "",
                      user_name: "",
                      user_email: "",
                      user_password: "",
                      user_phone_number: "",
                      role_type: "",
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Employee id</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="emp_id"
                        value={this.state.emp_id}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div> */}
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        name="user_name"
                        value={this.state.user_name}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="user_email"
                        value={this.state.user_email}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleFormControlInput2"
                        name="user_password"
                        value={this.state.user_password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput3"
                        name="user_phone_number"
                        value={this.state.user_phone_number}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                    <div class="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        name="role_type"
                        value={this.state.role_type}
                        onChange={this.handleChange}
                      >
                        <option selected>Select</option>
                        <option value="developer">Developer</option>
                        <option value="tester">Tester</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={this.editUser}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersList;
