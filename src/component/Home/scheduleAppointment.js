import React, { useEffect, useState } from 'react'
import './scheduleAppointment.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearErrors, addDoctorAppointment } from '../../actions/Admin/doctorAppointmentAction'
import { NEW_DOCTORAPPOINTMENT_RESET } from '../../constants/Admin/doctorAppointmentConstant';


const ScheduleAppointment = ({ data }) => {
    const dispatch = useDispatch();
    
    const navigate = useNavigate();




    


    const { loading, error, success } = useSelector((state) => state.newDoctorAppointment);



    
    const [name , setName] = useState('')
    
    
    
    const [phone , setPhone] = useState('')
    
    
    
    const [vtime , setVtime] = useState('')


    const [vdate , setVdate] = useState('')

    
    
    
    const [ctime , setCtime] = useState('')
    
    
    
    const [cdate , setCdate] = useState('')


        const [videoData , setVideoData] = useState(true)

        const [clinicData , setClinicData] = useState(false)





    
            const videoTimings = data.videoConsult?.timings
            ? {
                start: data.videoConsult.timings.start || '',
                end: data.videoConsult.timings.end || ''
            }
            : { start: '', end: '' };
        
        const clinicTimings = data.clinic?.clinic_timings
            ? {
                start: data.clinic.clinic_timings.start || '',
                end: data.clinic.clinic_timings.end || ''
            }
            : { start: '', end: '' };
        

        function generateTimeSlots(start, end, interval) {
            const timeSlots = [];
        
            const startTime = new Date();
            const [startHours, startMinutes, startPeriod] = start.split(/:| /);
            let adjustedStartHours = parseInt(startHours, 10);
        
            if (startPeriod === 'PM' && adjustedStartHours !== 12) {
            adjustedStartHours += 12;
            } else if (startPeriod === 'AM' && adjustedStartHours === 12) {
            adjustedStartHours = 0;
            }
        
            startTime.setHours(adjustedStartHours);
            startTime.setMinutes(parseInt(startMinutes, 10));
        
            const endTime = new Date();
            const [endHours, endMinutes, endPeriod] = end.split(/:| /);
            let adjustedEndHours = parseInt(endHours, 10);
        
            if (endPeriod === 'PM' && adjustedEndHours !== 12) {
            adjustedEndHours += 12;
            } else if (endPeriod === 'AM' && adjustedEndHours === 12) {
            adjustedEndHours = 0;
            }
        
            endTime.setHours(adjustedEndHours);
            endTime.setMinutes(parseInt(endMinutes, 10));
        
            let currentTime = new Date(startTime);
        
            while (currentTime <= endTime) {
            const timeSlot = currentTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit'
            });
        
            timeSlots.push(timeSlot);
        
            currentTime.setMinutes(currentTime.getMinutes() + interval);
            }
        
            return timeSlots;
        }
        
    
        

        const vc = generateTimeSlots(videoTimings.start, videoTimings.end, 15);
        const ct = generateTimeSlots(clinicTimings.start, clinicTimings.end, 15);

//         const timeSlots = [];
        
//         const startTime = new Date();
//         const [startHours, startMinutes, startPeriod] = timings.start.split(/:| /);
//         let adjustedStartHours = parseInt(startHours, 10);

//         if (startPeriod === 'PM' && adjustedStartHours !== 12) {
//             adjustedStartHours += 12;
//         } else if (startPeriod === 'AM' && adjustedStartHours === 12) {
//             adjustedStartHours = 0;
// }

// startTime.setHours(adjustedStartHours);
// startTime.setMinutes(parseInt(startMinutes, 10));

// const endTime = new Date();
// const [endHours, endMinutes, endPeriod] = timings.end.split(/:| /);
// let adjustedEndHours = parseInt(endHours, 10);

// if (endPeriod === 'PM' && adjustedEndHours !== 12) {
// adjustedEndHours += 12;
// } else if (endPeriod === 'AM' && adjustedEndHours === 12) {
// adjustedEndHours = 0;
// }

// endTime.setHours(adjustedEndHours);
// endTime.setMinutes(parseInt(endMinutes, 10));

//         const interval = 15; // Gap in minutes
        
//         let currentTime = new Date(startTime);
        
//         while (currentTime <= endTime) {
//             const timeSlot = currentTime.toLocaleTimeString("en-US", {
//             hour: "numeric",
//             minute: "2-digit"
//             });
        
//             timeSlots.push(timeSlot);
        
