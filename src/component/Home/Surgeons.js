import React, { Fragment, useEffect } from 'react';
import './surgeons.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getDoctorDetails } from '../../actions/doctorAction';
import Loader from '../layout/Loader/Loader';
import Search from './Search/Search';


const Surgeons = () => {
    const dispatch = useDispatch();


    const { doctor, loading, error } = useSelector((state) => state.doctorDetails);



    

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
        dispatch(getDoctorDetails('surgeon'));
    
    }, [dispatch, error]);

    if (loading || !doctor) {
        return <Loader />;
    }

    return (
        <Fragment>
            {/* <div className="search-box">
            </div> */}

            <div className="container surgeon">
                {Array.isArray(doctor) ? (
                    doctor.map((doctorItem) => (
                        <Link key={doctorItem._id} className="surgeonCard" to={`/surgeries/${doctorItem._id}`}>
                            <div className="surgeon-card">
                                {/* Render each doctor's information */}
                                <img src={doctorItem.images.url} alt={doctorItem.images.public_id} />
                                <div className="surgeon-data">
                                    <h4>{doctorItem.name}</h4>
                                    <p>{doctorItem.speciality}</p>
                                    <p>{doctorItem.experience}</p>
                                </div>
                                {/* Add additional styling as needed */}
                            </div>
                            <div className="surgeon-button">
                                <button>View Surgeon</button>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div>No Surgeons Available</div>
                )}
            </div>
        </Fragment>
    );
};

export default Surgeons;
