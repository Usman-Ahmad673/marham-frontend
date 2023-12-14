import React, { useEffect, useState } from "react";
import "./doctorList.css";
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getSurgeonAppointments } from "../../../actions/Admin/surgeonAppointmentAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetSurgeonAppointments = () => {
const dispatch = useDispatch();


const { surgeonAppointments, loading, error } = useSelector((state) => state.surgeonAppointment);

console.log(surgeonAppointments);


const showToastErrorMessage = (e) => {
    toast.error(e, {
    position: toast.POSITION.TOP_RIGHT,
    });
};

useEffect(() => {
    if (error) {
    showToastErrorMessage(error);
    dispatch(clearErrors());
    }

    dispatch(getSurgeonAppointments());
}, [dispatch, error]);

return (
    <div className="doctor-list-container">
    <h3 style={{color:"red"}}>Surgeon Appointment Details</h3>
    {surgeonAppointments.length === 0 ? (
        <p>No Surgeon Appointments Available.</p>
    ) : (
        <table>
        <thead>
            <tr>
            <th>Patient Name</th>
            <th>Patient Phone Number</th>
            <th>City</th> 
            <th>Doctor Name</th>
            <th>Doctor Contact Number</th>
            <th>Doctor Account Number</th>
            </tr>
        </thead>
        <tbody>
            {surgeonAppointments.map((surgeonAppointment) => (
            <tr key={surgeonAppointment._id}>
                <td>{surgeonAppointment.name}</td>
                <td>{surgeonAppointment.phone}</td>
                <td>{surgeonAppointment.city}</td>
                <td>{surgeonAppointment.doctorName}</td>
                <td>{surgeonAppointment.doctorContact}</td>
                <td>{surgeonAppointment.doctorAccountNumber}</td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
};

export default GetSurgeonAppointments;
