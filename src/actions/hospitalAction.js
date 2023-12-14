import axios from 'axios'

import { 
    ALL_HOSPITAL_REQUEST, 
    ALL_HOSPITAL_SUCCESS, 
    ALL_HOSPITAL_FAIL,
    HOSPITAL_BYID_REQUEST,
    HOSPITAL_BYID_SUCCESS,
    HOSPITAL_BYID_FAIL,
    HOSPITAL_DETAILS_REQUEST, 
    HOSPITAL_DETAILS_SUCCESS, 
    HOSPITAL_DETAILS_FAIL,
    NEW_HOSPITAL_REQUEST,
    NEW_HOSPITAL_SUCCESS,
    NEW_HOSPITAL_FAIL,
    NEW_HOSPITAL_RESET,
    DELETE_HOSPITAL_REQUEST,
    DELETE_HOSPITAL_SUCCESS,
    DELETE_HOSPITAL_FAIL,
    DELETE_HOSPITAL_RESET,
    UPDATE_HOSPITAL_REQUEST,
    UPDATE_HOSPITAL_SUCCESS,
    UPDATE_HOSPITAL_FAIL,
    UPDATE_HOSPITAL_RESET,
    CLEAR_ERRORS,
} from '../constants/hospitalConstant'

// Get All Doctors

export const getHospital = () => async(dispatch) =>{
        try{
            dispatch({
                type : ALL_HOSPITAL_REQUEST
            })
            let link = `http://127.0.0.1:4000/api/v1/hospital`;
    
            const {data} = await axios.get(link)
            console.log('Data about Hospital');
            console.log(data);
            dispatch({
                type : ALL_HOSPITAL_SUCCESS,
                payload : data
            })
        } catch(error){
            dispatch({
                type : ALL_HOSPITAL_FAIL,
                payload: error.response.data.message
            })
        }
    }


    // Get Doctor Details
export const getHospitalDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type : HOSPITAL_DETAILS_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/hospital/${id}`);
        console.log(data);
    
        dispatch({
            type : HOSPITAL_DETAILS_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : HOSPITAL_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        }
    };

export const getHospitalDetailsById = (id) => async (dispatch) => {
    try {
        dispatch({ type : HOSPITAL_BYID_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:4000/api/v1//hospitalbyid/${id}`);
        console.log(data);
    
        dispatch({
            type : HOSPITAL_BYID_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : HOSPITAL_BYID_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    // Add Doctor
export const addHospital = (doctorData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_HOSPITAL_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/hospital/new`, doctorData, config);
        console.log(data);


    
        dispatch({
            type : NEW_HOSPITAL_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : NEW_HOSPITAL_FAIL,
            payload: error.response.data.message,
        });
        }
    };


    // Delete Doctor
export const deleteHospital = (id) => async (dispatch) => {
    try {
        dispatch({ type : DELETE_HOSPITAL_REQUEST });
    

        const { data } = await axios.delete(`http://127.0.0.1:4000/api/v1/hospital/${id}`);
        console.log(data);


    
        dispatch({
            type : DELETE_HOSPITAL_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : DELETE_HOSPITAL_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    
// Update Product
export const updateHospital = (id , updatedDoctorData) => async (dispatch) => {
    try {
        dispatch({ type : UPDATE_HOSPITAL_REQUEST });
        
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.put(`http://127.0.0.1:4000/api/v1/hospital/${id}`, updatedDoctorData, config);
        console.log(data);


    
        dispatch({
            type : UPDATE_HOSPITAL_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : UPDATE_HOSPITAL_FAIL,
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