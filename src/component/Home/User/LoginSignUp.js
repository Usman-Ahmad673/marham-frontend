import React, {Fragment , useRef , useState , useEffect} from 'react'
import "./LoginSignUp.css"
import Loader from '../../layout/Loader/Loader'
// import MailOutlineIcon from '@material-ui/icons/MailOutline'
// import LockOpenIcon from '@material-ui/icons/LockOpen'
// import FaceIcon from '@material-ui/icons/Face'
import { Link } from 'react-router-dom'
// import profile from '../../images/profile.png'
import { useDispatch , useSelector } from 'react-redux'
import { clearErrors , login , register } from '../../../actions/userActions'
// import { useAlert } from 'react-alert'
import { useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import MetaData from '../../MetaData'
import { AccountCircle, Lock } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'


const LoginSignUp = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const alert = useAlert()

  const { error , token , loading , user , isAuthenticated} = useSelector(
    (state) => state.user
  );
  const { success , error: RegisterError } = useSelector(
    (state) => state.userRegister
  );

  console.log('Authentication', isAuthenticated);
  console.log('user Success: ',success);
  console.log('token: ',token);

  const loginTab = useRef(null)
  const registerTab = useRef(null)
  const switcherTab = useRef(null)


  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  
  const [usr, setUsr] = useState({
    "email" : "",
    "password" : "",
  })

  const { email , password } = usr

  
  // const [loading, setloading] = useState(false)


  const loginSubmit = (e) => {
    e.preventDefault()
    dispatch(login(loginEmail, loginPassword))
    console.log("Login Form Submitted");
    
  }
  
  
  const registerSubmit = (e) => {
    e.preventDefault()
    
    // const myForm = new FormData()
    // myForm.set("email" , email)
    // myForm.set("password" , password)
    // console.log('email: ',myForm.get('email'))
    // console.log('password: ',myForm.get('password'))
    dispatch(register(email,password))
    console.log("SignUp Form Submitted");
    // navigate('/')
  }


  const registerDataChange = (e) => {
      setUsr({ ...usr , [e.target.name] : e.target.value})
  }
  const redirect = location.search ? location.search.split("-")[1] : "/products"
  console.log(redirect);


  const showToastSuccessMessage = (msg) => {
    toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT,
    });
  };



const showToastErrorMessage = (e) => {
    toast.error(e, {
    position: toast.POSITION.TOP_RIGHT,
    });
};



  useEffect(() => {
    if(error){
      alert(error)
      dispatch(clearErrors())
    }

    // console.log(isAuthenticated);
    if(success){
      showToastSuccessMessage('Successfully Registered Login Please!')
      // navigate("/account");
      navigate('/');
    }
    if(RegisterError){
      showToastErrorMessage(RegisterError)
      dispatch(clearErrors)
    }
    if(isAuthenticated){
      showToastSuccessMessage('Successfully Logged IN!')
      // navigate("/account");
      navigate(redirect);
    }

  }, [dispatch , error , navigate , RegisterError , success , isAuthenticated , redirect])
  

  const switchTabs = (e , tab)  => {
    if(tab === "login"){
      switcherTab.current.classList.add("shiftToNeutral")
      switcherTab.current.classList.remove("shiftToRight")

      registerTab.current.classList.remove("shiftToNeutralForm")
      loginTab.current.classList.remove("shiftToLeft")
      console.log('Loin Form Opened');
    }
    if(tab === "register"){
      switcherTab.current.classList.remove("shiftToNeutral")
      registerTab.current.classList.add("shiftToNeutralForm")
      
      switcherTab.current.classList.add("shiftToRight")
      loginTab.current.classList.add("shiftToLeft")
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title="Login/Signup"/>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  {/* <MailOutlineIcon /> */}
                  <TextField
                      type="email"
                      label="Email"
                      placeholder="Enter your email"
                      required
                      fullWidth
                      variant="outlined"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  <AccountCircle />
                              </InputAdornment>
                          ),
                      }}
                  />
                </div>
                <div className="loginPassword">
                  {/* <LockOpenIcon /> */}
                  <TextField
                      type="password"
                      label="Password"
                      placeholder="Enter password"
                      required
                      fullWidth
                      variant="outlined"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                  <Lock />
                              </InputAdornment>
                          ),
                      }}
                  />
                </div>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
<div className="signUpEmail">
                <TextField
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                    fullWidth
                    variant="outlined"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="signUpPassword">
                <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    required
                    fullWidth
                    variant="outlined"
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default LoginSignUp