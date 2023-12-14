import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom'
import { BsCalendar, BsClock, BsGeoAlt } from 'react-icons/bs';
import { clearErrors, searchDoctor } from '../../actions/doctorAction';
import Loader from '../layout/Loader/Loader';
import './doctorDetails.css'
import ScheduleAppointment from './scheduleAppointment';
import SdsDoctor from './sdsDoctor';
import { useLocation } from 'react-router-dom';


const SearchDetails = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get('city');
    const name = searchParams.get('name');

    const dispatch = useDispatch()
    
    const {doctors , loading , error} = useSelector((state) => state.doctorSearch)

    
    

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
        dispatch(searchDoctor(city, name));
    },[dispatch, city, name, error]);

    if (loading || !doctors) {
        return <Loader />
    }

    console.log(doctors);
    console.log(city);
    console.log(name);

    return (
        <React.Fragment>
        <div className="container">
            {doctors && doctors.length > 0 ? 
                (doctors.map((doc) => (
                    <Link to={`/doctor/${doc._id}`} style={{textDecoration:'none', color:'black'}}>
                    <div className="container m-3 p-4" key={doc._id}>
                    <div className="practice-details-grid-container">
                        <div className="left-side">
                        <img src={doc.images.url} alt={doc.images.public_id} />
                        <div className="about">
                            <p>
                            {doc.name} <b>Surgeon</b>
                            </p>
                            <p>{doc.speciality}</p>
                            <p>{doc.qualification}</p>
                            {/* <p>{doc._id}</p> */}
                        </div>
                        </div>

                        <div className="right-side">
                        <button>Video Consultation</button>
                        <button>Book Appointment</button>
                        </div>
                    </div>

                    <div className="practice-container-2">
                        {doc.hospital !== null ? (
                        <div className="practice-details-video-consult">
                            <div className="clinic-consult">
                            <div className="video-consult">
                                <h5>{doc.hospital.hospital_name}</h5>
                            </div>
                            <div className="video-consult-details">
                                <p>
                                <BsCalendar /> Days {doc.hospital.hospital_days.join(', ')}
                                </p>
                                {/* <p>Timings {doc.clinic.clinic_timings.start} - {doc.clinic.clinic_timings.end}</p> */}
                                <p>
                                <BsGeoAlt /> Address {doc.hospital.hospital_address}
                                </p>
                            </div>
                            </div>
                        </div>
                        ) : (
                        ''
                        )}

                        {doc.videoConsult !== null ? (
                        <div className="practice-details-video-consult">
                            <div className="clinic-consult">
                            <div className="video-consult">
                                <h5>Video Consultation</h5>
                                <b>RS - {doc.fee}</b>
                            </div>
                            <div className="video-consult-details">
                                <p>
                                <BsCalendar /> Days {doc.videoConsult.days.join(', ')}
                                </p>
                                {/* <p><BsClock /> Timings {doc.videoConsult.timings.start} - {doc.clinic.clinic_timings.end}</p> */}
                                <p>{doc.videoConsult.status}</p>
                            </div>
                            </div>
                        </div>
                        ) : (
                        ''
                        )}
                    </div>
                    </div>
                    </Link>
                ))):(
                    <div className="container">
                        <h4 style={{textAlign:'center', margin:'50px 0'}}>
                            No Doctor Found
                        </h4>
                    </div>
                )
            }
        </div>
        </React.Fragment>
    )
}


export default SearchDetails