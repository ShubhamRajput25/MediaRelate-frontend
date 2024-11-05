import React, { useState } from "react";
import logo from "../img/logo.png"
import './SignIn.css'
import { Link, useNavigate } from "react-router-dom";
import { postData, signing } from "../services/fetchnodeservices";
import { TextField } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const navigate = useNavigate()
    const handleSubmit = async () => {
        let body = {
            "email": email,
            "password": password
        }
        let result = await signing('auth/signin', body)
        if (result.status == true) {
            // console.log("dataaaaaaaaaa", result.message)
            alert("welcom user")
            window.localStorage.setItem('user',JSON.stringify(result.data))
            window.localStorage.setItem('token',JSON.stringify(result.token))
            navigate('/home')
        } else {
            alert("plz enter correct id and password")
        }
    }
    return (
        <div className="signup">

            <div className="form-container" >
                <div style={{width:'100%'}}>
                <h3 className="signupLogo">MediaRelate</h3>

                    <div style={{marginTop:'10px'}}>
                        {/* <input type="email" name="email" id="email" placeholder="Phone number , username or email address" onChange={(e) => setEmail(e.target.value)} /> */}

                        <TextField label="Mobile number or email address" name="email" id="email" onChange={(e) => setEmail(e.target.value)} fullWidth variant='outlined' />
                    </div>

                    <div style={{marginTop:'10px'}}>
                        {/* <input type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /> */}

                        <TextField label="Password" name="password" id="password"  onChange={(e) => setPassword(e.target.value)} fullWidth variant='outlined' />
                    </div>

                  

                    <div>
                        <input type="submit" id="submit-btn" value="Log in" style={{ marginBottom: '5%' }} onClick={handleSubmit} />
                    </div>

                    <hr />

                    <div style={{
                        backgroundColor:'blueviolet',
                        color:'white',
                        padding:'8px 0px',
                        marginTop:'10px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        gap:'5px'
                    }}><GoogleIcon /> Log in with Google</div>
                    <div style={{
                        backgroundColor:'blueviolet',
                        color:'white',
                        padding:'8px 0px',
                        marginTop:'10px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        gap:'7px'
                    }}><EmailIcon /> Log in with Email</div>

                    <div style={{ fontSize: '.8rem', marginBottom: '5%',marginTop:'10px' }}>Forgotten your password?</div>

                </div>
            </div>
            <div className="gotosignin">
                Don't have an account?
                <Link to="/signup" style={{ color: 'blueviolet', fontWeight: 'bold', fontSize: '.8rem',marginLeft:'5px' }}>Sign up</Link>
            </div>

        </div>)
}