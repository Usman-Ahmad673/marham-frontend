import axios from 'axios'

import { 
    ALL_DOCTOR_REQUEST, 
    ALL_DOCTOR_SUCCESS, 
    ALL_DOCTOR_FAIL,
    DOCTOR_DETAILS_REQUEST, 
    DOCTOR_DETAILS_SUCCESS, 
    DOCTOR_DETAILS_FAIL,
    NEW_DOCTOR_REQUEST,
    NEW_DOCTOR_SUCCESS,
    DOCTOR_BYID_REQUEST,
    DOCTOR_BYID_SUCCESS,
    DOCTOR_BYID_FAIL,
    NEW_DOCTOR_FAIL,
    NEW_DOCTOR_RESET,
    DELETE_DOCTOR_REQUEST,
    DELETE_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAIL,
    DELETE_DOCTOR_RESET,
    UPDATE_DOCTOR_REQUEST,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAIL,
    UPDATE_DOCTOR_RESET, 
    DOCTOR_SEARCH_REQUEST,
    DOCTOR_SEARCH_SUCCESS,
    DOCTOR_SEARCH_FAIL,
    CLEAR_ERRORS,
} from '../constants/doctorConstant'

// Get All Doctors

export const getDoctor = () => async(dispatch) =>{
        try{
            dispatch({
                type : ALL_DOCTOR_REQUEST
            })
            let link = `http://127.0.0.1:4000/api/v1/doctors`;
    
            const {data} = await axios.get(link)
            console.log(data);
            console.log(data);
            dispatch({
                type : ALL_DOCTOR_SUCCESS,
                payload : data
            })
        } catch(error){
            dispatch({
                type : ALL_DOCTOR_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const searchDoctor = (city, name) => async (dispatch) => {
        try {
            dispatch({ type: DOCTOR_SEARCH_REQUEST });
        
            const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/doctors/search?city=${city}&name=${name}`);
        
            dispatch({
            type: DOCTOR_SEARCH_SUCCESS,
            payload: data.doctors,
            });
        } catch (error) {
            dispatch({
            type: DOCTOR_SEARCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    // Get Doctor Details
export const getDoctorDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type : DOCTOR_DETAILS_REQUEST });
        console.log(`id1111`);
        const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/doctor/${id}`);
        console.log(data);
        
        console.log(`id543453564`);
        dispatch({
            type : DOCTOR_DETAILS_SUCCESS,
            payload: data
        });
        console.log(`id`);
    } catch (error) {
            console.log(`id32434`);
        dispatch({
            type : DOCTOR_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        }
    };



    // Get Doctor Details By Id
export const getDoctorDetailsById = (id) => async (dispatch) => {
    try {
        console.log(`id1`);
        dispatch({ type : DOCTOR_BYID_REQUEST });
        const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/doctor/id/${id}`);
        console.log(data);
        
        console.log(`id2`);
        dispatch({
            type : DOCTOR_BYID_SUCCESS,
            payload: data
        });
        console.log(data);
        console.log(`id3`);
    } catch (error) {
        console.log(`id4`);
        dispatch({
            type : DOCTOR_BYID_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    // Add Doctor
export const addDoctor = (doctorData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_DOCTOR_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/doctor/new`, doctorData, config);
        console.log(data);


    
        dispatch({
            type : NEW_DOCTOR_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : NEW_DOCTOR_FAIL,
            payload: error.response.data.message,
        });
        }
    };


    // Delete Doctor
export const deleteDoctor = (id) => async (dispatch) => {
    try {
        dispatch({ type : DELETE_DOCTOR_REQUEST });
    

        const { data } = await axios.delete(`http://127.0.0.1:4000/api/v1/doctor/${id}`);
        console.log(data);


    
        dispatch({
            type : DELETE_DOCTOR_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : DELETE_DOCTOR_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    
// Update Product
export const updateDoctor = (id , updatedDoctorData) => async (dispatch) => {
    try {
        dispatch({ type : UPDATE_DOCTOR_REQUEST });
        
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.put(`http://127.0.0.1:4000/api/v1/doctor/${id}`, updatedDoctorData, config);
        console.log(data);


    
        dispatch({
            type : UPDATE_DOCTOR_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : UPDATE_DOCTOR_FAIL,
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