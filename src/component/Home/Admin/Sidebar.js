import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { BsCheck, BsPencil   } from 'react-icons/bs';

const Sidebar = () => {
    return (
        <div className="sidebar">
        <ul className="sidebar-links">
            <li>
            <Link to="/admin/doctor/new"><BsPencil /> Add Doctor</Link>
            </li>
            <li>
            <Link to="/admin/hospital/new"><BsPencil /> Add Hospital</Link>
            </li>
            <li>
            <Link to="/admin/symptom/new"><BsPencil /> Add Symptom</Link>
            </li>
            <li>
            <Link to="/admin/lab/new"><BsPencil /> Add Lab</Link>
            </li>
            <li>
            <Link to="/admin/disease/new"><BsPencil /> Add Disease</Link>
            </li>
            <li>
            <Link to="/admin/checkDoctorAppointments"><BsCheck /> Show Doctor Appointments</Link>
            </li>
            <li>
            <Link to="/admin/checkSurgeonAppointments"><BsCheck /> Show Surgeon Appointments</Link>
            </li>
            <li>
            <Link to="/admin/products"><BsCheck /> ALL Products</Link>
            </li>
            <li>
            <Link to="/admin/product"><BsCheck /> Create Products</Link>
            </li>
            <li>
            <Link to="/admin/orders"><BsCheck /> Check Orders</Link>
            </li>
            
        </ul>
        </div>
    );
};

export default Sidebar;
