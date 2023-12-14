import React, { useEffect, useState } from "react";
import "./doctorList.css";
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getDoctorAppointments } from "../../../actions/Admin/doctorAppointmentAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetDoctorAppointments = () => {
const dispatch = useDispatch();
// const alert = useAlert();

const { doctorAppointments, loading, error } = useSelector((state) => state.doctorAppointments);

console.log(doctorAppointments);





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

    dispatch(getDoctorAppointments());
}, [dispatch, error]);

return (
    <div className="doctor-list-container">
    <h2>Doctor Appointments List</h2>
    {doctorAppointments.length === 0 ? (
        <p>No doctorAppointments available.</p>
    ) : (
        <table>
        <thead>
            <tr>
            <th>Patient Name</th>
            <th>Patient Phone Number</th>
            <th>Clinic Time</th> 
            <th>Video Consultation Time</th> 
            <th>Clinic Date</th> 
            <th>Video Consultation Date</th> 
            <th>Doctor Name</th>
            <th>Doctor Location</th>
            <th>Doctor Contact Number</th>
            <th>Doctor Account Number</th>
            </tr>
        </thead>
        <tbody>
            {doctorAppointments.map((doctorAppointment) => (
            <tr key={doctorAppointment._id}>
                <td>{doctorAppointment.name}</td>
                <td>{doctorAppointment.phone}</td>
                <td>{doctorAppointment.ctime !== '' ? doctorAppointment.ctime : 'N/A'}</td>
                <td>{doctorAppointment.vtime}</td>
                <td>{doctorAppointment.cdate !== '' ? doctorAppointment.cdate : 'N/A'}</td>
                <td>{doctorAppointment.vdate}</td>
                <td>{doctorAppointment.doctorName}</td>
                <td>{doctorAppointment.doctorLocation}</td>
                <td>{doctorAppointment.doctorContact}</td>
                <td>{doctorAppointment.doctorAccountNumber}</td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
};

export default GetDoctorAppointments;
