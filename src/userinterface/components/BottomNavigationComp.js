import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Avatar, Button, Dialog, DialogContent, Divider } from 'material-ui-core';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postData } from '../../services/fetchnodeservices';
import { toast } from 'react-toastify';
import postLogo from "../../img/postlogo.png"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function BottomNavigationComp({refresh, setRefresh, isLoading, setIsLoading}) {

const [value, setValue] = React.useState('home');
const navigate = useNavigate()
let user = JSON.parse(localStorage.getItem('user'))

const [caption, setCaption] = useState('')
const [open, setOpen] = useState(false)
const [postimg, setPostimg] = useState('')

const theme = useTheme()
const matches1 = useMediaQuery(theme.breakpoints.down(1100))
const matches2 = useMediaQuery(theme.breakpoints.down(1000))
const matches3 = useMediaQuery(theme.breakpoints.down(908))
const matches4 = useMediaQuery(theme.breakpoints.down(700)) 
const matches5 = useMediaQuery(theme.breakpoints.down(500))

const notifyA = (msg)=>toast.error(msg)
const notifyB = (msg)=>toast.success(msg)

const handleClose = () => {
    setOpen(false)
    setPostimg('')
    setCaption('')
}

const handleSubmitPost = async () => {
    setOpen(!open);
    setIsLoading(true)
    const data = new FormData();
    data.append("file", postimg);
    data.append("upload_preset", "instagram-clone");
    data.append("cloud_name", "shubhamrajputcloud");

    // Check if it's an image or video based on file type
    let uploadUrl = postimg.type.includes("video") 
        ? "https://api.cloudinary.com/v1_1/shubhamrajputcloud/video/upload" 
        : "https://api.cloudinary.com/v1_1/shubhamrajputcloud/image/upload";

    // console.log("Uploading file to Cloudinary:", uploadUrl);  // Log the upload URL
    fetch(uploadUrl, {
        method: "post",
        body: data
    })
    .then(res => res.json())
    .then(async (data) => {
        // console.log("Cloudinary Response:", data);  // Log Cloudinary response
        let token = JSON.parse(localStorage.getItem('token'));
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        // Construct post data
        let body = {
            body: caption,
            picture: postimg.type.includes("image") ? data.url : "",
            video: postimg.type.includes("video") ? data.url : ""
        };
        console.log("Post data being sent:", body);  // Log the body being sent

        let result = await postData('post/createpost', body, config);
        // console.log("Server Response:", result);  // Log the response from the server
        setIsLoading(false)
        if (result.status === true) {
            notifyB(result.message);
            setRefresh(!refresh);
            handleClose();
        }
    })
    .catch((err) => console.log("Upload Error:", err));
};

const showMediaPreview = () => {
    const mediaURL = URL.createObjectURL(postimg);
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2%', boxSizing: 'border-box' }}>
                <div onClick={() => setPostimg('')}> <ArrowBackIcon /></div>
                <div onClick={handleSubmitPost} style={{ cursor: 'pointer' }}>Share</div>
            </div>

            {/* Show either image or video preview based on the file type */}
            <div style={{ width: '100%', height: '400px' }}>
                {postimg.type.startsWith('image/') ? (
                    <img src={mediaURL} style={{ width: '100%', height: '100%' }} alt="preview" />
                ) : (
                    <video src={mediaURL} style={{ width: '100%', height: '100%' }} controls />
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '90%' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%' }}>
                    <Avatar />
                    <div style={{ marginLeft: '5%' }}>itz_shubham.0255</div>
                </div>
                <div> 
                    <textarea
                        type="text"
                        placeholder="Write a caption...."
                        style={{ border: 'none', width: 300, marginTop: '5%', outline: 'none' }}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

// Function to render the post creation form
const createPostForm = () => {
    return (
        <div style={{ borderRadius: 40, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
            {matches5? <div style={{
                    position:'absolute',
                    top:'0px',
                    left:'0px',
                    cursor:'pointer',
                    color: 'black'
                }} onClick={()=>{setOpen(false)}}> 
                 <ArrowBackIcon  />
                 </div> :<></>}
     {matches5? <></> : <div style={{
                    position:'absolute',
                    top:'0px',
                    right:'0px',
                    cursor:'pointer',
                    color: 'black'
                }} onClick={()=>{setOpen(false)}}> 
                 <CloseIcon  />
                 </div> }
            <div style={{ padding: '3% 0% 3% 0%' }}>Create new post</div>
            <Divider style={{ width: '100%' }} />

            <div style={{ width: '85%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', alignItems: 'center', marginTop: '20%', marginBottom: '20%' }}>
                <img src={postLogo} style={{ width: '25%', margin: '5%' }} alt="post logo" />
                <div>Drag photos and videos here</div>

                {/* File input accepting both images and videos */}
                <Button component="label" variant="contained" className="post-btn" style={{ backgroundColor: "#00a8ff", width: "60%", margin: "5%", border: "none", color: "#fff", padding: "3%", fontWeight: "bold", borderRadius: "10px", fontSize: ".9rem" }}>
                    Select from computer
                    <input
                        type="file"
                        hidden
                        accept="image/*,video/*"
                        onChange={(e) => setPostimg(e.target.files[0])}
                    />
                </Button>
            </div>
        </div>
    );
};

const showDialog = () => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth={matches5?'':'xs'} fullScreen={matches5} fullWidth >
            <DialogContent style={{ padding: 0 }}>
                {postimg ? showMediaPreview() : createPostForm()}
            </DialogContent>
        </Dialog>
    );
};

const handleChange = (event, newValue) => {
  if(newValue == 'profile' || newValue == 'imagefeed'){
    navigate(`/${newValue}/${user?._id}`)
  }else if(newValue == 'add'){
    setOpen(true)
  }
  else{
  navigate(`/${newValue}`)
  }
  setValue(newValue);
};

const list = [
  {label:"Home" , value:"home" , icon:<HomeIcon />},
  {label:"Search" , value:"imagefeed" , icon:<SearchIcon />},
  {label:"Add" , value:"add" , icon:<AddBoxIcon />},
  {label:"Notifications" , value:"notification" , icon:<FavoriteIcon />},
  {label:"Profile" , value:"profile" , icon:<AccountCircleIcon />}
]

return (<div style={{display:'flex',justifyContent:'space-around',alignItems:'center', width:'100%', paddingTop:'10px', position:'fixed',top:'94.2%',left:0,zIndex:1000,backgroundColor:'#fff',padding:'10px 0px 5px 0px'}} >
                  {list?.map((item)=>{
                    return <div onClick={(event)=>handleChange(event,item?.value)} >
                      {item?.icon}
                    </div>
                  })}
                  {showDialog()}
</div>);
}

export default BottomNavigationComp;


{/* <BottomNavigation sx={{ width: '89%',height:'20px' }} value={value} onChange={handleChange}>
       <BottomNavigationAction label="Home" value={"home"} icon={<HomeIcon />} />
       <BottomNavigationAction label="Search" value={"search"} icon={<SearchIcon />} />
       <BottomNavigationAction label="Add" value={"add"} icon={<AddBoxIcon />} />
       <BottomNavigationAction label="Notifications" value={"notification"} icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Profile" value={"profile"} icon={<AccountCircleIcon />} />
</BottomNavigation> */}
