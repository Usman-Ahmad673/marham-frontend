import React, { Fragment, useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import MetaData from '../MetaData'
import Loader from '../layout/Loader/Loader'
import { getHospital , clearErrors } from '../../actions/hospitalAction'
import { Link } from 'react-router-dom'
import './hospitals.css';
import { FaHospital } from 'react-icons/fa'
import Search from './Search/Search'
import { toast } from 'react-toastify';

const Hospitals = () => {

    const dispatch = useDispatch()
    


    const { hospitals, loading, error } = useSelector((state) => state.hospitals);


    const showToastErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };


    useEffect(() => {
        if(error){
            showToastErrorMessage(error)
            dispatch(clearErrors())
        }
        dispatch(getHospital());
    },[dispatch, error]);

    console.log(hospitals);


    return (
            <Fragment>
        <MetaData title="Hospitals" />
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
            <div className="hospitals">
                <div className="search-box">
                <h3>Best Hospitals in London Doctor Lists, Addresses And Contact Info</h3>
                {/* <div className="search-bar">
                    <Search />
                </div> */}
                </div>
                <div className="hospitalCard">
                <div className="hospital-card-scroll">
                    {Array.isArray(hospitals) ? (
                        hospitals.map((hospital) => (
                        <div className="col-4" key={hospital._id}>
                            {/* Add a link to the hospital details page */}
                            <Link className="hospitalCard" to={`/hospital/${hospital._id}`}>
                            <div className="hospital-card">
                                {hospital.images && hospital.images.url ? (
                                <img src={hospital.images.url} className="hospital-card-img-top" alt={hospital.name} />
                                ) : (
                                <div>
                                    <FaHospital />
                                </div>
                                )}
                                <div className="hospital-card-body">
                                <h5>{hospital.name}</h5>
                                <h5>{hospital.address}</h5>
                                </div>
                            </div>
                            </Link>
                        </div>
                        ))
                    ) : (
                        ''
                    )}
                </div>
                <div className="help-button">
                    <h4>Do you need any help? 😄</h4>
                    <button>Call Helpline</button>
                </div>
                </div>
            </div>
            </Fragment>
        )}
        </Fragment>
    )
}

export default Hospitals