import { 
    ALL_DOCTOR_REQUEST, 
    ALL_DOCTOR_SUCCESS, 
    ALL_DOCTOR_FAIL,
    DOCTOR_DETAILS_REQUEST, 
    DOCTOR_DETAILS_SUCCESS, 
    DOCTOR_DETAILS_FAIL,
    NEW_DOCTOR_REQUEST,
    NEW_DOCTOR_SUCCESS,
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
    DOCTOR_BYID_REQUEST,
    DOCTOR_BYID_SUCCESS,
    DOCTOR_BYID_FAIL,
} from '../constants/doctorConstant'


export const doctorReducer = (state = { doctors:[] } , action) => {


    switch (action.type) {
        case ALL_DOCTOR_REQUEST:
            return{
                loading:true,
                doctors: []
            }
        case ALL_DOCTOR_SUCCESS:
            return{
                loading:false,
                doctors: action.payload.doctors,
                doctorCount: action.payload.doctorCount,
            }
            

        case ALL_DOCTOR_FAIL:
            return{
                loading:false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            
            return{
                ...state,
                error:null
            }
    
        default:
            return state
    }


}




export const doctorSearchReducer = (state = { doctors: [] }, action) => {
    switch (action.type) {
        case DOCTOR_SEARCH_REQUEST:
            return { loading: true, doctors: [] };
        case DOCTOR_SEARCH_SUCCESS:
            return { loading: false, doctors: action.payload };
        case DOCTOR_SEARCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};




export const newDoctorReducer = (state = {doctor:{}}, action) => {
    switch (action.type) {
        case NEW_DOCTOR_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_DOCTOR_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            doctor:action.payload.doctor
            };
        case NEW_DOCTOR_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_DOCTOR_RESET:
            return {
                ...state,
                success: false,
            };
    
        case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
            };
        default:
            return state;
        }
    };

    
export const doctorDetailsReducer = (state = { doctorDetails: [] }, action) => {
    switch (action.type) {
        case DOCTOR_DETAILS_REQUEST:
            return {
            loading: true,
            ...state,
            };
        case DOCTOR_DETAILS_SUCCESS:
            return {
                loading: false,
                doctor: action.payload.doctor,
                total: action.payload.total
            };
        case DOCTOR_DETAILS_FAIL:
            return {
            loading: false,
            error: action.payload,
            };
    
        case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
            };
        default:
            return state;
        }
    };


export const doctorDetailsReducerById = (state = { doctorDetail: [] }, action) => {
    switch (action.type) {
        case DOCTOR_BYID_REQUEST:
            return {
            loading: true,
            ...state,
            };
        
            case DOCTOR_BYID_SUCCESS:
            return {
                loading: false,
                doctor: action.payload.doctor,
                total: action.payload.total
            };
        
        case DOCTOR_BYID_FAIL:
            return {
            loading: false,
            error: action.payload,
            };
    
        case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
            };
        default:
            return state;
        }
    };

    export const deleteDoctorReducer = (state = {}, action) => {
        switch (action.type) {
            case DELETE_DOCTOR_REQUEST:
            case UPDATE_DOCTOR_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            case DELETE_DOCTOR_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload,
                };
            case UPDATE_DOCTOR_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload,
                };
            case DELETE_DOCTOR_FAIL:
            case UPDATE_DOCTOR_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            case DELETE_DOCTOR_RESET:
                return {
                    ...state,
                    isDeleted: false,
                };
                case UPDATE_DOCTOR_RESET:
                    return {
                        ...state,
                        isUpdated: false,
                    };
                
            case CLEAR_ERRORS:
                return {
                ...state,
                error: null,
                };
            default:
                return state;
            }
        };