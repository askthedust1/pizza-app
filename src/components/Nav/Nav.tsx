import React from 'react';
import {NavLink} from "react-router-dom";

const Nav = () => {

    return (
        <nav className="navbar navbar-light static-top">
            <div className="container-fluid">
                <NavLink className="navbar-brand text-white fs-1" to="/admin">Turtle Pizza Admin</NavLink>
                <div>
                    <NavLink className="btn btn-light fs-4 me-2" to="/admin/dishes">Pizza</NavLink>
                    <NavLink className="btn btn-light fs-4" to="/admin/orders">Orders</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Nav;