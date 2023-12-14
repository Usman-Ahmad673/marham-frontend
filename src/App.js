import './App.css';
import Header from './component/layout/Header/Header'
import Home from './component/Home/Home';
import DoctorDetails from './component/Home/doctorDetails';
import SearchDetails from './component/Home/SearchDetails.js';
import HospitalDetails from './component/Home/hospitalDetails';
import Hospitals from './component/Home/hospitals.js';
import Doctors from './component/Home/doctors.js';
import SymptomDetails from './component/Home/SymptomDetails.js';
import DiseaseDetails from './component/Home/DiseaseDetails.js';
import Surgeons from './component/Home/Surgeons.js';
import SurgeonDetails from './component/Home/SurgeonDetails.js';
import Forum from './component/Home/Forum.js';
import Post from './component/Home/Post.js';
import AdminPortal from './component/Home/Admin/AdminPortal.js';
import DoctorList from './component/Home/Admin/DoctorList.js';
import DoctorEdit from './component/Home/Admin/DoctorEdit.js';
import AddDoctor from './component/Home/Admin/AddDoctor.js';
import HospitalList from './component/Home/Admin/HospitalList.js';
import AddHospital from './component/Home/Admin/AddHospital.js';
import AddDisease from './component/Home/Admin/AddDisease.js';
import AddSymptom from './component/Home/Admin/AddSymptom.js';
import GetDoctorAppointments from './component/Home/Admin/GetDoctorAppointments.js';
import { BrowserRouter as Router , Routes , Route, useNavigate } from 'react-router-dom';
import Footer from './component/layout/Footer/Footer';
import Labs from './component/Home/labs';
import LabDetails from './component/Home/labDetails';
import AddLab from './component/Home/Admin/AddLab';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Webfont from 'webfontloader'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Payment from './component/Home/Payment';
import Products from './component/Home/Products'
import ProductDetails from './component/Home/ProductDetails'
import CreateProduct from './component/Home/Admin/CreateProduct';
import ProductList from './component/Home/Admin/ProductList'
import GetSurgeonAppointments from './component/Home/Admin/GetSurgeonAppointments';
import MyOrder from "./component/Home/Admin/MyOrder.js";
import LoginSignUp from './component/Home/User/LoginSignUp.js';
import Orders from "./component/Home/User/MyOrder.js";


function App() {

  // const navigate = useNavigate()

  const isAuthenticated = localStorage.getItem('token') ? true : false;
  console.log('Authentication in App: ', isAuthenticated);


  const [stripeApiKey, setStripeApiKey] = useState("")
  
  async function getStripedApiKey() {
    const { data } = await axios.get("http://127.0.0.1:4000/api/v1/stripeapikey")
    // console.log(`Data.stripe api key${data.stripeApiKey}`)
    // const api_key = data.stripeApiKey
    setStripeApiKey(data.stripeApiKey)
    // console.log(api_key);
    console.log("Stripe Api Type is:" + typeof stripeApiKey);
    console.log("Stripe Api of data  is:" + typeof data.stripeApiKey);
  }
  useEffect(() => {
    Webfont.load({
      google:{
        families:['Roboto' , 'Droid Sans' , 'Chilanka']
      }
    })
    // if(!isAuthenticated){
    //   navigate('/login')
    // }
    getStripedApiKey()
  } , [])



  
  return (
    <Router>

          <Header />
          
          
              {stripeApiKey && (
                  <Elements  stripe={loadStripe(stripeApiKey)}>
                  <Routes>
                  <Route exact path="/process/payment" element={<Payment />} />
                  </Routes>
                  </Elements>
              )}


          <Routes>
                        {/* <ProtectedRoute path="/products" element={<Products />} /> */}
                        <Route path="/products" element={<Products />} />
                        <Route exact path="/product/:id" element={<ProductDetails />} />
                        <Route exact path="/user/details" element={<Orders />} />
                        {/* <Route exact path="/products" element={<Products />} /> */}

                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<LoginSignUp />} />
                <Route exact path="/doctor/:id" element={<DoctorDetails />} />
                <Route exact path="/lab/:id" element={<LabDetails />} />
                <Route exact path="/doctors/search" element={<SearchDetails />} />
                <Route exact path="/hospital/:id" element={<HospitalDetails />} />
                <Route exact path="/hospitals" element={<Hospitals />} />
                <Route exact path="/doctors" element={<Doctors />} />
                <Route exact path="/symptom/:id" element={<SymptomDetails />} />
                <Route exact path="/disease/:id" element={<DiseaseDetails />} />
                <Route exact path="/surgeries" element={<Surgeons />} /> 
                <Route exact path="/surgeries/:id" element={<SurgeonDetails />} />
                <Route exact path="/labs" element={<Labs />} /> 
                <Route exact path="/forum" element={<Forum />} />
                <Route exact path="/forum/post-a-question" element={<Post />} />
          
    



                  {/* Admin Panel Start */}
                <Route exact path="/admin/" element={<AdminPortal />} />
                <Route exact path="/admin/doctors" element={<DoctorList />} />
                <Route exact path="/admin/doctors/:id" element={<DoctorEdit />} />
                <Route exact path="/admin/doctor/new" element={<AddDoctor />} />
                <Route exact path="/admin/lab/new" element={<AddLab />} />
                
                <Route exact path="/admin/hospitals" element={<HospitalList />} />
                <Route exact path="/admin/hospital/new" element={<AddHospital />} />


                <Route exact path="/admin/disease/new" element={<AddDisease />} />

                <Route exact path="/admin/symptom/new" element={<AddSymptom />} />

                
                <Route exact path="/admin/checkDoctorAppointments" element={<GetDoctorAppointments />} />

                <Route exact path="/admin/checkSurgeonAppointments" element={<GetSurgeonAppointments />} />


                <Route exact path="/admin/products" element={<ProductList />} />
              
              
                <Route exact path="/admin/product" element={<CreateProduct />} />

                <Route exact path="/admin/orders" element={<MyOrder />} />

                  {/* Admin Panel End */}



    
          </Routes>
    
    
          <Footer />
    
    </Router>
  );
}

export default App;
