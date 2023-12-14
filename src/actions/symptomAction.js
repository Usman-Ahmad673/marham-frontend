import axios from 'axios'

import { 
    ALL_SYMPTOM_REQUEST, 
    ALL_SYMPTOM_SUCCESS, 
    ALL_SYMPTOM_FAIL,
    SYMPTOM_DETAILS_REQUEST, 
    SYMPTOM_DETAILS_SUCCESS, 
    SYMPTOM_DETAILS_FAIL,
    NEW_SYMPTOM_REQUEST,
    NEW_SYMPTOM_SUCCESS,
    NEW_SYMPTOM_FAIL,
    NEW_SYMPTOM_RESET,
    CLEAR_ERRORS,
} from '../constants/symptomConstant'

// Get All Doctors

export const getSymptoms = () => async(dispatch) =>{
        try{
            dispatch({
                type : ALL_SYMPTOM_REQUEST
            })
            let link = `http://127.0.0.1:4000/api/v1/symptoms`;
    
            const {data} = await axios.get(link)
            console.log('Data about certain symptom');
            console.log(data);
            dispatch({
                type : ALL_SYMPTOM_SUCCESS,
                payload : data
            })
        } catch(error){
            dispatch({
                type : ALL_SYMPTOM_FAIL,
                payload: error.response.data.message
            })
        }
    }


    // Get Doctor Details
export const getSingleSymptom = (id) => async (dispatch) => {
    try {
        dispatch({ type : SYMPTOM_DETAILS_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/symptom/${id}`);
        console.log(data);
    
        dispatch({
            type : SYMPTOM_DETAILS_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : SYMPTOM_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    // Add Doctor
export const createSymptom = (symptomData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_SYMPTOM_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/symptom/new`, symptomData, config);
        console.log(data);


    
        dispatch({
            type : NEW_SYMPTOM_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : NEW_SYMPTOM_FAIL,
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