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


export const LabReducer = (state = { Labs:[] } , action) => {


    switch (action.type) {
        case ALL_LAB_REQUEST:
            return{
                loading:true,
                labs: []
            }
        case ALL_LAB_SUCCESS:
            return{
                loading:false,
                labs: action.payload.labs,
                total: action.payload.total,
            }
            

        case ALL_LAB_FAIL:
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




export const LabSearchReducer = (state = { labs: [] }, action) => {
    switch (action.type) {
        case LAB_SEARCH_REQUEST:
            return { loading: true, labs: [] };
        case LAB_SEARCH_SUCCESS:
            return { loading: false, labs: action.payload };
        case LAB_SEARCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};




export const newLabReducer = (state = {lab:{}}, action) => {
    switch (action.type) {
        case NEW_LAB_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_LAB_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            lab:action.payload.lab
            };
        case NEW_LAB_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_LAB_RESET:
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

    
export const LabDetailsReducer = (state = { LabDetails: [] }, action) => {
    switch (action.type) {
        case LAB_DETAILS_REQUEST:
            return {
            loading: true,
            ...state,
            };
        case LAB_DETAILS_SUCCESS:
            return {
            loading: false,
            lab: action.payload.lab,
            total: action.payload.total
            };
        case LAB_DETAILS_FAIL:
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

    export const deleteLabReducer = (state = {}, action) => {
        switch (action.type) {
            case DELETE_LAB_REQUEST:
            case UPDATE_LAB_REQUEST:
                return {
                    ...state,
                    loading: true,
                };
            case DELETE_LAB_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isDeleted: action.payload,
                };
            case UPDATE_LAB_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload,
                };
            case DELETE_LAB_FAIL:
            case UPDATE_LAB_FAIL:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            case DELETE_LAB_RESET:
                return {
                    ...state,
                    isDeleted: false,
                };
                case UPDATE_LAB_RESET:
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