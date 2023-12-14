    import React, { useEffect, useState } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { toast } from 'react-toastify'
    import { clearErrors, getDoctorDetails, updateDoctor } from "../../../actions/doctorAction";
    import { useNavigate, useParams } from 'react-router-dom'
    import { UPDATE_DOCTOR_RESET } from "../../../constants/doctorConstant";

    const DoctorEdit = () => {
        const params = useParams()
        const navigate = useNavigate()
    const doctorId = params.id; // Assuming the doctor ID is part of the URL params

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");
    const [fee, setFee] = useState("");
    const [email, setEmail] = useState("");
    const [services, setServices] = useState({});
    const [symptoms, setSymptoms] = useState([]);
    const [disease, setDisease] = useState([]);
    const [speciality, setSpeciality] = useState("");
    const [surgeon, setSurgeon] = useState("");

    const { doctor, error } = useSelector((state) => state.doctorDetails);
    
    const { loading, error:updateError, isUpdated } = useSelector((state) => state.delDoctor);




    
    const showToastSuccessMessage = () => {
        toast.success(`Successfully Update Doctor!`, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    

    const showToastErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };


    useEffect(() => {
        if (!doctor || doctor._id !== doctorId) {
        dispatch(getDoctorDetails(doctorId));
        } else {
        setName(doctor.name);
        setCity(doctor.city);
        setAddress(doctor.address);
        setContact(doctor.contact);
        setQualification(doctor.qualification);
        setExperience(doctor.experience);
        setDescription(doctor.description);
        setFee(doctor.fee);
        setEmail(doctor.email);
        // setServices(doctor.services);
        // setSymptoms(doctor.symptoms);
        // setDisease(doctor.disease);
        setSpeciality(doctor.speciality);
        setSurgeon(doctor.surgeon);
        // Set other state variables with doctor's information
        }
        if(error){
            showToastErrorMessage(error)
            dispatch(clearErrors())
        }
        if(updateError){
            showToastErrorMessage(updateError)
            dispatch(clearErrors())
        }
    if (isUpdated) {
        showToastSuccessMessage();
        navigate("/admin/");
        dispatch({ type: UPDATE_DOCTOR_RESET });
    }
    },[dispatch, doctor, error, navigate, isUpdated , doctorId , updateError]);

    const submitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("city", city);
        myForm.set("address", address);
        myForm.set("contact", contact);
        myForm.set("qualification", qualification);
        myForm.set("experience", experience);
        myForm.set("description", description);
        myForm.set("fee", fee);
        myForm.set("email", email);
        // myForm.set("services", services);
        // myForm.set("symptoms", symptoms);
        // myForm.set("disease", disease);
        myForm.set("speciality", speciality);
        myForm.set("surgeon", surgeon);
        // Dispatch an action to update the doctor's information
        dispatch(updateDoctor(doctorId, myForm));
    };

    return (
        <div>
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error: {error}</p>
        ) : (
            <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="city">city:</label>
                <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="address">address:</label>
                <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="contact">contact:</label>
                <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="qualification">qualification:</label>
                <input
                type="text"
                id="qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="experience">experience:</label>
                <input
                type="text"
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">description:</label>
                <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="fee">fee:</label>
                <input
                type="text"
                id="fee"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">email:</label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {/* <div>
                <label htmlFor="services">services:</label>
                <input
                type="text"
                id="services"
                value={services}
                onChange={(e) => setServices(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="symptoms">symptoms:</label>
                <input
                type="text"
                id="symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="disease">disease:</label>
                <input
                type="text"
                id="disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                />
            </div> */}
            <div>
                <label htmlFor="speciality">Specialization:</label>
                <input
                type="text"
                id="speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="surgeon">surgeon:</label>
                <input
                type="text"
                id="surgeon"
                value={surgeon}
                onChange={(e) => setSurgeon(e.target.value)}
                />
            </div>
            {/* Add other input fields for the doctor's information */}
            <button type="submit">Update</button>
            </form>
        )}
        </div>
    );
    };

    export default DoctorEdit;
