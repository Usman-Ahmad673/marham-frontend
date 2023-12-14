    import React, { useEffect, useState } from 'react';
    import { useDispatch, useSelector } from 'react-redux';
    import { Link, useParams } from 'react-router-dom';
    import { clearErrors, getHospitalDetails, getHospitalDetailsById } from '../../actions/hospitalAction';
    import { getDoctorDetails } from '../../actions/doctorAction';
    import Loader from '../layout/Loader/Loader';
    import DoctorCard from './doctorCard';
    import './hospitalDetails.css'
    import { FaClock, FaMapMarkerAlt, FaStethoscope } from 'react-icons/fa';
    import { Modal, Form, Button } from 'react-bootstrap';
    import { toast } from 'react-toastify';

    
    const HospitalDetails = () => {


        const [showModal, setShowModal] = useState(false);

        const handleCloseModal = () => {
        setShowModal(false);
        };
    
        const handleOpenModal = () => {
        setShowModal(true);
        };


    const { id } = useParams();
    
    const dispatch = useDispatch();

    const { hospital, loading, error: hospitalError } = useSelector(
        (state) => state.hospitalDetailsById
    );
    const { doctor, error: doctorError } = useSelector(
        (state) => state.doctorDetails
    );

    
    

    const showToastErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    useEffect(() => {
        if (hospitalError) {
        showToastErrorMessage(hospitalError);
        dispatch(clearErrors());
        }
        if (doctorError) {
        showToastErrorMessage(doctorError);
        dispatch(clearErrors());
        }
        if (hospital && hospital.name) {
        dispatch(getDoctorDetails(hospital.name));
    }
        console.log(id);
        dispatch(getHospitalDetailsById(id));
    }, [dispatch, hospital]);



    if (loading || !hospital) {
        return <Loader />;
    }

    const doctorCount = doctor ? doctor.length : 0;

    return (
        <React.Fragment>
        {!hospital.length > 0 ? (
        <>

        <div className="jumotron m-5">
            <div className="hospital-header">
                <h4>{hospital.name}</h4>
                <h4><FaMapMarkerAlt />{hospital.address}</h4>
                <div className="foot">
                    <h5><FaStethoscope />{doctorCount} {doctorCount > 1 ? 'doctors':"doctor"} available</h5>
                    <p><FaClock />24/7 Open</p>

                </div>
            </div>

            <h4>Specialities</h4>
            <div className="speciality">
                {hospital.specialities &&
                    hospital.specialities.map((special, index) => (
                            <button key={special._id} className='link-button'>{special.name}</button>
                        
))}

            </div>

            <div className="doctors d-flex flex-wrap flex-column" style={{width:'max-content'}}>
                {Array.isArray(doctor) ? (
                doctor.map((doctors, index) => (
                    <div key={index}>
                    <DoctorCard key={doctors._id} doctors={[doctors]} />
                    </div>
                ))
                ) : (
                // Handle the case when `doctor` is not an array
                <div>No doctor data available</div>
                )}
            </div>

            <div className="hospital_about">
                <h3>Hospital About</h3>
                {hospital.about}
            </div>

            <div className="hospital_test">
                <b>Tests in {hospital.name}</b>
                {hospital.tests &&
                hospital.tests.map((test, index) => (
                    <div key={index}>
                    <li>
                        {test.test_name} {test.test_price}
                    </li>
                    </div>
                ))}
            </div>

            <div className="hospital_description">
                <h3>Hospital Description</h3>
                {hospital.description}
            </div>

            <div className="help-button">
                <button onClick={handleOpenModal} value={hospital.helpline}>Help Line</button>
            </div>
            </div>

        
        </>


        ): (
        <p>No hospitals available</p>
        )}
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Body style={{ padding: '20px', textAlign: 'center' }}>
            <h5>We are here to help you :)</h5>
            <p>Feel free to call our helpline</p>
            <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center', display:'flex', flexDirection:'column', padding: '20px' }}>
            <Button variant="danger" style={{ fontSize:'2rem', margin: '10px' , width:'20rem' }}>{hospital.helpline}</Button>
            </Modal.Footer>
                <h3>Available: 09:00 AM - 11:00 PM</h3>
            </Modal.Body>
        </Modal>
        </React.Fragment>
    );
    };

    export default HospitalDetails;
