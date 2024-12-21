import React, { useEffect, useState } from "react";
// import "../css/Header.css"
import logo from "../../img/logo.png"
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/Explore';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import MessageIcon from '@material-ui/icons/Message';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Button, Divider, TextareaAutosize } from "@material-ui/core";
import postLogo from "../../img/postlogo.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Form, useNavigate } from "react-router-dom";
import { postData, postImg } from "../../services/fetchnodeservices";
import { toast } from "react-toastify";
import projectLogo from "../../img/projectLogo.png"
import SearchBar from "./SearchBar";
import profilePhoto from "../../img/profileTempPostImg.webp"
import NotificationsIcon from '@mui/icons-material/Notifications';
import MediaRelateLogo from "../../img/MediaRelate logo.png"
import Swal from "sweetalert2";
export default function Header({refresh,setRefresh}) {
    const [open, setOpen] = useState(false)
 
    const notifyA = (msg)=>toast.error(msg)
    const notifyB = (msg)=>toast.success(msg)

    let navigate = useNavigate()

    let user = JSON.parse(localStorage.getItem('user'))

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(450))

     const handleLogout = async()=>{
        
        let result = await  Swal?.fire({
            title:"Are you sure to logout your account",
            text: "You won't be able to revert this!",
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'red',
            cancelButtonColor:'#d33',
            confirmButtonText: "Yes, Logout!",
        })
    
        if(result?.isConfirmed) {
            localStorage?.removeItem('token')
            localStorage?.removeItem('user')
            navigate(`/signin`)
        }
        }

    const showProfileOptopns = ()=>{
        return <div style={{
            width:'200px',
            height:'150px',
            backgroundColor:'#f1f2f6',
            borderRadius:'5px',
            padding:'5px',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            position:'absolute',
            right:0,
            top:45
        }}>
            <img src={user?.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"} style={{width:'40px',height:'40px',borderRadius:'50%', marginTop:'5px' }}  />

            <div style={{fontWeight:'bold', fontSize:'.9rem'}}>{user?.username}</div>

            <div style={{
                fontSize:".9rem",
                color:'#00b894',
                borderColor:'#00b894',
                backgroundColor:'#7bed9f',
                width:'150px',
                padding:'5px 10px 5px 10px',
                borderRadius:'5px',
                border:'1px solid #00b894',
                fontWeight:'bold',
                cursor:'pointer'
            }} onClick={()=>{
                let userId = user?._id
                navigate(`/profile/${userId}`)
            }}>View Profile</div>

            <div style={{
                fontSize:".9rem",
                fontWeight:'bold',
                color:'#d63031',
                borderColor:'#d63031',
                backgroundColor:'#fab1a0',
                width:'150px',
                padding:'5px 10px 5px 10px',
                borderRadius:'5px',
                border:'1px solid #d63031',
                marginTop:'5px',
                cursor:'pointer'
               
            }} onClick={handleLogout}>Logout</div>

        </div>
    }

    return (
            <div style={{width:'100%',height:'50px',display:'flex',justifyContent:'center'}}>
                <div style={{width:'97%',display:'flex'}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <img src={MediaRelateLogo} style={{ width: matches5?'29vw': matches4?'23vw': matches3?'18vw': matches1?'12vw' : '9vw' , cursor:'pointer'}} onClick={()=>navigate('/home')}/>
                        {/* {<SearchBar width="15vw" />} */}
                    </div>
             {matches3?<></> :  <div style={{display:'flex',alignItems:'center',marginLeft:'auto', position:'relative'}}>
                    
                    <div style={{marginLeft:'2vw',cursor:'pointer'}}  onClick={()=>navigate('/home')}>Home</div>
                    <div style={{marginLeft:'2vw',cursor:'pointer'}}  onClick={()=>navigate('/search')}>Search</div>
                    {/* <div style={{marginLeft:'2vw'}} >Add Friends</div> */}
                    <div style={{marginLeft:'2vw',cursor:'pointer'}} onClick={()=>{
                        let userId = user?._id
                        navigate(`/imagefeed/${userId}`)
                        }} >Image Feed</div>
                    {/* <div style={{marginLeft:'2vw',cursor:'pointer'}} >Add Friends</div> */}
                    {/* <div style={{marginLeft:'2vw'}}  onClick={()=>{setOpen(true)}}>Add Post</div> */}
                    <div style={{marginLeft:'2vw',cursor:'pointer'}}  onClick={()=>{
                        let userId = user?._id
                        navigate(`/profile/${userId}`)
                        }}>Profile</div>
                    {/* <div style={{marginLeft:'10px'}} >
                    <NotificationsIcon />                 
                    </div> */}
                    <div>   
                    <Avatar src={user?.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"} style={{width:'40px',height:'40px',marginLeft:'5px', cursor:'pointer' }} onClick={()=>{ 
                    setOpen(!open)
                    }} /></div>
                     {open?showProfileOptopns():<></>}
                    </div> }
                   
                </div>
       
            </div>

    )
}