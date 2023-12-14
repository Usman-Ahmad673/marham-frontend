import axios from 'axios'

import { 
    ALL_POST_REQUEST, 
    ALL_POST_SUCCESS, 
    ALL_POST_FAIL,
    NEW_POST_REQUEST,
    NEW_POST_SUCCESS,
    NEW_POST_FAIL,
    NEW_POST_RESET,
    CLEAR_ERRORS,
} from '../constants/postConstant'

// Get All Posts

export const getPost = () => async(dispatch) =>{
        try{
            dispatch({
                type : ALL_POST_REQUEST
            })
            let link = `http://127.0.0.1:4000/api/v1/posts`;
    
            const {data} = await axios.get(link)
            console.log('Post data');
            console.log(data);
            dispatch({
                type : ALL_POST_SUCCESS,
                payload : data
            })
        } catch(error){
            dispatch({
                type : ALL_POST_FAIL,
                payload: error.response.data.message
            })
        }
    }

    // Add Post
export const addPost = (postData) => async (dispatch) => {
    try {
        dispatch({ type : NEW_POST_REQUEST });
    
        const config = {
            headers: {"Content-Type":"application/json"}
        }

        const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/post/new`, postData, config);
        console.log(data);


    
        dispatch({
            type : NEW_POST_SUCCESS,
            payload: data
        });
        } catch (error) {
        dispatch({
            type : NEW_POST_FAIL,
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