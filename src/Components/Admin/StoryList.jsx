import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Admin/style.css";
import Navmenu from "../NavMenu/Navmenu";
import axios from 'axios';
class StoryList extends Component {
  constructor(props) {
    super(props);
    this.addActiveClass = this.addActiveClass.bind(this);
    this.state = {
      active: false,
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
      ],
    };
  }
  addActiveClass(index) {
    const activeClasses = [
      ...this.state.activeClasses.slice(0, index),
      !this.state.activeClasses[index],
      this.state.activeClasses.slice(index + 1),
    ].flat();
    this.setState({ activeClasses });
  }
  getListOfStories(){
    const port=localStorage.getItem('port');
    axios.get(port + "/getlistofstories")
    .then((res) => {
     console.log(res.data);
     if (res.data.statuscode === 200) {
      console.log(res.data.body);
      this.setState({stories:res.data.body})
     } else if (res.data.statuscode ===400) {
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
                        <div className="d-none d-xl-inline-block">Admin</div>
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
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Story Name</th>
                        <th scope="col">Story Description</th>
                        <th scope="col">Story Priority</th>
                        <th scope="col">Story Points</th>
                        <th scope="col">Story Status</th>
                        <th scope="col">Story Created By</th>
                        <th scope="col">Story Asignee</th>
                        <th scope="col">Story Completed Hours</th>
                        <th scope="col">Story Estimated Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.stories.length!==0&&<React.Fragment>
                            {this.state.stories.map((p,index)=>(<tr key={index} >
                        <td>{p.story_name}</td>
                        <td>{p.story_description}</td>
                        <td>{p.story_priority}</td>
                        <td>{p.story_points}</td>
                        <td>{p.story_status}</td>
                        <td>{p.story_created_by}</td>
                        <td>{p.story_assignee}</td>
                        <td>{p.story_completed_hours}</td>
                        <td>{p.story_estimated_hours}</td>
                        
                      </tr>
                   ))}
                            </React.Fragment>}
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

export default StoryList;
