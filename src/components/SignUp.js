import React, { useState } from "react";
import logo from "../img/logo.png"
import './SignUp.css'
import { Link } from "react-router-dom";
import { postData, signing } from "../services/fetchnodeservices";
import { serverurl } from "../services/fetchnodeservices";
import { wait } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import { TextField } from "material-ui-core";
import OtpPage from "../userinterface/components/OtpPage";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
export default function SignUp({setIsLogin, refresh, setRefresh}) {

    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false)

    const handleSubmit = async () => {
        let body = {
            'name': fullName,
            'username': userName,
            'email': email,
            'password': password
        }
            setSubmitLoading(true)
        let result = await signing('auth/signup', body)

        if (result.status == true) {
            // alert("hooo gya bhai submit")
            // navigate('/signin')
            setModalOpen(true)
        } else {
            alert("bhai kuch galti ker dii")
        }
        setSubmitLoading(false)
    }

    const continueWithGoogle = async(credentialResponse)=>{
        
        const jwtDetails = jwtDecode(credentialResponse?.credential)
        
        let body = {
            ...jwtDetails,
            ...credentialResponse
        }
        
        let result = await postData(`auth/continue-with-google`,body)

        if(result?.status){
            
            localStorage.setItem('token', JSON.stringify(result?.token))
            localStorage.setItem('user', JSON.stringify(result?.data))
            setIsLogin(true)
            navigate('/home')
        }
    }

    return (
        <div className="signup">

            <div className="form-container">
                <div >
                    {/* <img className="signupLogo" src={require('../img/projectLogo.png')} style={{}} /> */}
                    <h3 className="signupLogo">MediaRelate</h3>
                    <p style={{fontSize:'.98rem',color:'#34495e',marginTop:'5px'}}>
                        Sign up to see photos from your friends
                    </p>

                    {/* <input type="submit" id="loginwithfacebook-btn" value="Log in with Facebook" /> */}
                    {/* <div style={{
                        backgroundColor:'blueviolet',
                        color:'white',
                        padding:'8px 0px',
                        marginTop:'10px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        gap:'5px'
                    }}><GoogleIcon /> Log in with Google</div> */}
                   
                        {/* <hr /> */}
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:10}}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            continueWithGoogle(credentialResponse)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                       width={'170px'}
                        />
                    </div>

                    <hr style={{ marginTop: '4%', marginBottom: '10%', color: '#f1f2f6', }} />

                    <div style={{marginTop:'10px'}}>
                        {/* <input type="email" name="email" id="email" placeholder="Mobile number or email address" onChange={(e) => setEmail(e.target.value)} /> */}

                        <TextField label="Email address" name="email" id="email" onChange={(e) => setEmail(e.target.value)} fullWidth variant='outlined' />
                    </div>

                    <div style={{marginTop:'10px'}}>
                        {/* <input type="text" name="name" id="name" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} /> */}

                        <TextField label="Full Name" name="name" id="name"  onChange={(e) => setFullName(e.target.value)} fullWidth variant='outlined' />

                    </div>

                    <div style={{marginTop:'10px'}}>
                        {/* <input type="text" name="username" id="username" placeholder="Username" onChange={(e) => setUserName(e.target.value)} /> */}

                        <TextField label="Username"  name="username" id="username"  onChange={(e) => setUserName(e.target.value)} fullWidth variant='outlined' />
                    </div>

                    <div style={{marginTop:'10px'}}>
                        {/* <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> */}

                        <TextField label="Password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)} fullWidth variant='outlined' />
                    </div>

                    <p className="loginPara">
                        People who use our service may have uploaded your contact information to MediaRelate.
                    </p>


                    {/* <input type="submit" id="submit-btn" value="Sign Up" onClick={handleSubmit} /> */}
                    <button type="submit" id="submit-btn" onClick={handleSubmit} >{submitLoading ? 'Submiting....' : 'Submit' }</button>
                </div>
            </div>

            <div className="gotosignin">
                Have an account?
                <Link to="/signin" style={{ color: 'blueviolet', fontWeight: 'bold', fontSize: '.8rem',marginLeft:'5px' }}>Log in</Link>
            </div>
            <OtpPage isModalOpen={isModalOpen} setModalOpen={setModalOpen} 
            data={
            {'name': fullName,
            'username': userName,
            'email': email,
            'password': password}
            } />
        </div>
    )
}

