import React, { useState} from 'react';
import '../../Components/Admin/style.css';
import axios from 'axios';

export default function AdminLogin() {
  const [signindata, setSignindata] = useState({ role: 'admin', email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignindata({ ...signindata, [name]: value })
  }
  const login = () => {
    const port = localStorage.getItem('port');

    if (signindata.role === "admin") {
      const data = { admin_name: signindata.email, admin_password: signindata.password }
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.post(port + '/admin/login', data, headers)
        .then((res) => {
          console.log(res.data);
          if (res.data.statuscode === 200) {
            console.log('Logged successfully');
            console.log(res.data.body);
            localStorage.setItem('id',res.data.body[0].admin_id);
            const host=localStorage.getItem('hosted_port');
            window.location.href = host+"/admin/sprints"
          } else if (res.data.statuscode === 400) {
            console.log(res.data.body);
            window.alert(res.data.body);
          } else {
            return false;
          }

        }).catch((error) => { console.log(error) })
    } else if (signindata.role === "user") {
      const data = { user_email: signindata.email, user_password: signindata.password }
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.post(port + '/userlogin', data, headers)
        .then((res) => {
          console.log(res.data);
          if (res.data.statuscode === 200) {
            console.log('Logged successfully');
            console.log(res.data.body);
            localStorage.setItem('id',res.data.body[0].user_id);
            const host=localStorage.getItem('hosted_port');
            window.location.href = host+"/users/home"
          } else if (res.data.statuscode === 400) {
            console.log(res.data.body);
            window.alert(res.data.body);
          } else {
            return false;
          }

        }).catch((error) => { console.log(error) })
      }

  }
  return (
    <section className="login-page">
      <div className="container">
        <div className="login-row row justify-content-center align-items-center">
          <div className="col-sm-8 col-md-6 col-lg-4 mx-auto">
            <div className="card-block border-0 shadow py-2 px-5">
              <div className="login-form" >
                <div className="login-head">
                  <i className="far fa-user fa-2x" aria-hidden="true"></i>
                </div>
                <div className="title text-center py-xl-2 mb-">
                  <h1 className="h4 text-uppercase font-weight-bold">Login</h1>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="inputUser" className="label">Login As</label>
                  <select className="role-select" name="role" value={signindata.role} onChange={handleChange} >
                    <option value="admin" >Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div>

                </div>
                <div className="form-group mb-3">
                  <label className="label">Username</label>
                  <input
                    type="text"
                    className="input form-control"
                    name="email"
                    value={signindata.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input form-control"
                    name="password"
                    value={signindata.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field text-center my-3">
                  <button
                    onClick={login}
                    className="radius-25 btn btn-primary px-5 text-uppercase">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

