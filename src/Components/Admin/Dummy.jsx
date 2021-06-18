import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Components/Admin/style.css';
import UserMenu from '../NavMenu/UserMenu';
    
class Dummy extends Component {
    constructor(props) {
        super(props);
        this.addActiveClass = this.addActiveClass.bind(this);
        this.state = {
            active: false,
        };
    }
    addActiveClass(index) {
        const activeClasses = [...this.state.activeClasses.slice(0, index), !this.state.activeClasses[index], this.state.activeClasses.slice(index + 1)].flat();
        this.setState({ activeClasses });
    }

    render() {
        return (
            <>
            <div className="dashboard-content">
                <div id="menu_nav" className={this.state.active && 'active'}>
                    <div id="side-menu" className={this.state.active && 'active'}>
                    <UserMenu />
                    </div>
                    <div id="menu-backdrop" onClick={() => this.setState({ active: !this.state.active })}>
                    </div>
                </div>
                <div id="side-wrapper" className={this.state.active && 'active'}>
                    <div className="header shadow-sm">
                        <nav className="navbar navbar-expand navbar-light bg-admin">
                            <div className="container-fluid">
                                <button className="btn btn-light btn-circle text-theme order-1 order-sm-0" id="sidebarCollapse"  onClick={() => this.setState({ active: !this.state.active })}>
                                    <i className="fas fa-th"></i>
                                </button>
                                <ul className="navbar-nav ml-auto ml-md-0">
                                    <li className="nav-item dropdown no-arrow">
                                        <a className="nav-link dropdown-toggle pt-1" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="far fa-user"></i>
                                            <div className="d-none d-xl-inline-block">User</div>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right logout" aria-labelledby="userDropdown">
                                            <a className="dropdown-item" href={window.location.origin} data-toggle="modal" data-target="#logoutModal"><i className="fas fa-sign-out-alt"></i>
                                                Logout</a>
                                        </div>
                                    </li>
                                </ul>
                             </div>
                        </nav>
                    </div>
                    <div className="wrapper-content p-4 text-start">
                        <p className="text-center text-primary" >page under developement</p>
                    </div>
                </div>
            </div>
           
            {/* //  <!-- Add Buy Modal --> */}
             <div className="modal fade bd-example-modal-lg modal-edit" id="addcard" tabindex="-1"
             role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div className="modal-dialog modal-lg" role="document">
                 <div className="modal-content ">
                     <div className="modal-header modal-header-edit">
                         <h5 className="modal-title" id="exampleModalLabel">Add Card details</h5>
                         <button type="button" className="close close-edit" data-dismiss="modal"
                             aria-label="Close">
                             <span aria-hidden="true">&times;</span>
                         </button>
                     </div>
                     <div className="modal-body text-left">
                         <div className="row">
                             <div className="col-lg-4 mb-3">
                                 <label htmlFor="inputcardname" className="label">Card Number</label>
                                 <input type="text" id="inputcardname" className="input form-control" required="" />
                             </div>
                             <div className="col-lg-4 mb-3">
                                 <label htmlFor="inputHName" className="label">Card Holder Name</label>
                                 <input type="text" id="inputHName" className="input form-control" required="" />
                             </div>
                             <div className="col-lg-4 mb-3">
                                 <label htmlFor="inputexpdate" className="label">Card Expiry Date</label>
                                 <input type="text" id="inputexpdate" className="input form-control" required="" />
                             </div>
                             <div className="col-lg-4 mb-3">
                                 <label htmlFor="inputCVV" className="label">CVV</label>
                                  <input type="number" id="inputCVV" className="input form-control" required="" />
                             </div>
                             <div className="col-lg-4 mb-3">
                                 <label htmlFor="inputPrice" className="label">Price</label>
                                  <input type="number" id="inputPrice" className="input form-control" required="" />
                             </div>
                             
                         </div>
                     </div>
                     <div className="modal-footer">
                         <button type="button" className="btn btn-success">Submit</button>
                         <button type="button" className="btn btn-danger"
                             data-dismiss="modal">Close</button>
                     </div>
                 </div>
             </div>
         </div>

         {/* <!-- Add Buy Modal --> */}
         </>
        )
    }
}

export default Dummy
