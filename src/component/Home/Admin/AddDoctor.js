import React, { Fragment, useEffect, useState } from 'react'
import './create.css'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { clearErrors , addDoctor } from '../../../actions/doctorAction'
// import MetaData from '../layout/MetaData'
import { NEW_DOCTOR_RESET } from '../../../constants/doctorConstant'
import { toast } from 'react-toastify'

const AddDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { loading, error, success } = useSelector((state) => state.newDoctor);

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [name, setName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [description, setDescription] = useState("");
    const [fee, setFee] = useState("");
    const [email, setEmail] = useState("");
    const [services, setServices] = useState([]);
    const [speciality, setSpeciality] = useState("");
    const [surgeon, setSurgeon] = useState(false);
    // const [clinicName, setClinicName] = useState("");
    // const [clinicFee, setClinicFee] = useState("");
    // const [clinicDays, setClinicDays] = useState([]);
    // const [clinicAddress, setClinicAddress] = useState("");
    // const [clinicTimings, setClinicTimings] = useState({ start: "", end: "" });
    // const [hospitalName, setHospitalName] = useState("");
    // const [hospitalAddress, setHospitalAddress] = useState("");
    // const [hospitalDays, setHospitalDays] = useState([]);
    
    const [symptoms, setSymptoms] = useState([{ name: "" }]);
    
    const handleSymptomChange = (index, value) => {
        setSymptoms((prevSymptoms) => {
            const updatedSymptoms = [...prevSymptoms];
            updatedSymptoms[index] = { name: value };
            return updatedSymptoms;
        });
    };
    
    const handleAddSymptom = () => {
        setSymptoms((prevSymptoms) => [...prevSymptoms, { name: "" }]);
    };
    
    const handleRemoveSymptom = (index) => {
        setSymptoms((prevSymptoms) => prevSymptoms.filter((_, i) => i !== index));
    };
    
    
    
    
    const [diseases, setDiseases] = useState([{ name: "" }]);






    const [videoConsult, setVideoConsult] = useState({
        videoConsultDays: [
            { day: "monday" },
            { day: "tuesday" },
            { day: "wednesday" },
            { day: "thursday" },
            { day: "friday" },
            { day: "saturday" },
            { day: "sunday" }
        ],
        videoConsultTimings: {
            start: "",
            end: ""
        }
    });

  // Function to remove a videoConsult day
const handleRemoveVideoConsultDay = (index) => {
    setVideoConsult((prevClinic) => ({
        ...prevClinic,
        videoConsultDays: prevClinic.videoConsultDays.filter((_, i) => i !== index)
    }));
};





    // Function to handle changes in videoConsult fields
        const handleVideoConsultChange = (e) => {
            let { name, value } = e.target;
            if(value >= '00:00' && value < '13:00'){
                value += 'AM'
            }
            else{
                value += 'PM'
            }
            console.log(name);
            console.log(value);
            console.log(typeof value);

            let updatedTimings;
            if (name === "videoConsult.videoConsultTimings.start") {
                updatedTimings = { ...videoConsult.videoConsultTimings, start: value };
                } else if (name === "videoConsult.videoConsultTimings.end") {
                updatedTimings = { ...videoConsult.videoConsultTimings, end: value };
                } else {
                updatedTimings = videoConsult.videoConsultTimings;
                }
            
                setVideoConsult((prevVideoConsult) => ({
                ...prevVideoConsult,
                [name]: value,
                videoConsultTimings: updatedTimings,
                }));

            console.log(setVideoConsult);
            // setVideoConsult((prevVideoConsult) => ({
            // ...prevVideoConsult,
            // [name]: value,
            // }));
        };
        

        useEffect(() => {
            console.log(videoConsult);
        }, [videoConsult]);









    const handleDiseaseChange = (index, value) => {
        setDiseases((prevDiseases) => {
            const updatedDiseases = [...prevDiseases];
            updatedDiseases[index] = { name: value };
            return updatedDiseases;
        });
    };
    
    const handleAddDisease = () => {
        setDiseases((prevDiseases) => [...prevDiseases, { name: "" }]);
    };
    
    const handleRemoveDisease = (index) => {
        setDiseases((prevDiseases) => prevDiseases.filter((_, i) => i !== index));
    };



    const [hospital, setHospital] = useState({
        hospitalName: "",
        hospitalAddress: "",
        hospitalDays: [
            { day: "sunday" },
            { day: "monday" },
            { day: "tuesday" },
            { day: "wednesday" },
            { day: "thursday" },
            { day: "friday" }
        ]
    });

        // Function to handle changes in hospital fields
        const handleHospitalChange = (e) => {
            const { name, value } = e.target;
            setHospital((prevHospital) => ({
                ...prevHospital,
                [name]: value
            }));
        };
    
    // // Function to add a hospital day
    // const handleAddHospitalDay = () => {
    //     setHospital((prevHospital) => ({
    //         ...prevHospital,
    //         hospitalDays: [...prevHospital.hospitalDays, { day: "" }]
    //     }));
    // };
    
    // Function to remove a hospital day
    const handleRemoveHospitalDay = (index) => {
        setHospital((prevHospital) => ({
            ...prevHospital,
            hospitalDays: prevHospital.hospitalDays.filter((_, i) => i !== index)
        }));
    };
    
    const [clinic, setClinic] = useState({
        clinicName: "",
        clinicFee: "",
        clinicDays: [
            { day: "monday" },
            { day: "tuesday" },
            { day: "wednesday" },
            { day: "thursday" },
            { day: "friday" },
            { day: "saturday" },
            { day: "sunday" }
        ],
        clinicAddress: "",
        clinicTimings: {
            start: "",
            end: ""
        }
    });
    

    // // Function to add a clinic day
    // const handleAddClinicDay = () => {
    //     setClinic((prevClinic) => ({
    //         ...prevClinic,
    //         clinicDays: [...prevClinic.clinicDays, { day: "" }]
    //     }));
    // };

  // Function to remove a clinic day
const handleRemoveClinicDay = (index) => {
    setClinic((prevClinic) => ({
        ...prevClinic,
        clinicDays: prevClinic.clinicDays.filter((_, i) => i !== index)
    }));
};





    // Function to handle changes in clinic fields
    const handleClinicChange = (e) => {
        let { name, value } = e.target;

        setClinic((prevClinic) => ({
            ...prevClinic,
            [name]: value
        }));
        console.log(name);
        console.log(value);
    };



    const handleClinicTimeChange = (e) => {
        let { name, value } = e.target;
            if(value >= '00:00' && value < '13:00'){
                value += 'AM'
            }
            else{
                value += 'PM'
            }

            let updatedTimings;
            if (name === "clinic.clinicTimings.start") {
                updatedTimings = { ...clinic.clinicTimings, start: value };
                } else if (name === "clinic.clinicTimings.end") {
                updatedTimings = { ...clinic.clinicTimings, end: value };
                } else {
                updatedTimings = clinic.clinicTimings;
                }

        setClinic((prevClinic) => ({
            ...prevClinic,
                [name]: value,
                clinicTimings: updatedTimings,
        }));
        console.log(name);
        console.log(value);
    };


    const handleAddItem = (value, setState) => {
        setState((prevItems) => [...prevItems, value]);
        console.log(setState);
    };

    const handleRemoveItem = (index, setState) => {
        setState((prevItems) => prevItems.filter((item, i) => i !== index));
        console.log(setState);
    };

    


    const showToastSuccessMessage = () => {
        toast.success(`Successfully Created Doctor!`, {
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
            dispatch({ type: NEW_DOCTOR_RESET });
        }
        // }, [dispatch, alert, error, navigate, success]);
        }, [dispatch, error, navigate, success]);

        const hhandleSubmit = async (e) => {
            e.preventDefault();
            console.log(`videoConsult start${videoConsult.videoConsultTimings.start}`);
            console.log(`videoConsult start${videoConsult.videoConsultTimings.end}`);
    
        }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(`videoConsult start${videoConsult.videoConsultTimings.start}`);
        console.log(`videoConsult start${videoConsult.videoConsultTimings.end}`);

        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("city", city);
        myForm.set("accountNumber", accountNumber);
        myForm.set("address", address);
        myForm.set("contact", contact);
        myForm.set("qualification", qualification);
        myForm.set("experience", experience);
        myForm.set("description", description);
        myForm.set("fee", fee);
        myForm.set("email", email);
        myForm.set("services.name", services);
        symptoms.forEach((symptom, index) => {
            myForm.set(`symptoms[${index}][name]`, symptom.name);
        });
        
        diseases.forEach((disease, index) => {
            myForm.set(`disease[${index}][name]`, disease.name);
        });
        myForm.set("speciality", speciality);
        myForm.set("surgeon", surgeon);
                
       // Add clinic data
myForm.set("clinic[clinic_name]", clinic.clinicName);
myForm.set("clinic[clinic_fee]", clinic.clinicFee);
// Loop through clinic days array and append each day
clinic.clinicDays.forEach((day, index) => {
    myForm.set(`clinic[clinic_days][${index}]`, day.day);
});
myForm.set("clinic[clinic_address]", clinic.clinicAddress);
myForm.set("clinic.clinic_timings.start", clinic.clinicTimings.start);
myForm.set("clinic.clinic_timings.end", clinic.clinicTimings.end);





// Add video consult data
// Loop through clinic days array and append each day
videoConsult.videoConsultDays.forEach((day, index) => {
    myForm.set(`videoConsult[days][${index}]`, day.day);
});
myForm.set("videoConsult.timings.start", videoConsult.videoConsultTimings.start);
myForm.set("videoConsult.timings.end", videoConsult.videoConsultTimings.end);





// Add hospital data
myForm.set("hospital[hospital_name]", hospital.hospitalName);
myForm.set("hospital[hospital_address]", hospital.hospitalAddress);
// Loop through hospital days array and append each day
hospital.hospitalDays.forEach((day, index) => {
    myForm.set(`hospital[hospital_days][${index}]`, day.day);
});




images.forEach((image) => {
            myForm.append("images", image);
        });
        
        console.log(myForm);
        dispatch(addDoctor(myForm));
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
            const reader = new FileReader();
    
            reader.onload = () => {
            if (reader.readyState === 2) {
                setImagesPreview((old) => [...old, reader.result]);
                setImages((old) => [...old, reader.result]);
            }
            };
    
            reader.readAsDataURL(file);
        });
        };




        const timeOptions = Array.from({ length: 24 }, (_, i) => {
            const time = i.toString().padStart(2, '0') + ":00";
            return (
                <option key={time} value={time}>
                    {time}
                </option>
            );
        });
        




    return (
        <div className='container'>
            <h2>Add Doctor</h2>
            <form className="form-container" encType="multipart/form-data" onSubmit={handleSubmit}>
            <div id="createProductFormFile">
                <input
                required={true}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
                />
                </div>

                <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                ))}
                </div>
            <div>
            <label htmlFor="name">Name:</label>
            <input
            required={true}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="account">Account Number:</label>
            <input
            required={true}
                type="text"
                id="name"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="city">City:</label>
            <input
            required={true}
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="address">Address:</label>
            <input
            required={true}
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="contact">Contact:</label>
            <input
            required={true}
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="qualification">Qualification:</label>
            <input
            required={true}
                type="text"
                id="qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="experience">Experience:</label>
            <input
            required={true}
                type="text"
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="description">Description:</label>
            <input
            required={true}
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="fee">Fee:</label>
            <input
            required={true}
                type="text"
                id="fee"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="email">Email:</label>
            <input
            required={true}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="serviceName">Service Name:</label>
            <input
            required={true}
                type="text"
                id="serviceName"
                value={services}
                onChange={(e) => setServices(e.target.value)}
            />
            {/* <button type="button" onClick={() => handleAddItem("", setServices)}>
                Add Service
            </button> */}
            </div>
            
            <div className="form-group">
                <label htmlFor="symptoms">Symptoms:</label>
                {symptoms.map((symptom, index) => (
                    <div key={index} className="input-group">
                    <input
                    required={true}
                        type="text"
                        value={symptom.name}
                        onChange={(e) => handleSymptomChange(index, e.target.value)}
                        className="form-input"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveSymptom(index)}
                        className="remove-button"
                    >
                        Remove
                    </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddSymptom}
                    className="add-button"
                >
                    Add Symptom
                </button>
            </div>
            
            <div className="form-group">
                <label htmlFor="disease">Disease:</label>
                {diseases.map((disease, index) => (
                    <div key={index} className="input-group">
                    <input
                    required={true}
                        type="text"
                        value={disease.name}
                        onChange={(e) => handleDiseaseChange(index, e.target.value)}
                        className="form-input"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveDisease(index)}
                        className="remove-button"
                    >
                        Remove
                    </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddDisease}
                    className="add-button"
                >
                    Add Disease
                </button>
            </div>
            
            <div>
            <label htmlFor="speciality">Speciality:</label>
            <input
            required={true}
                type="text"
                id="speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="surgeon">Surgeon:</label>
            <div>
                <label>
                <input
                required={true}
                    type="radio"
                    name="surgeon"
                    value="true"
                    checked={surgeon === true}
                    onChange={() => setSurgeon(true)}
                />
                Yes
                </label>
                <label>
                <input
                required={true}
                    type="radio"
                    name="surgeon"
                    value="false"
                    checked={surgeon === false}
                    onChange={() => setSurgeon(false)}
                />
                No
                </label>
            </div>
            </div>
            


            

    {/* Add Clinic Data */}
                <div>
                <label htmlFor="clinicName">Clinic Name:</label>
                <input
                required={true}
                    type="text"
                    id="clinicName"
                    name="clinicName"
                    value={clinic.clinicName}
                    onChange={handleClinicChange}
                />
                </div>
                <div>
                <label htmlFor="clinicFee">Clinic Fee:</label>
                <input
                required={true}
                    type="text"
                    id="clinicFee"
                    name="clinicFee"
                    value={clinic.clinicFee}
                    onChange={handleClinicChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="clinicDays">Clinic Days:</label>
                {clinic.clinicDays.map((day, index) => (
                <div key={index} className="input-group">
                    <input
                    required={true}
                        type="text"
                        value={day.day}
                        onChange={(e) => {
                            const updatedDays = [...clinic.clinicDays];
                            updatedDays[index].day = e.target.value;
                            setClinic((prevClinic) => ({
                                ...prevClinic,
                                clinicDays: updatedDays
                            }));
                        }}
                        className="form-input"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveClinicDay(index)}
                        className="remove-button"
                    >
                        Remove
                    </button>
                </div>
            ))}
                </div>




                <div>
                <label htmlFor="clinicAddress">Clinic Address:</label>
                <input
                required={true}
                    type="text"
                    id="clinicAddress"
                    name="clinicAddress"
                    value={clinic.clinicAddress}
                    onChange={handleClinicChange}
                />
                </div>




                <div>
                    <label htmlFor="clinicStart">Clinic Start Time:</label>
                    <select
                        id="clinicStart"
                        name="clinic.clinicTimings.start"
                        value={clinic.clinicTimings.start}
                        onChange={handleClinicTimeChange}
                    >
                        {timeOptions}
                    </select>
                    </div>

                <div>
                    <label htmlFor="clinicEnd">Clinic End Time:</label>
                    <select
                        id="clinicEnd"
                        name="clinic.clinicTimings.end"
                        value={clinic.clinicTimings.end}
                        onChange={handleClinicTimeChange}
                    >
                        {timeOptions}
                    </select>
                </div>

                





                {/* Start Video Consultation */}



                <div className="form-group">
                <label htmlFor="clinicDays">Video Consultation Days:</label>
                {videoConsult.videoConsultDays.map((day, index) => (
                    <div key={index} className="input-group">
                    <input
                    required={true}
                        type="text"
                        value={day.day}
                        onChange={(e) => {
                        const updatedDays = [...videoConsult.videoConsultDays];
                        updatedDays[index].day = e.target.value;
                        setClinic((prevVideoConsult) => ({
                            ...prevVideoConsult,
                            videoConsultDays: updatedDays
                        }));
                        }}
                        className="form-input"
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveVideoConsultDay(index)}
                        className="remove-button"
                    >
                        Remove
                    </button>
                    </div>
                ))}
                </div>



                <div>
                    <label htmlFor="videoConsultStart">Video Consult Start Time:</label>
                    <select
                        id="videoConsultStart"
                        name="videoConsult.videoConsultTimings.start"
                        value={videoConsult.videoConsultTimings.start} // Update value to videoConsult.videoConsultTimings.start
                        onChange={handleVideoConsultChange}
                    >
                        {/* <option value="">Select Start Time</option> */}
                        {timeOptions}
                    </select>
                    </div>
                    <div>
                    <label htmlFor="videoConsultEnd">Video Consult End Time:</label>
                    <select
                        id="videoConsultEnd"
                        name="videoConsult.videoConsultTimings.end"
                        value={videoConsult.videoConsultTimings.end} // Update value to videoConsult.videoConsultTimings.end
                        onChange={handleVideoConsultChange}
                    >
                        {/* <option value="">Select End Time</option> */}
                        {timeOptions}
                    </select>
                </div>



                {/* End Video Consultation */}






                        {/* Add Hospital Data */}
                        <div>
                            <label htmlFor="hospitalName">Hospital Name:</label>
                            <input
                            required={true}
                                type="text"
                                id="hospitalName"
                                name="hospitalName"
                                value={hospital.hospitalName}
                                onChange={handleHospitalChange}
                            />
                            </div>
                            <div>
                            <label htmlFor="hospitalAddress">Hospital Address:</label>
                            <input
                            required={true}
                                type="text"
                                id="hospitalAddress"
                                name="hospitalAddress"
                                value={hospital.hospitalAddress}
                                onChange={handleHospitalChange}
                            />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hospitalDays">Hospital Days:</label>
                                {hospital.hospitalDays.map((day, index) => (
                                <div key={index} className="input-group">
                                    <input
                                    required={true}
                                    type="text"
                                    value={day.day}
                                    onChange={(e) => {
                                        const updatedDays = [...hospital.hospitalDays];
                                        updatedDays[index].day = e.target.value;
                                        setHospital((prevHospital) => ({
                                        ...prevHospital,
                                        hospitalDays: updatedDays
                                        }));
                                    }}
                                    className="form-input"
                                    />
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveHospitalDay(index)}
                                    className="remove-button"
                                    >
                                    Remove
                                    </button>
                                </div>
                                ))}
                            </div>
            <button type="submit">Create</button>
        </form>
        </div>
    )
}

export default AddDoctor