import React, { useState } from "react";
import logo from "../img/logo.png"
import './SignIn.css'
import { Link, useNavigate } from "react-router-dom";
import { postData, signing } from "../services/fetchnodeservices";
import { TextField } from "material-ui-core";
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
import ForgetPasswordPage from "../userinterface/components/ForgetPasswordPage";
import OtpPage from "../userinterface/components/OtpPage";
export default function SignIn({setIsLogin, refresh, setRefresh}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [forgetPassword, setForgetPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate()

    const handleSubmit = async () => {
        let body = {
            "email": email,
            "password": password
        }
        setSubmitLoading(true)
        let result = await signing('auth/signin', body)
        if (result?.status == true) {
            // console.log("dataaaaaaaaaa", result.message)
            // alert("welcom user")
            window.localStorage.setItem('user',JSON.stringify(result.data))
            window.localStorage.setItem('token',JSON.stringify(result.token))
            setIsLogin(true)
            navigate('/home')
        } else {
            alert("plz enter correct id and password")
        }
        setSubmitLoading(false)
        setRefresh(!refresh)
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

            <div className="form-container" >
                <div style={{width:'100%'}}>
                <h3 className="signupLogo">MediaRelate</h3>

                    <div style={{marginTop:'10px'}}>
                        {/* <input type="email" name="email" id="email" placeholder="Phone number , username or email address" onChange={(e) => setEmail(e.target.value)} /> */}

                        <TextField label="User name or email address" name="email" id="email" onChange={(e) => setEmail(e.target.value)} fullWidth variant='outlined' />
                    </div>

                    <div style={{marginTop:'10px'}}>
                        {/* <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> */}

                        <TextField label="Password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)} fullWidth variant='outlined' />
                    </div>

                  

                    <div>
                        {/* <input type="submit" id="submit-btn" value="Log in" style={{ marginBottom: '5%' }} onClick={handleSubmit} /> */}
                        <button type="submit" id="submit-btn" onClick={handleSubmit} >{submitLoading ? 'Submiting....' : 'Submit' }</button>
                    </div>

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
<div>
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:10}}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            continueWithGoogle(credentialResponse)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                       width={'150px'}
                        />
                    <hr />
                    </div>
                   </div>
                    {/* <div style={{
                        backgroundColor:'blueviolet',
                        color:'white',
                        padding:'8px 0px',
                        marginTop:'10px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        gap:'7px'
                    }}><EmailIcon /> Log in with Email</div> */}

                    <div style={{ fontSize: '.6rem', marginBottom: '5%',marginTop:'10px', cursor:'pointer', textAlign:'end' }} onClick={()=>setOpen(true)}>Forgotten your password?</div>

                </div>
            </div>
            <div className="gotosignin">
                Don't have an account?
                <Link to="/signup" style={{ color: 'blueviolet', fontWeight: 'bold', fontSize: '.8rem',marginLeft:'5px' }}>Sign up</Link>
            </div>
                <ForgetPasswordPage email={email} open={open} setOpen={setOpen} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} password={forgetPassword} setPassword={setForgetPassword}  isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
               <OtpPage
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        data={{ email: email, password: password }}
        typeOfOtp={"forget-password"} 
      />
        </div>)
}