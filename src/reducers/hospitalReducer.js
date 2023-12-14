import { 
    ALL_HOSPITAL_REQUEST, 
    ALL_HOSPITAL_SUCCESS, 
    ALL_HOSPITAL_FAIL,
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
    HOSPITAL_BYID_REQUEST,
    HOSPITAL_BYID_SUCCESS,
    HOSPITAL_BYID_FAIL,
    CLEAR_ERRORS,
} from '../constants/hospitalConstant'


export const hospitalReducer = (state = { hospitals:[] } , action) => {


    switch (action.type) {
        case ALL_HOSPITAL_REQUEST:
            return{
                loading:true,
                hospitals: []
            }
        break
        case ALL_HOSPITAL_SUCCESS:
            return{
                loading:false,
                hospitals: action.payload.hospitals,
                hospitalCount: action.payload.hospitalCount,
            }
            

        case ALL_HOSPITAL_FAIL:
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

export const newHospitalReducer = (state = {hospital:{}}, action) => {
    switch (action.type) {
        case NEW_HOSPITAL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_HOSPITAL_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            hospital:action.payload.hospital
            };
        case NEW_HOSPITAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_HOSPITAL_RESET:
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

    
export const hospitalDetailsReducer = (state = { hospitalDetails: [] }, action) => {
    switch (action.type) {
        case HOSPITAL_DETAILS_REQUEST:
            return {
            loading: true,
            ...state,
            };
        case HOSPITAL_DETAILS_SUCCESS:
            return {
            loading: false,
            hospital: action.payload.hospital,
            total: action.payload.total
            };
        case HOSPITAL_DETAILS_FAIL:
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
export const hospitalDetailsByIdReducer = (state = { hospitalDetails: [] }, action) => {
    switch (action.type) {
        case HOSPITAL_BYID_REQUEST:
            return {
            loading: true,
            ...state,
            };
        case HOSPITAL_BYID_SUCCESS:
            return {
            loading: false,
            hospital: action.payload.hospital,
            total: action.payload.total
            };
        case HOSPITAL_BYID_FAIL:
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

    export const deleteHospitalReducer = (state = {}, action) => {
        switch (action.type) {
            case DELETE_HOSPITAL_REQUEST:
            case UPDATE_HOSPITAL_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            case DELETE_HOSPITAL_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload,
                };
            case UPDATE_HOSPITAL_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload,
                };
            case DELETE_HOSPITAL_FAIL:
            case UPDATE_HOSPITAL_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            case DELETE_HOSPITAL_RESET:
                return {
                    ...state,
                    isDeleted: false,
                };
                case UPDATE_HOSPITAL_RESET:
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