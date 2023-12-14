import { 
    ALL_SURGEONAPPOINTMENT_REQUEST, 
    ALL_SURGEONAPPOINTMENT_SUCCESS, 
    ALL_SURGEONAPPOINTMENT_FAIL,
    NEW_SURGEONAPPOINTMENT_REQUEST,
    NEW_SURGEONAPPOINTMENT_SUCCESS,
    NEW_SURGEONAPPOINTMENT_FAIL,
    NEW_SURGEONAPPOINTMENT_RESET,
    CLEAR_ERRORS,
} from '../../constants/Admin/surgeonAppointmentConstant'


export const surgeonAppointmentsReducer = (state = { surgeonAppointments:[] } , action) => {


    switch (action.type) {
        case ALL_SURGEONAPPOINTMENT_REQUEST:
            return{
                loading:true,
                surgeonAppointments: []
            }
        case ALL_SURGEONAPPOINTMENT_SUCCESS:
            return{
                loading:false,
                surgeonAppointments: action.payload.surgeonAppointments,
                surgeonAppointmentCount: action.payload.surgeonAppointmentCount,
            }
            

        case ALL_SURGEONAPPOINTMENT_FAIL:
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




export const newSurgeonAppointmentReducer = (state = {surgeonAppointment:{}}, action) => {
    switch (action.type) {
        case NEW_SURGEONAPPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_SURGEONAPPOINTMENT_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            surgeonAppointment:action.payload.surgeonAppointment
            };
        case NEW_SURGEONAPPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_SURGEONAPPOINTMENT_RESET:
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