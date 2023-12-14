import axios from 'axios'
import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    // LOGOUT_USER_REQUEST,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS, 
    UPDATE_PROFILE_FAIL,
    // UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    // UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    UPDATE_USER_REQUEST,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    ALL_USERS_FAIL,


} from '../constants/userConstants'

//LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
    
        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(
            `http://127.0.0.1:4000/api/v1/user/login`,
            { email, password },
            config
        );

        console.log(data);

        localStorage.setItem('token' , data.token)
        localStorage.setItem('id' , data.user._id)
    
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        }
    };


//REGISTER
export const register = (email,password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
    
        const config = { headers: { "Content-Type": "application/json" } };

        // console.log('userData');
        // console.log(userData);
        console.log('email');
        console.log(email);
        console.log('password');
        console.log(password);
    
        const { data } = await axios.post(
            `http://127.0.0.1:4000/api/v1/user/signup`,
            {email , password},
            config
        );

        console.log(data);
    
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.error });
        }
    };

    
    //LOAD USER
    export const loadUser = () => async (dispatch) => {
        try {
            console.log('load user 1');
            dispatch({ type: LOAD_USER_REQUEST });
            console.log('load user 2');

            const config = {
                headers: {"Content-Type":"application/json"}
            }

            const id = localStorage.getItem('id')
                // if(id){
                    const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/user/me`, {params: { id } , config});
                    console.log('load user 3');
                    
                    console.log(data);
                    
                    console.log('load user 4');
                dispatch({ type: LOAD_USER_SUCCESS, payload: data });
                // }
            
        } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
        }
    };



    //LOGOUT USER
    export const logOut = () => async (dispatch) => {
        try {
            
            await axios.get(`http://127.0.0.1:4000/api/v1/user/logout`);
        
            dispatch({ type: LOGOUT_USER_SUCCESS });
        } catch (error) {
            dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
            }
    };

    


    
//     // get  User Details
//     export const getUserDetails = (id) => async (dispatch) => {
//         try {
//         dispatch({ type: USER_DETAILS_REQUEST });
//         const { data } = await axios.get(`http://127.0.0.1:4000/api/v1/admin/user/${id}`);
    
//         dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
//         } catch (error) {
//         dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
//         }
// };



    // Update Profile
    export const updateProfile = (userData) => async (dispatch) => {
        try {
            console.log('userData called');
            dispatch({ type: UPDATE_PROFILE_REQUEST });
            
            console.log('userData called2');
            const config = { headers: { "Content-Type": "application/json" } };
            
            console.log('userData called3');
            console.log(userData);
            console.log('userData called4');
            // Make an API call to update the user's profile
            const { data } = await axios.post(
                `http://127.0.0.1:4000/api/v1/user/orders`,
                userData,
                config
                );
                
                console.log('userData called5');
                // Check if the profile update was successful
        
            // If successful, dispatch the success action
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    
            // Also dispatch the LOAD_USER_SUCCESS action to update the user's details
            dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        } catch (error) {
        // Handle any API call errors
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
        }
    };


//Clearing Errors
export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS
    })
}