//             currentTime.setMinutes(currentTime.getMinutes() + interval);
//         }



    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const nextTwoWeeks = [];

    for (let i = 0; i < 14; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        const dayOfWeek = daysOfWeek[date.getDay()];

        nextTwoWeeks.push({ date, dayOfWeek });
    }

    const handleVideoBtn = () => {
        setVideoData(true);
        setClinicData(false);
    };

    const handleClinicBtn = () => {
        setVideoData(false);
        setClinicData(true);
    };



    //For Form Data

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };


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
            dispatch({ type: NEW_DOCTORAPPOINTMENT_RESET });
        }
        }, [dispatch, error, success]);

    const handleSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();
        
        myForm.set("name", name);
        myForm.set("phone", phone);
        myForm.set("ctime", ctime);        
        myForm.set("cdate", cdate);
        myForm.set("vtime", vtime);
        myForm.set("vdate", vdate);
        myForm.set("doctorLocation", data.city);
        myForm.set("doctorName", data.name);
        myForm.set("doctorContact", data.contact);
        myForm.set("doctorAccountNumber", data.accountNumber);
        console.log(name);
        console.log(phone);
        console.log(ctime);
        console.log(cdate);
        console.log(vtime);
        console.log(vdate);
        console.log(data.city);
        console.log(data.name);
        console.log(data._id);
        if(cdate !== ''){
            sessionStorage.setItem("fee", JSON.stringify(data.clinic.clinic_fee));
            sessionStorage.setItem("name", JSON.stringify(name));
            sessionStorage.setItem("contact", JSON.stringify(phone));
            
            console.log(JSON.parse(sessionStorage.getItem('name')));
            console.log(JSON.parse(sessionStorage.getItem('contact')));
            console.log(JSON.parse(sessionStorage.getItem('fee')));
        }
        else if(vdate !== ''){
            sessionStorage.setItem("fee", JSON.stringify(data.fee));
            sessionStorage.setItem("name", JSON.stringify(name));
            
            console.log(JSON.parse(sessionStorage.getItem('name')));
            console.log(JSON.parse(sessionStorage.getItem('fee')));
        }
        
        navigate("/process/payment");
        
        dispatch(addDoctorAppointment(myForm));
    };


    return (
        <React.Fragment>
        <h4 className='heading'>Schedule an Appointment</h4>
            <div className="buttons">
                <button value='video' onClick={() => handleVideoBtn()}>Video Consult</button>
                {data.clinic && <button value='clinic' onClick={() => handleClinicBtn()}>Clinic {data.clinic.clinic_name}</button>}
            </div>

            {videoData === true && clinicData === false ? (
                <div className="date">
                    <div className="heading">
                        <h4>Select Date</h4>
                    </div>
                    <div className="days">

                    {nextTwoWeeks.map((week, index) => (
                        <button onClick={() => setVdate(week.date.getDate())} className='btn' key={index}>
                            {week.date.getDate()} {week.date.toLocaleString('default', { month: 'long' })} - {week.dayOfWeek}
                        </button>
                    ))}
                    
                    {/* {nextTwoWeeks.map((week, index) => (
                        <button onClick={setVdate(week.date.getDate())} className='btn' key={index}>{week.date.getDate()} {week.date.toLocaleString('default', { month: 'long' })} - {week.dayOfWeek}</button>
                    ))} */}
                    
                    </div>
                    
                    <div className="heading">
                        <h4>Select Time Slot</h4>
                    </div>
                    <div className="time">
                

                    {vc.map((timeSlot, index) => (
                        <button onClick={() => setVtime(timeSlot)} className='btn' key={index}>{timeSlot}</button>
                    ))}
                
                    
                    </div>
                </div>
            ): (
                <div className="date">
                    <div className="heading">
                        <h4>Select Date</h4>
                    </div>
                    <div className="days">
                    
                    {nextTwoWeeks.map((week, index) => (
                        <button onClick={() => setCdate(week.date.getDate())} className='btn' key={index}>{week.date.getDate()} {week.date.toLocaleString('default', { month: 'long' })} - {week.dayOfWeek}</button>
                    ))}
                    
                    </div>
                    
                    <div className="heading">
                        <h4>Select Time Slot</h4>
                    </div>
                    <div className="time">
                

                    {ct.map((timeSlot, index) => (
                        <button onClick={() => setCtime(timeSlot)} className='btn' key={index}>{timeSlot}</button>
                    ))}
                
                    
                    </div>
                </div>
            )}

            {/* <div className="form"> */}
                <form className='form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Patient Name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Add Patient name'
                    required = {true}
                    />
                </div>
                <div>
                    <label htmlFor="phone">Patient Number:</label>
                    <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder='03xx-xxxxxxx'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required = {true}
                    />
                </div>
                
                <button type="submit">Book Appointment</button>
            </form>
            {/* </div> */}

        </React.Fragment>
    )
}

export default ScheduleAppointment