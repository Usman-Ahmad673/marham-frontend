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


export const diseaseReducer = (state = { diseases: [] }, action) => {
        switch (action.type) {
        case ALL_DISEASE_REQUEST:
            return {
            loading: true,
            diseases: [], // Initialize the diseases array
            };
        case ALL_DISEASE_SUCCESS:
            return {
            loading: false,
            diseases: action.payload.diseases, // Update with the fetched diseases directly
            };
        case ALL_DISEASE_FAIL:
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


export const newDiseaseReducer = (state = {disease:{}}, action) => {
    switch (action.type) {
        case NEW_DISEASE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_DISEASE_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            disease:action.payload.disease
            };
        case NEW_DISEASE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_DISEASE_RESET:
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

    
export const diseaseDetailsReducer = (state = { diseaseDetails: [] }, action) => {
    switch (action.type) {
        case DISEASE_DETAILS_REQUEST:
            return {
            loading: true,
            ...state,
            };
        case DISEASE_DETAILS_SUCCESS:
            return {
            loading: false,
            disease: action.payload.disease,
            };
        case DISEASE_DETAILS_FAIL:
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
