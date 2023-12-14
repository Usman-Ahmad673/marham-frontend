import axios from 'axios'

import { 
    ALL_LAB_REQUEST, 
    ALL_LAB_SUCCESS, 
    ALL_LAB_FAIL,
    LAB_DETAILS_REQUEST, 
    LAB_DETAILS_SUCCESS, 
    LAB_DETAILS_FAIL,
    NEW_LAB_REQUEST,
    NEW_LAB_SUCCESS,
    NEW_LAB_FAIL,
    NEW_LAB_RESET,
    DELETE_LAB_REQUEST,
    DELETE_LAB_SUCCESS,
    DELETE_LAB_FAIL,
    DELETE_LAB_RESET,
    UPDATE_LAB_REQUEST,
    UPDATE_LAB_SUCCESS,
    UPDATE_LAB_FAIL,
    UPDATE_LAB_RESET, 
    LAB_SEARCH_REQUEST,
    LAB_SEARCH_SUCCESS,
    LAB_SEARCH_FAIL,
    CLEAR_ERRORS,
} from '../constants/labConstant'

// Get All LABs

export const getLab = () => async(dispatch) =>{
        try{
            dispatch({
                type : ALL_LAB_REQUEST
            })
            let link = `http://127.0.0.1:4000/api/v1/lab`;
    
            const {data} = await axios.get(link)
            console.log(data);
            console.log(data);
            dispatch({
                type : ALL_LAB_SUCCESS,
                payload : data
            })
        } catch(error){
            dispatch({
                type : ALL_LAB_FAIL,
                payload: error.response.data.message
            })
        }
    }

    export const searchLab = (city, name) => async (dispatch) => {
        try {
            dispatch({ type: LAB_SEARCH_REQUEST });
        
            const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/lab/search?city=${city}&name=${name}`);
        
            dispatch({
            type: LAB_SEARCH_SUCCESS,
            payload: data.LABs,
            });
        } catch (error) {
            dispatch({
            type: LAB_SEARCH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            });
        }
    };

    // Get LAB Details
export const getLabDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type : LAB_DETAILS_REQUEST });
    
        const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/lab/${id}`);
        console.log(data);
    
        dispatch({
            type : LAB_DETAILS_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : LAB_DETAILS_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    // Add LAB
export const addLab = (LABData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_LAB_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }
        
        console.log(LABData);

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/lab/new`, LABData, config);
        console.log(data);


    
        dispatch({
            type : NEW_LAB_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : NEW_LAB_FAIL,
            payload: error.response.data.message,
        });
        }
    };


    // Delete LAB
export const deleteLab = (id) => async (dispatch) => {
    try {
        dispatch({ type : DELETE_LAB_REQUEST });
    

        const { data } = await axios.delete(`http://127.0.0.1:4000/api/v1/lab/${id}`);
        console.log(data);


    
        dispatch({
            type : DELETE_LAB_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : DELETE_LAB_FAIL,
            payload: error.response.data.message,
        });
        }
    };

    
// Update Product
export const updateLab = (id , updatedLABData) => async (dispatch) => {
    try {
        dispatch({ type : UPDATE_LAB_REQUEST });
        
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.put(`http://127.0.0.1:4000/api/v1/lab/${id}`, updatedLABData, config);
        console.log(data);


    
        dispatch({
            type : UPDATE_LAB_SUCCESS,
            payload: data.success
        });
        } catch (error) {
        dispatch({
            type : UPDATE_LAB_FAIL,
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