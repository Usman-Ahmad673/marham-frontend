import React, { useEffect, useState } from "react";
import "./hospitalList.css";
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getHospital, deleteHospital } from "../../../actions/hospitalAction";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DELETE_HOSPITAL_RESET } from "../../../constants/hospitalConstant";



const HospitalList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { hospitals, loading, error } = useSelector((state) => state.hospitals);
    const { error: deleteError, isDeleted } = useSelector((state) => state.delhospital);

    console.log(hospitals);
    
    const deleteProductHandler = (id) => {
        dispatch(deleteHospital(id));
    };



    
    const showToastSuccessMessage = () => {
        toast.success(`Successfully Deleted Hospital!`, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    

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

        if (deleteError) {
        showToastErrorMessage(deleteError);
        dispatch(clearErrors());
        }

        if (isDeleted) {
        showToastSuccessMessage();
        navigate("/admin/");
        dispatch({ type: DELETE_HOSPITAL_RESET });
        }

        dispatch(getHospital());
    }, [dispatch, error, deleteError, navigate, isDeleted]);

    return (
        <div className="hospital-list-container">
        <h2>Hospital List</h2>
        {hospitals.length === 0 ? (
            <p>No hospital available.</p>
        ) : (
            <table>
            <thead>
                <tr>
                <th>Hospital id</th>
                <th>Hospital Name</th>
                <th>Hospital Location</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {hospitals.map((hospital) => (
                <tr key={hospital._id}>
                    <td>{hospital._id}</td>
                    <td>{hospital.name}</td>
                    <td>{hospital.address}</td>
                    <td>
                    {/* <Link to={`/admin/hospitals/${hospital._id}`} className="hospital-edit-button">
                        <RiEditLine /> Edit
                    </Link> */}
                    <button
                        onClick={() => deleteProductHandler(hospital._id)}
                        className="hospital-delete-button"
                    >
                        <RiDeleteBinLine /> Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    )
}

export default HospitalList