import React, { Component, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Components/Admin/style.css';
import Navmenu from '../NavMenu/Navmenu';
     function AddUser(){
         const[userdata,setUserdata]=useState({emp_id:"",user_name:"",user_email:'',user_password:"",user_phone_number:"",role_type:""})
        const [active,setActive]=useState(false);
        const addActiveClass=(index)=>{
            const activeClasses = [...active.slice(0, index), !active[index], active.slice(index + 1)].flat();
        
        setActive(activeClasses);
        }
         
  const handleChange = (event) => {
    const{name,value}=event.target;
    setUserdata({...userdata,[name]:value})
   }
   const addUser = () => {
    const port = localStorage.getItem('port');
    const headers = {
        'Content-Type': 'application/json'
      }
      axios.post(port + "/createuser", userdata, headers)
        .then((res) => {
          console.log(res.data);
          if (res.data.statuscode == 200) {
            console.log(userdata);
                console.log(res.data.body);
                window.alert(res.data.body)
          } else if (res.data.statuscode == 400) {
            console.log(res.data.body)
            window.alert(res.data.body);
          } else {
            return false;
          }

        }).catch((error) => { console.log(error) })
    }
        return(<div>
        
            <div className="dashboard-content">
                <div id="menu_nav" className={active && 'active'}>
                    <div id="side-menu" className={active && 'active'}>
                    <Navmenu />
                    </div>
                    <div id="menu-backdrop" onClick={() => setActive(!active)}>
                    </div>
                </div>
                <div id="side-wrapper" className={active && 'active'}>
                    <div className="header shadow-sm">
                        <nav className="navbar navbar-expand navbar-light bg-admin">
                            <div className="container-fluid">
                                <button className="btn btn-light btn-circle text-theme order-1 order-sm-0" id="sidebarCollapse"  onClick={() =>{setActive( !active)}}>
                                    <i className="fas fa-th"></i>
                                </button>
                                <ul className="navbar-nav ml-auto ml-md-0">
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle pt-1" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="far fa-user"></i>
                                            <div className="d-none d-xl-inline-block">Admin</div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end logout" aria-labelledby="userDropdown">
                                            <a className="dropdown-item" href="http://localhost:3000" data-toggle="modal" data-target="#logoutModal"><i className="fas fa-sign-out-alt"></i>
                                                Logout</a>
                                        </div>
                                    </li>
                                </ul>
                             </div>
                        </nav>
                    </div>
                    <div className="wrapper-content p-4 text-start">
                        <div className="card  border-0 shadow-sm">
                        <div className="card-header bg-white">
                                <h5 className="mb-0 text-primary fw-bold">Add User</h5>
                            </div>
                            <div className="card-body">
                        <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label className="form-label">Employee id</label>
                                    <input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleFormControlInput3" 
                                    name="emp_id"
                                     value={userdata.emp_id} 
                                     onChange={handleChange}
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
                                     value={userdata.user_name} 
                                     onChange={handleChange}
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
                                    value={userdata.user_email} 
                                    onChange={handleChange} />
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
                                    value={userdata.user_password} 
                                    onChange={handleChange} />
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
                                    value={userdata.user_phone_number} 
                                    onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                                <div class="mb-3">
                                    <label className="form-label">Role</label>
                                    <select 
                                    className="form-select" 
                                    aria-label="Default select example"
                                    name="role_type"
                                    value={userdata.role_type} 
                                    onChange={handleChange}
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
                            onClick={addUser}
                            >Submit</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
      
      
        </div>)
    }

export default AddUser
