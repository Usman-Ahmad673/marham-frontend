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




export const postReducer = (state = { posts:[] } , action) => {


    switch (action.type) {
        case ALL_POST_REQUEST:
            return{
                loading:true,
                posts: []
            }
        case ALL_POST_SUCCESS:
            return{
                loading:false,
                posts: action.payload.posts,
                postCount: action.payload.postCount,
            }
            

        case ALL_POST_FAIL:
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

export const newPostReducer = (state = {post:{}}, action) => {
    switch (action.type) {
        case NEW_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_POST_SUCCESS:
            return {
            loading: false,
            success: action.payload.success,
            post:action.payload.post
            };
        case NEW_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_POST_RESET:
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
