import axios from 'axios'

import { 
    ALL_DOCTORAPPOINTMENT_REQUEST, 
    ALL_DOCTORAPPOINTMENT_SUCCESS, 
    ALL_DOCTORAPPOINTMENT_FAIL,
    NEW_DOCTORAPPOINTMENT_REQUEST,
    NEW_DOCTORAPPOINTMENT_SUCCESS,
    NEW_DOCTORAPPOINTMENT_FAIL,
    NEW_DOCTORAPPOINTMENT_RESET,
    CLEAR_ERRORS,
} from '../../constants/Admin/doctorAppointmentConstant'

// Get All Doctors

export const getDoctorAppointments = () => async(dispatch) =>{
        try{
            dispatch({
                type : ALL_DOCTORAPPOINTMENT_REQUEST
            })
            let link = `http://127.0.0.1:4000/api/v1/doctorAppointments`;
    
            const {data} = await axios.get(link)
            console.log('Data about certain product');
            console.log(data);
            dispatch({
                type : ALL_DOCTORAPPOINTMENT_SUCCESS,
                payload : data
            })
        } catch(error){
            dispatch({
                type : ALL_DOCTORAPPOINTMENT_FAIL,
                payload: error.response.data.message
            })
        }
    }

    // Add Doctor Appointment

export const addDoctorAppointment = (appontmentData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_DOCTORAPPOINTMENT_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/doctorAppointment/new`, appontmentData, config);
        console.log(data);


    
        dispatch({
            type : NEW_DOCTORAPPOINTMENT_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : NEW_DOCTORAPPOINTMENT_FAIL,
            payload: error.response.data.message,
        });
        }
    };



//Clearing Errors
export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS
    })
}