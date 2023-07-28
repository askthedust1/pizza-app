import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import logo from "../../assets/logo.png";

const Nav = () => {
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin' ||
        location.pathname === "/admin/dishes" ||
        location.pathname === "/admin/orders";

    return (
        <nav className="navbar navbar-light static-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand text-white fs-1" to="/">
                    <img className="logo" src={logo} alt="logo" style={{height:'50px'}}/>
                </NavLink>
                <div>
                    {
                        isAdminPage && (
                            <div>
                                <NavLink style={{color: '#e85319'}}
                                         className="btn btn-light fs-4 me-2" to="/admin/dishes">Pizza</NavLink>
                                <NavLink style={{color: '#e85319'}}
                                         className="btn btn-light fs-4" to="/admin/orders">Orders</NavLink>
                            </div>
                        )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;