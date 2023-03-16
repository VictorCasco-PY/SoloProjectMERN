import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from "../assets/logo.png"
const Layout = () => {
    return (
        <div className='container mt-5'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid shadow p-3 mb-3 bg-body rounded">
                    <a className="navbar-brand" href="/dashboard"><img src={Logo} alt="Logo" width="350" /></a>
                </div>
            </nav>
            <div className="container mt-5">
                <Outlet />
            </div>
        </div >
    )
}

export default Layout;