import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteDoctorReducer, doctorDetailsReducer, doctorDetailsReducerById, doctorReducer, doctorSearchReducer, newDoctorReducer } from "./reducers/doctorReducer";
import { deleteHospitalReducer, hospitalDetailsByIdReducer, hospitalDetailsReducer, hospitalReducer, newHospitalReducer } from "./reducers/hospitalReducer";
import { diseaseDetailsReducer, diseaseReducer, newDiseaseReducer } from "./reducers/diseaseReducer";
import { newSymptomReducer, symptomDetailsReducer, symptomReducer } from "./reducers/symptomReducer";
import { newPostReducer, postReducer } from "./reducers/postReducer";
import { doctorAppointmentsReducer, newDoctorAppointmentReducer,  } from "./reducers/Admin/doctorAppointmentReducer";
import { LabDetailsReducer, LabReducer, newLabReducer } from "./reducers/labReducer";
import { deleteProductReducer, newProductReducer, productDetailsReducer, productReducer } from "./reducers/Admin/productReducers";
import { newSurgeonAppointmentReducer, surgeonAppointmentsReducer } from "./reducers/Admin/surgeonAppointmentReducer";
import { allOrdersReducer, newOrderReducer } from "./reducers/Admin/orderReducers";
import { userReducer , userDetailsReducer, userRegisterReducer } from "./reducers/userReducer";


const reducer = combineReducers({
    user: userReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    products: productReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    delProduct: deleteProductReducer,
    labs: LabReducer,
    labDetails: LabDetailsReducer,
    newLab: newLabReducer,
    doctors: doctorReducer,
    doctorDetails: doctorDetailsReducer,
    doctorDetailsById: doctorDetailsReducerById,
    newDoctor: newDoctorReducer,
    delDoctor: deleteDoctorReducer,
    doctorSearch: doctorSearchReducer,
    hospitals: hospitalReducer,
    hospitalDetails: hospitalDetailsReducer,
    hospitalDetailsById: hospitalDetailsByIdReducer,
    newHospital: newHospitalReducer,
    delhospital: deleteHospitalReducer,
    diseases: diseaseReducer,
    diseaseDetails: diseaseDetailsReducer,
    newDisease: newDiseaseReducer,
    symptoms: symptomReducer,
    symptomDetails: symptomDetailsReducer,
    newSymptom: newSymptomReducer,
    posts: postReducer,
    newPost: newPostReducer,
    doctorAppointments: doctorAppointmentsReducer,
    newDoctorAppointment: newDoctorAppointmentReducer,
    newSurgeonAppointment: newSurgeonAppointmentReducer,
    surgeonAppointment:surgeonAppointmentsReducer,
    allOrders: allOrdersReducer,
    newOrder: newOrderReducer,
});


let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


store.subscribe(() => console.log(store.getState()));

export default store;
