import React, { useEffect, useState } from "react";
// import "../css/Header.css"
import logo from "../../img/logo.png"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
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

export default function Header({refresh,setRefresh}) {
    const [open, setOpen] = useState(false)
    const [postimg, setPostimg] = useState('')
    const [userData, setUserData] = useState([])
    const [caption, setCaption] = useState('')
 
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

    let items = [{ name: "Home", logo: <HomeIcon /> },
    { name: "Search", logo: <SearchIcon /> },
    { name: "Explore", logo: <ExploreIcon /> },
    { name: "Reels", logo: <PlayCircleOutlineIcon /> },
    { name: "Messages", logo: <MessageIcon /> },
    { name: "Notifications", logo: <FavoriteBorderIcon /> },
    { name: "Create", logo: <AddCircleOutlineIcon /> },
    { name: "Profile", logo: <AccountCircleIcon /> },
    { name: "More", logo: <MenuIcon /> },
    ]

    const showDialog = () => {
        return <Dialog open={open} onClose={handleClose} >
            <DialogContent style={{ padding: 0 }}>
                {postimg ? showPicture() : createPostForm()}
            </DialogContent>
        </Dialog>
    }


    // const handlePictureChange = (event) => {
    //     setPostimg({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
    // }

    const handleSubmitPost = async () => {
        setOpen(!open)
        const data = new FormData()
        data.append("file", postimg)
        data.append("upload_preset", "instagram-clone")
        data.append("cloud_name", "shubhamrajputcloud")

        fetch("https://api.cloudinary.com/v1_1/shubhamrajputcloud/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json())
            .then(async(data) => {
                let token = JSON.parse(localStorage.getItem('token'))
                let config = {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
                let body = { body: caption, picture: data.url }
                let result = await postData('post/createpost',body,config)
                if(result.status == true){
                    notifyB(result.message)                
                    setRefresh(!refresh)
                    navigate('/home')
                    handleClose()
                }
            })
            .catch((err) => console.log(err))



    }

    const showPicture = () => {
        // console.log("hellllllllll", URL.createObjectURL(postimg))
        return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '450px' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2%', boxSizing: 'border-box' }}><div onClick={() => setPostimg('')}> <ArrowBackIcon /></div><div onClick={handleSubmitPost} style={{cursor:'pointer'}}>Share</div></div>

            <div style={{ width: '100%', height: '400px' }}>
                <img src={URL.createObjectURL(postimg)} style={{ width: '100%', height: '100%' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '90%' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%' }}>
                    <Avatar />
                    <div style={{ marginLeft: '5%' }}>itz_shubham.0255</div>
                </div>
                <div>
                    <textarea type="text" placeholder="Write a caption...." style={{ border: 'none', width: 300, marginTop: '5%', outline: 'none' }} onChange={(e) => setCaption(e.target.value)} ></textarea>


                </div>
            </div>
        </div>)
    }

    const handleShare = async () => {

    }

    const createPostForm = () => {
        return (
            <div style={{ borderRadius: 40, width: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                <div style={{ padding: '3% 0% 3% 0%' }}>Create new post</div>
                <Divider style={{ width: '100%' }} />

                <div style={{ width: '85%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', alignItems: 'center', marginTop: '20%', marginBottom: '20%' }}>

                    <img src={postLogo} style={{ width: '25%', margin: '5%' }} />

                    <div>
                        Drag photos and videos here
                    </div>
                    <Button component="label" variant="contained" className="post-btn" style={{ "backgroundColor": "#00a8ff", "width": "60%", "margin": "5%", "border": "none", "color": "#fff", "padding": "3%", "fontWeight": "bold", "borderRadius": "10px", "fontSize": ".9rem" }}>
                        Select from computer
                        <input type="file" hidden accept="image/*" multiple onChange={(e) => { console.log(e); setPostimg(e.target.files[0]) }} />
                    </Button>

                </div>

            </div>
        )
    }

    const handleClose = () => {
        setOpen(false)
        setPostimg('')
    }
    const handleDialog = (item) => {

        // if (item.name == "Create") {
        //     setOpen(true)
        // }
        // else if(item.name == "Profile"){
        //     navigate('/profile')
        // }
        // else if(item.name == "Home"){
        //     navigate('/home')
        // }

        setOpen(true)
    }

    const showItems = () => {
        return items.map((item) => {
            return <div onClick={() => handleDialog(item)} style={{ display: 'flex', padding: 10, cursor: 'pointer' }}>
                <div>
                    {/* <Avatar src={`${item.logo}`} /> */}
                    {item.logo}
                </div>
                <div style={{ marginLeft: 5 }}>
                    {item.name}
                </div>
            </div>
        })

    }

    return (
            <div style={{width:'100%',height:'50px',display:'flex',justifyContent:'center'}}>
                <div style={{width:'97%',display:'flex',}}>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <img src={projectLogo} style={{ width: matches5?'42vw': matches4?'30vw': matches3?'24vw': matches1?'18vw' : '12vw' , cursor:'pointer'}} onClick={()=>navigate('/home')}/>
                        {/* {<SearchBar width="15vw" />} */}
                    </div>
             {matches3?<></> :  <div style={{display:'flex',alignItems:'center',marginLeft:'auto'}}>
                    
                    <div style={{marginLeft:'2vw',cursor:'pointer'}}  onClick={()=>navigate('/home')}>Home</div>
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
                    <div style={{marginLeft:'10px'}} >
                    <NotificationsIcon />                 
                    </div>
                    <div>   
                    <Avatar src={user?.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"} style={{width:'40px',height:'40px',marginLeft:'5px' }} /></div>
                    </div> }
                </div>
       
            </div>

    )
}