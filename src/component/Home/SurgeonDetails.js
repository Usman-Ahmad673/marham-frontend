import React, { Fragment, useEffect, useState } from 'react'
import './surgeonDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, getDoctorDetails, getDoctorDetailsById } from '../../actions/doctorAction';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addSurgeonAppointment } from '../../actions/Admin/surgeonAppointmentAction';
import { NEW_SURGEONAPPOINTMENT_RESET } from '../../constants/Admin/surgeonAppointmentConstant';

const SurgeonDetails = () => {
    const {id} = useParams()


    const navigate = useNavigate()

    
    const [name , setName] = useState('')
    const [phone , setPhone] = useState('')
    const [city , setCity] = useState('')
    
    const SubmitForm = async(e) => {
        e.preventDefault()
        
        const myForm = new FormData();
        
        myForm.set("name", name);
        myForm.set("phone", phone);
        myForm.set("city", city);        
        myForm.set("doctorName", doctor.name);        
        myForm.set("doctorContact", doctor.contact);        
        myForm.set("doctorAccountNumber", doctor.accountNumber);        
        console.log(myForm);
        console.log(name);
        console.log(phone);
        console.log(city);
        console.log(doctor.name);
        console.log(doctor.doctorContact);
        console.log(doctor.accountNumber);

        
        sessionStorage.setItem("fee", JSON.stringify(doctor.fee));
        sessionStorage.setItem("name", JSON.stringify(name));
        navigate('/process/payment')
        
        dispatch(addSurgeonAppointment(myForm));
    }
    
    const dispatch = useDispatch();
    
    const { doctor, loading, error } = useSelector((state) => state.doctorDetailsById);
    console.log(doctor);

    const { success } = useSelector((state) => state.newSurgeonAppointment);
    

    
    

    const showToastSuccessMessage = () => {
        toast.success(`Successfully Created Surgeon Appointment!`, {
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
        if (success) {
            showToastSuccessMessage();
            navigate("/admin/");
            dispatch({ type: NEW_SURGEONAPPOINTMENT_RESET });
        }
        console.log(id);;
        dispatch(getDoctorDetailsById(id));
    }, [dispatch, id, error , success]);

    if (loading || !doctor) {
        return <Loader />;
    }

    if (!doctor || doctor.length === 0) {
        return (<div>No Doctor Found</div>);
    }




    return (
        <Fragment>
            <div className="container flex">
                <div className="left-flex">
                    <img src={doctor.images?.url} alt={doctor.images?.public_id} />
                    <div className="surgeon_details">
                        <h4>{doctor.name}</h4>
                        <p>{doctor.qualification}</p>
                        <p>{doctor.speciality}</p>
                        <p>Exp: {doctor.experience}</p>
                    <button className=''>Book Surgery</button>
                    </div>
                </div>
                <div className="right-flex">
                    <div className="form-fill">
                        <h3>Book Your Surgery Through Marham</h3>
                        <p>(At Lowest Prices)</p>
                        <p>Fill the form below to get a call from us or directly Call us at</p>
                        <p>03111222398</p>
                        <form className='surgeon-form' onSubmit={SubmitForm}>
                            <input type="text" 
                                    placeholder='Add Name Here'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required = {true}
                                    />
                            <input type="text" 
                                    placeholder='Add Phone Number' 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required = {true}
                                    />
                            <input type="text" 
                                    placeholder='Add City' 
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required = {true}
                                    />
                            <button type='submit'>Book Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SurgeonDetails