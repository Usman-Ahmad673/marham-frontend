import axios from 'axios'

import { 
    ALL_SURGEONAPPOINTMENT_REQUEST, 
    ALL_SURGEONAPPOINTMENT_SUCCESS, 
    ALL_SURGEONAPPOINTMENT_FAIL,
    NEW_SURGEONAPPOINTMENT_REQUEST,
    NEW_SURGEONAPPOINTMENT_SUCCESS,
    NEW_SURGEONAPPOINTMENT_FAIL,
    NEW_SURGEONAPPOINTMENT_RESET,
    CLEAR_ERRORS,
} from '../../constants/Admin/surgeonAppointmentConstant'

// Get All Doctors

export const getSurgeonAppointments = () => async(dispatch) =>{
        try{
            dispatch({
                type : ALL_SURGEONAPPOINTMENT_REQUEST
            })
            let link = `http://127.0.0.1:4000/api/v1/surgeonAppointments`;
    
            const {data} = await axios.get(link)
            console.log('Data about certain Surgeon');
            console.log(data);
            dispatch({
                type : ALL_SURGEONAPPOINTMENT_SUCCESS,
                payload : data
            })
        } catch(error){
            dispatch({
                type : ALL_SURGEONAPPOINTMENT_FAIL,
                payload: error.response.data.message
            })
        }
    }

    // Add Doctor Appointment

export const addSurgeonAppointment = (appontmentData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_SURGEONAPPOINTMENT_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        console.log(appontmentData);

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/surgeonAppointment/new`, appontmentData, config);
        console.log(data);


    
        dispatch({
            type : NEW_SURGEONAPPOINTMENT_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : NEW_SURGEONAPPOINTMENT_FAIL,
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