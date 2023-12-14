import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom'
import { BsCalendar, BsClock, BsGeoAlt } from 'react-icons/bs';
import { clearErrors, getDoctorDetails } from '../../actions/doctorAction';
import Loader from '../layout/Loader/Loader';


const SymptomDetails = () => {

    const { id } = useParams();

    console.log(`name of symptom is ${id}`);


    const dispatch = useDispatch()
    
    const {doctor , loading , error} = useSelector((state) => state.doctorDetails)




    

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
        dispatch(getDoctorDetails(id));
        
    },[dispatch, error]);

    if (loading || !doctor) {
        return <Loader />
    }
    

    return (
        <React.Fragment>
        <div className="container">
        {doctor.length === 0 ? (
            <div>No doctor found for this symptom.</div>
                ) : (
                    Array.isArray(doctor) ? (
                        doctor.map((doc) => (
                    <Link to={`/doctor/${doc._id}`} style={{color:'black', textDecoration:'none'}}>
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
                                <p>{id}</p>
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
                    ))
                        ) : ('')
                )}
        </div>
    </React.Fragment>
                
    )
}

export default SymptomDetails