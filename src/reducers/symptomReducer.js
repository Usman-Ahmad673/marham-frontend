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


export const symptomReducer = (state = { symptoms: [] }, action) => {
        switch (action.type) {
        case ALL_SYMPTOM_REQUEST:
            return {
            loading: true,
            symptoms: [], // Initialize the symptoms array
            };
        case ALL_SYMPTOM_SUCCESS:
            return {
            loading: false,
            symptoms: action.payload.symptoms, // Update with the fetched symptoms directly
            };
        case ALL_SYMPTOM_FAIL:
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


export const newSymptomReducer = (state = {symptom:{}}, action) => {
    switch (action.type) {
        case NEW_SYMPTOM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_SYMPTOM_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            symptom:action.payload.symptom
            };
        case NEW_SYMPTOM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_SYMPTOM_RESET:
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

    
export const symptomDetailsReducer = (state = { symptomDetails: [] }, action) => {
    switch (action.type) {
        case SYMPTOM_DETAILS_REQUEST:
            return {
            loading: true,
            ...state,
            };
        case SYMPTOM_DETAILS_SUCCESS:
            return {
            loading: false,
            symptom: action.payload.symptom,
            };
        case SYMPTOM_DETAILS_FAIL:
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
