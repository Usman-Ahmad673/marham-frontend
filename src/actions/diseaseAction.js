import axios from 'axios'

import { 
    ALL_DISEASE_REQUEST, 
    ALL_DISEASE_SUCCESS, 
    ALL_DISEASE_FAIL,
    DISEASE_DETAILS_REQUEST, 
    DISEASE_DETAILS_SUCCESS, 
    DISEASE_DETAILS_FAIL,
    NEW_DISEASE_REQUEST,
    NEW_DISEASE_SUCCESS,
    NEW_DISEASE_FAIL,
    NEW_DISEASE_RESET,
    CLEAR_ERRORS,
} from '../constants/diseaseConstant'

// Get All Doctors

export const getDiseases = () => async(dispatch) =>{
        try{
            dispatch({
                type : ALL_DISEASE_REQUEST
            })
            let link = `http://127.0.0.1:4000/api/v1/diseases`;
    
            const {data} = await axios.get(link)
            console.log('Data about certain disease');
            console.log(data);
            dispatch({
                type : ALL_DISEASE_SUCCESS,
                payload : data
            })
        } catch(error){
            dispatch({
                type : ALL_DISEASE_FAIL,
                payload: error.response.data.message
            })
        }
    }


    // Get Doctor Details
export const getSingleDisease = (id) => async (dispatch) => {
    try {
        dispatch({ type : DISEASE_DETAILS_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/disease/${id}`);
        console.log(data);
    
        dispatch({
            type : DISEASE_DETAILS_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : DISEASE_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    // Add Doctor
export const createDisease = (doctorData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_DISEASE_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/disease/new`, doctorData, config);
        console.log(data);


    
        dispatch({
            type : NEW_DISEASE_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : NEW_DISEASE_FAIL,
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