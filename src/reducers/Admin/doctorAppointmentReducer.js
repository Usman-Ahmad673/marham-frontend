import { 
    ALL_DOCTORAPPOINTMENT_REQUEST, 
    ALL_DOCTORAPPOINTMENT_SUCCESS, 
    ALL_DOCTORAPPOINTMENT_FAIL,
    NEW_DOCTORAPPOINTMENT_REQUEST,
    NEW_DOCTORAPPOINTMENT_SUCCESS,
    NEW_DOCTORAPPOINTMENT_FAIL,
    NEW_DOCTORAPPOINTMENT_RESET,
    CLEAR_ERRORS,
} from '../../constants/Admin/doctorAppointmentConstant'


export const doctorAppointmentsReducer = (state = { doctorAppointments:[] } , action) => {


    switch (action.type) {
        case ALL_DOCTORAPPOINTMENT_REQUEST:
            return{
                loading:true,
                doctorAppointments: []
            }
        case ALL_DOCTORAPPOINTMENT_SUCCESS:
            return{
                loading:false,
                doctorAppointments: action.payload.doctorAppointments,
                doctorAppointmentCount: action.payload.doctorAppointmentCount,
            }
            

        case ALL_DOCTORAPPOINTMENT_FAIL:
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




export const newDoctorAppointmentReducer = (state = {doctorAppointment:{}}, action) => {
    switch (action.type) {
        case NEW_DOCTORAPPOINTMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_DOCTORAPPOINTMENT_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            doctorAppointment:action.payload.doctorAppointment
            };
        case NEW_DOCTORAPPOINTMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_DOCTORAPPOINTMENT_RESET:
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