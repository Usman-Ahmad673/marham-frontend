import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getDoctor } from '../../actions/doctorAction';
import Loader from '../layout/Loader/Loader';
import './doctors.css';
import { toast } from 'react-toastify';

const Doctors = () => {
    const dispatch = useDispatch();
    const { doctors, loading, error } = useSelector((state) => state.doctors);

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
        dispatch(getDoctor());
    }, [dispatch, error]);

    if (loading || !doctors) {
        return <Loader />;
    }

    return (
        <div className="container">
            <div className="row">
                    <div style={{display:'flex' , justifyContent:'space-between' ,alignItems:'center'}}>
                {doctors.map((doc) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 p-2" key={doc._id}>
                        <Link to={`/doctor/${doc._id}`} style={{ color: 'black', textDecoration: 'none' }}>
                            <div className="card h-100">
                                <img src={doc.images.url} alt={doc.images.public_id} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {doc.name} {doc.surgeon ? <span className="badge bg-success">Surgeon</span> : ''}
                                    </h5>
                                    <div>
                                        <p className="card-text">{doc.speciality}</p>
                                        <p className="card-text">{doc.qualification}</p>
                                        <p className="card-text">{doc.address}</p>
                                        <p className="card-text">{doc.contact}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
                        </div>
            </div>
        </div>
    );
}

export default Doctors;