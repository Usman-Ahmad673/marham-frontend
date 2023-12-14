import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom'
import { BsCalendar, BsClock, BsGeoAlt } from 'react-icons/bs';
import { clearErrors, getDoctorDetails, getDoctorDetailsById } from '../../actions/doctorAction';
import Loader from '../layout/Loader/Loader';
import './doctorDetails.css'
import ScheduleAppointment from './scheduleAppointment';
import SdsDoctor from './sdsDoctor';

const DoctorDetails = () => {
    const { id } = useParams();

    console.log(id);

    const dispatch = useDispatch();
    const { doctor, loading, error } = useSelector((state) => state.doctorDetailsById);

    console.log(`doctor`);
    console.log(doctor);
    

    const showToastErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    useEffect(() => {
        if (error) {
            showToastErrorMessage(error)
            dispatch(clearErrors());
        }
        dispatch(getDoctorDetailsById(id));
    }, [dispatch, id, error]);

    console.log(`doctor details:${id}`);
    if (loading || !doctor) {
        return <Loader />;
    }

    if (!doctor || doctor.length === 0) {
        return (<div>No Doctor Found</div>);
    }
    
    return (
        <React.Fragment>
        {doctor && (
            <div className="container">

            <div className="practice-details-grid-container">
                <div className='left-side'>
                        {doctor.images?.url && (
                            <img src={doctor.images.url} alt={doctor.images.public_id} />
                            )}
                        <div className="about">
                            <p>{doctor.name} <b>{doctor.surgeon ? 'Surgeon' : ''}</b></p>
                            <p>{doctor.speciality}</p>
                            <p>{doctor.qualification}</p>
                        </div>
                </div>

                <div className='right-side'> 
                    <button>Video Consultation</button>
                    <button>Book Appointment</button>
                </div>
            
            </div>


            <div className="practice-container-2">
            
            {doctor.hospital !== undefined ? 
                    (<div className="practice-details-video-consult">
                    
                        <div className="clinic-consult">
                        <div className="video-consult">
                                <h5>{doctor.hospital.hospital_name}</h5>
                            </div>
                            <div className="video-consult-details">
                                <p><BsCalendar />Days {doctor.hospital.hospital_days.join(', ')}</p>
                                {/* <p>Timings {doctor.clinic.clinic_timings.start} - {doctor.clinic.clinic_timings.end}</p> */}
                                <p><BsGeoAlt /> Address {doctor.hospital.hospital_address}</p>
                            </div>
                        </div>
                    
                </div>) : ''
                }

                {doctor.videoConsult !== undefined ? 
                    (<div className="practice-details-video-consult">
                        <div className="clinic-consult">

                            <div className="video-consult">
                                <h5>
                                Video Consultation
                                </h5>
                                <b>
                                £ - {doctor.fee}
                                </b> 
                            </div>
                            <div className="video-consult-details">
                                <p><BsCalendar /> Days {doctor.videoConsult.days.join(', ')}</p>
                                <p><BsClock /> Timings {doctor.videoConsult.timings !== undefined ? doctor.videoConsult.timings.start : ''} - {doctor.videoConsult.timings !== undefined ? doctor.videoConsult.timings.end : ''}</p>
                                <p>{doctor.videoConsult.status}</p>
                            </div>
                        
                        </div>
                    </div>) : ''
                }

                {doctor.clinic !== undefined ? 
                    (<div className="practice-details-video-consult">
                    
                        <div className="clinic-consult">
                        <div className="video-consult">
                                <h5>{doctor.clinic.clinic_name} Clinic</h5> 
                                <b>£ - {doctor.clinic.clinic_fee}</b>
                            </div>
                            <div className="video-consult-details">
                                <p><BsCalendar />Days {doctor.clinic.clinic_days.join(', ')}</p>
                                <p><BsClock /> Timings {doctor.clinic.clinic_timings !== undefined ? doctor.clinic.clinic_timings.start : ''} - {doctor.clinic.clinic_timings !== undefined ? doctor.clinic.clinic_timings.end : ''}</p>
                                <p><BsGeoAlt /> Address {doctor.clinic.clinic_address}</p>
                            </div>
                        </div>
                    
                </div>) : ''
                }

            </div>


                <div className="schedule-appointment">
                    <ScheduleAppointment data={doctor}/>
                </div>

                
                
                <div className="s-d-s">
                    <SdsDoctor data={doctor}/>
                </div>
            


            
            

            </div>
        )}
            
        </React.Fragment>
    )
}

export default DoctorDetails