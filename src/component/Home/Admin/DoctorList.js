    import React, { useEffect, useState } from "react";
    import "./doctorList.css";
    import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
    import { useSelector, useDispatch } from "react-redux";
    import { clearErrors, getDoctor, deleteDoctor } from "../../../actions/doctorAction";
    import { Link } from "react-router-dom";
    import { toast } from "react-toastify";
    import { useNavigate } from "react-router-dom";
    import { DELETE_DOCTOR_RESET } from "../../../constants/doctorConstant";

    const DoctorList = () => {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        const { doctors, loading, error } = useSelector((state) => state.doctors);
        const { error: deleteError, isDeleted } = useSelector((state) => state.delDoctor);

        // const [doctor , setDoctor] = useState([doctors])

        const deleteProductHandler = (id) => {
            dispatch(deleteDoctor(id));
        };

        console.log(doctors);


        
        const showToastSuccessMessage = () => {
            toast.success(`Successfully Deleted Doctor!`, {
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
            dispatch({ type: DELETE_DOCTOR_RESET });
            }

            dispatch(getDoctor());
        }, [dispatch, error, deleteError, navigate, isDeleted]);

        return (
            <div className="doctor-list-container">
            <h2>Doctor List</h2>
            {doctors.length === 0 ? (
                <p>No doctors available.</p>
            ) : (
                <table>
                <thead>
                    <tr>
                    <th>Doctor Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                    <tr key={doctor._id}>
                        <td>{doctor.name}</td>
                        <td>{doctor.email}</td>
                        <td>
                        {/* <Link to={`/admin/doctors/${doctor._id}`} className="edit-button">
                            <RiEditLine /> Edit
                        </Link> */}
                        <button
                            onClick={() => deleteProductHandler(doctor._id)}
                            className="delete-button"
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
        );
    };

    export default DoctorList;
