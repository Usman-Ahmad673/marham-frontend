import React, { Fragment, useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import MetaData from '../MetaData'
import { Card } from 'react-bootstrap';
import Loader from '../layout/Loader/Loader'
import { clearErrors, getDoctorDetails } from '../../actions/doctorAction'
import { getHospitalDetails } from '../../actions/hospitalAction'
import { getDiseases } from '../../actions/diseaseAction'
import { getSymptoms } from '../../actions/symptomAction'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import DoctorCard from './doctorCard';
import HospitalCard from './hospitalCard';
import DiseaseCard from './diseaseCard.js';
import SymptomCard from './SymptomCard.js';
import './home.css'
import logo from '../../images/marham.png'
import image2 from '../../images/surgeries.png'
import image3 from '../../images/instant-img.png'
import image4 from '../../images/videoConsultimage.png'
import image5 from '../../images/female-doc.jpg'
import image6 from '../../images/hands-unrecogniza.png'
import image7 from '../../images/blogs.png'
import image8 from '../../images/labs-images.png'
import image9 from '../../images/waight-loss-man.png'
import Search from './Search/Search'
import Questions from './Questions/Questions'
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';



const Home = () => {
    const navigate = useNavigate();

    


    const [city, setCity] = useState('London');

console.log(`city is ${city}`);


        const [showModal, setShowModal] = useState(false);

        const handleCloseModal = () => {
        setShowModal(false);
        };
    
        const handleOpenModal = () => {
        setShowModal(true);
        };
    
    const dispatch = useDispatch()
    

    

    const { doctor, loading: doctorLoading, error: doctorError } = useSelector((state) => state.doctorDetails);

    const { hospital, loading: hospitalLoading, error: hospitalError } = useSelector((state) => state.hospitalDetails);
    

    const { diseases, loading: diseaseLoading, error: diseaseError } = useSelector((state) => state.diseases);
    
    const { symptoms, loading: symptomLoading, error: symptomError } = useSelector((state) => state.symptoms);
    

    const [keyword , setKeyword] = useState("")
    console.log(keyword);

    const searchSubmitHandler = (e) => {
        // e.preventDefault();
        console.log(keyword);
    if (keyword.trim()) {
        // navigate(`/doctor/${keyword}`);
        navigate(`/symptom/${keyword}`);
        } else {
        navigate("/");
    }
    }


    

    const showToastErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    
    useEffect(() => {
        if(doctorError){
            showToastErrorMessage(doctorError)
            dispatch(clearErrors())
        }
        dispatch(getDoctorDetails(city));
    },[dispatch, city, doctorError]);
    
    useEffect(() => {
        if(hospitalError){
            showToastErrorMessage(hospitalError)
            dispatch(clearErrors())
        }
        dispatch(getHospitalDetails(city));
    },[dispatch, city, hospitalError]);
    
    
    useEffect(() => {
        if(diseaseError){
            showToastErrorMessage(diseaseError)
            dispatch(clearErrors())
        }
        dispatch(getDiseases());
    },[dispatch, diseaseError]);
    
    
    useEffect(() => {
        
        if(symptomError){
            showToastErrorMessage(symptomError)
            dispatch(clearErrors())
        }
        dispatch(getSymptoms());
    },[dispatch, symptomError]);



    return (
        <Fragment>
        {doctorLoading && hospitalLoading ? (<Loader/>) :  
(            
    <Fragment>
    <MetaData title="MARHAM"/>
        <div className='container-fluid p-5  position-relative min-vh-100'>
            <div className="row">
                    <div className='col-1 mb-3'>
                        <div>
                                <img src={logo} alt="logo-img" width="80"/>
                        </div>
                    </div>
                    <div className='col-11'>
                        <b> Hello, Guest</b>

                    </div>
                
                <div className='col-12'>
                {/* <div> */}
                    <h4>Find The Best Doctor Near You</h4>
                {/* </div> */}
                </div>
                <div className='col-9 m-5'>
                    <Search />
                </div>
                

                <div className='col-12'>
                        <h4>How can we help you today</h4>
                </div>




                {/* Images */}
                <div className='small col-5 p-2 m-3'>
                    <div className='clinic' onClick={handleOpenModal}>
                    <div className='heading_img'>
                        <h5>Video Consultation</h5>
                        <p>PMC Verified Doctors</p>
                    </div>
                    <img src={image4} width='150' alt="doct" />
                    </div>
                </div>
                <div className='col-5 p-2 m-3'>
                    <div className='clinic' onClick={handleOpenModal}>
                    <div className="heading_img">
                        <h5>In-clinic Visit</h5>
                        <p>Book Appointment</p>
                    </div>
                    <img src={image5} width='150' alt="doct" />
                    </div>
                </div>
                    {/*<div className='col-5 p-2 m-3'>
                        <div className='clinic'>
                        <div className="heading_img">

                                <h5>Get Instant Relief</h5>
                        </div>
                                <a href='/instant-relief'><img src={image3} width='150' alt="doct" /></a>
                        </div>
                    </div>
                    <div className='col-5 p-2 m-3'>
                        <div className='clinic'>
                        <div className="heading_img">
                            
                                <h5>Weight Loss Clinic</h5>
                        </div>
                                <a href='/weight-loss'><img src={image9} width='150' alt="doct" /></a>
                        </div>
                    </div> */}
                    {/* <div className="shorts"> */}

                    <div className='col-2 p-2 m-3'>
                        <div>
                                <a href='/labs'><img src={image8} width='100' alt="doct" /></a>
        
                                <h5>Labs</h5>
                        </div>
                    </div>
                    {/* <div className='col-2 p-2 m-3'>
                        <div>
                                <a href='/health-blog'><img src={image7} width='150' alt="doct" /></a>
                                <h5>Blogs</h5>
                        </div>
                    </div> */}
                    <div className='col-2 p-2 mt-3'>
                        <div>
                                <a href='/hospitals'><img src={image6} width='150' alt="doct" /></a>
                                <h5>Hospitals</h5>
                        </div>
                    </div>
                    <div className='col-2 p-2 m-3'>
                        <div>
                                <a href='/surgeries'><img src={image2} width='150' alt="doct" /></a>
                                <h4>Surgeries</h4>
                        </div>
                    </div>
                    {/* </div> */}
                        
            </div>




        </div>

        <h4 style={{margin:'0.5rem', color:'green'}}>Symptoms</h4>
        <div className="docCard">        
            {symptoms && symptoms.length > 0 ? (
                symptoms.map((symptom) => (
                    <SymptomCard key={symptom._id} symptoms={[symptom]} />
                ))
            ) : (
                'No symptoms Found'
            )}
        </div>

        <h4 style={{margin:'0.5rem', color:'green'}}>Diseases</h4>
        <div className="docCard">        
            {diseases ? diseases.map((disease) => (
                <DiseaseCard key={disease._id} diseases={[disease]} />
            )) : 'No diseases Found'}
        </div>



            <div className="col-12 overflow-hidden">
                <Questions />
            </div>

        {hospital && <h3 style={{margin:'0.5rem', color:'green'}}>Hospitals in {city}</h3>}
        <div className="docCard">
        
            {Array.isArray(hospital) ? (
                hospital.map((hospitals) => (
                    // Add a unique key prop to the HospitalCard component
                    <div key={hospitals._id}><HospitalCard key={hospitals._id} hospitals={[hospitals]} /></div>
                ))
            ) : (
                // Handle the case when `hospital` is not an array
                <div>No Hospital's available in {city}</div>
            )}
        </div>


        {doctor && <h3 style={{margin:'0.5rem', color:'green'}}>Doctors in {city}</h3>}
        <div className="docCard">
        {/* {doctor && <h3>Doctors in Lahore</h3>} */}
            {Array.isArray(doctor) ? (
                doctor.map((doctors) => (
                    // Add a unique key prop to the DoctorCard component
                    <div key={doctors._id}><DoctorCard key={doctors._id} doctors={[doctors]} /></div>
                ))
            ) : (
                // Handle the case when `doctor` is not an array
                <div>No Doctor's available in {city}</div>
            )}
        </div>
        
        
        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton style={{ background: '#014E76', borderBottom: 'none' }}>
            <Modal.Title style={{ color: '#fff', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Consult Online with PMC Verified Doctors</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '20px', textAlign: 'center' }}>
            <Form>
                <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Search By Specialities"
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ borderRadius: '10px', border: '1px solid #ccc', padding: '10px', width: '100%' }}
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center' }}>
            <Button variant="secondary" onClick={handleCloseModal} style={{ marginRight: '10px' }}>Close</Button>
            <Button variant="primary" onClick={searchSubmitHandler}>Search</Button>
            </Modal.Footer>
        </Modal>

    </Fragment>
)}
            </Fragment>
    )
}

export default Home
