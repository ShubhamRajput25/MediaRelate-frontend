import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Header from "../components/Header";
import PostComponent from "../components/PostComponent";
import { getData, postData, postImg } from "../../services/fetchnodeservices";
import { Avatar, Button, Dialog, DialogContent, Divider, TextField } from "material-ui-core";
import PostSection from "../css/PostSection.css"
import "../css/Home.css"
import HomeProfile from "../components/HomeProfile";
import Suggestion from "../components/Suggestion";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { toast } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import postLogo from "../../img/postlogo.png"
import CommentSection from "../components/CommentSection";

import VideocamIcon from '@mui/icons-material/Videocam';
import CreatePostComponent from "../components/CreatePostComponent";
import { useMediaQuery, useTheme } from "@mui/material";
import BottomNavigationComp from "../components/BottomNavigationComp";
import LoadingPage from "../components/LoadingPage";

export default function Home({refresh, setRefresh, isLoading, setIsLoading}) {

    const [postDataList, setPostDataList] = useState([])
    const [postByYou, setPostByYou] = useState([])
    // const [refresh, setRefresh] = useState(false)
    const [users,setUsers] = useState([])
    // const [caption, setCaption] = useState('')
    // const [postimg, setPostimg] = useState('')
    // const [open, setOpen] = useState(false)

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))

    let user = JSON.parse(localStorage.getItem('user'))

    const notifyA = (msg)=>toast.error(msg)
    const notifyB = (msg)=>toast.success(msg)

    useEffect(function () {
        fetchAllPosts()
        fetchAllUsers()
    }, [refresh])

    // const showDialog = () => {
    //     return <Dialog open={open} onClose={handleClose} >
    //         <DialogContent style={{ padding: 0 }}>
    //             {postimg ? showPicture() : createPostForm()}
    //         </DialogContent>
    //     </Dialog>
    // }

    // const showPicture = () => {
    //     console.log("hellllllllll", URL.createObjectURL(postimg))
    //     return (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '450px' }}>
    //         <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2%', boxSizing: 'border-box' }}><div onClick={() => setPostimg('')}> <ArrowBackIcon /></div><div onClick={handleSubmitPost} style={{cursor:'pointer'}}>Share</div></div>

    //         <div style={{ width: '100%', height: '400px' }}>
    //             <img src={URL.createObjectURL(postimg)} style={{ width: '100%', height: '100%' }} />
    //         </div>

    //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '90%' }}>
    //             <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%' }}>
    //                 <Avatar />
    //                 <div style={{ marginLeft: '5%' }}>itz_shubham.0255</div>
    //             </div>
    //             <div>
    //                 <textarea type="text" placeholder="Write a caption...." style={{ border: 'none', width: 300, marginTop: '5%', outline: 'none' }} value={caption} onChange={(e) => setCaption(e.target.value)} ></textarea>


    //             </div>
    //         </div>
    //     </div>)
    // }

    // const createPostForm = () => {
    //     return (
    //         <div style={{ borderRadius: 40, width: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
    //             <div style={{ padding: '3% 0% 3% 0%' }}>Create new post</div>
    //             <Divider style={{ width: '100%' }} />

    //             <div style={{ width: '85%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', alignItems: 'center', marginTop: '20%', marginBottom: '20%' }}>

    //                 <img src={postLogo} style={{ width: '25%', margin: '5%' }} />

    //                 <div>
    //                     Drag photos and videos here
    //                 </div>
    //                 <Button component="label" variant="contained" className="post-btn" style={{ "backgroundColor": "#00a8ff", "width": "60%", "margin": "5%", "border": "none", "color": "#fff", "padding": "3%", "fontWeight": "bold", "borderRadius": "10px", "fontSize": ".9rem" }}>
    //                     Select from computer
    //                     <input type="file" hidden accept="image/*" multiple onChange={(e) => { console.log(e); setPostimg(e.target.files[0]) }} />
    //                 </Button>

    //             </div>

    //         </div>
    //     )
    // }

    // const handleClose = () => {
    //     setOpen(false)
    //     setPostimg('')
    // }

    // const handleDialog = (item) => {

    //     // if (item.name == "Create") {
    //     //     setOpen(true)
    //     // }
    //     // else if(item.name == "Profile"){
    //     //     navigate('/profile')
    //     // }
    //     // else if(item.name == "Home"){
    //     //     navigate('/home')
    //     // }

    //     setOpen(true)
    // }

    // const handleSubmitPost = async () => {
    //     setOpen(!open)
    //     const data = new FormData()
    //     data.append("file", postimg)
    //     data.append("upload_preset", "instagram-clone")
    //     data.append("cloud_name", "shubhamrajputcloud")

    //     fetch("https://api.cloudinary.com/v1_1/shubhamrajputcloud/image/upload", {
    //         method: "post",
    //         body: data
    //     }).then((res) => res.json())
    //         .then(async(data) => {
    //             let token = JSON.parse(localStorage.getItem('token'))
    //             let config = {
    //                 headers:{
    //                     Authorization: `Bearer ${token}`,
    //                 }
    //             }
    //             let body = { body: caption, picture: data.url }
    //             let result = await postData('post/createpost',body,config)
    //             if(result.status == true){
    //                 notifyB(result.message)                
    //                 setRefresh(!refresh)
    //                 handleClose()
    //             }
    //         })
    //         .catch((err) => console.log(err))



    // }

    // const showDialog = () => {
    //     return (
    //         <Dialog open={open} onClose={handleClose}>
    //             <DialogContent style={{ padding: 0 }}>
    //                 {postimg ? showMediaPreview() : createPostForm()}
    //             </DialogContent>
    //         </Dialog>
    //     );
    // };
    
    // // Function to show media preview (handles both image and video)
    // const showMediaPreview = () => {
    //     const mediaURL = URL.createObjectURL(postimg);
        
    //     return (
    //         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '450px' }}>
    //             <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2%', boxSizing: 'border-box' }}>
    //                 <div onClick={() => setPostimg('')}> <ArrowBackIcon /></div>
    //                 <div onClick={handleSubmitPost} style={{ cursor: 'pointer' }}>Share</div>
    //             </div>
    
    //             {/* Show either image or video preview based on the file type */}
    //             <div style={{ width: '100%', height: '400px' }}>
    //                 {postimg.type.startsWith('image/') ? (
    //                     <img src={mediaURL} style={{ width: '100%', height: '100%' }} alt="preview" />
    //                 ) : (
    //                     <video src={mediaURL} style={{ width: '100%', height: '100%' }} controls />
    //                 )}
    //             </div>
    
    //             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '90%' }}>
    //                 <div style={{ display: 'flex', alignItems: 'center', marginTop: '5%' }}>
    //                     <Avatar />
    //                     <div style={{ marginLeft: '5%' }}>itz_shubham.0255</div>
    //                 </div>
    //                 <div>
    //                     <textarea
    //                         type="text"
    //                         placeholder="Write a caption...."
    //                         style={{ border: 'none', width: 300, marginTop: '5%', outline: 'none' }}
    //                         value={caption}
    //                         onChange={(e) => setCaption(e.target.value)}
    //                     ></textarea>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };
    
    // // Function to render the post creation form
    // const createPostForm = () => {
    //     return (
    //         <div style={{ borderRadius: 40, width: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
    //             <div style={{ padding: '3% 0% 3% 0%' }}>Create new post</div>
    //             <Divider style={{ width: '100%' }} />
    
    //             <div style={{ width: '85%', display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', alignItems: 'center', marginTop: '20%', marginBottom: '20%' }}>
    //                 <img src={postLogo} style={{ width: '25%', margin: '5%' }} alt="post logo" />
    //                 <div>Drag photos and videos here</div>
    
    //                 {/* File input accepting both images and videos */}
    //                 <Button component="label" variant="contained" className="post-btn" style={{ backgroundColor: "#00a8ff", width: "60%", margin: "5%", border: "none", color: "#fff", padding: "3%", fontWeight: "bold", borderRadius: "10px", fontSize: ".9rem" }}>
    //                     Select from computer
    //                     <input
    //                         type="file"
    //                         hidden
    //                         accept="image/*,video/*"
    //                         onChange={(e) => setPostimg(e.target.files[0])}
    //                     />
    //                 </Button>
    //             </div>
    //         </div>
    //     );
    // };
    

    // const handleSubmitPost = async () => {
    //     setOpen(!open);
    //     const data = new FormData();
    //     data.append("file", postimg);
    //     data.append("upload_preset", "instagram-clone");
    //     data.append("cloud_name", "shubhamrajputcloud");
    
    //     // Check if it's an image or video based on file type
    //     let uploadUrl = postimg.type.includes("video") 
    //         ? "https://api.cloudinary.com/v1_1/shubhamrajputcloud/video/upload" 
    //         : "https://api.cloudinary.com/v1_1/shubhamrajputcloud/image/upload";
    
    //     console.log("Uploading file to Cloudinary:", uploadUrl);  // Log the upload URL
    //     fetch(uploadUrl, {
    //         method: "post",
    //         body: data
    //     })
    //     .then(res => res.json())
    //     .then(async (data) => {
    //         console.log("Cloudinary Response:", data);  // Log Cloudinary response
    //         let token = JSON.parse(localStorage.getItem('token'));
    //         let config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         };
    
    //         // Construct post data
    //         let body = {
    //             body: caption,
    //             picture: postimg.type.includes("image") ? data.url : "",
    //             video: postimg.type.includes("video") ? data.url : ""
    //         };
    //         console.log("Post data being sent:", body);  // Log the body being sent
    
    //         let result = await postData('post/createpost', body, config);
    //         console.log("Server Response:", result);  // Log the response from the server
    //         if (result.status === true) {
    //             notifyB(result.message);
    //             setRefresh(!refresh);
    //             handleClose();
    //         }
    //     })
    //     .catch((err) => console.log("Upload Error:", err));
    // };
    
    




    const fetchAllUsers = async () => {
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await getData('users/getsuggestionList',config)
        if(result?.status == true){
            setUsers(result.data)
        }
    }

    const fetchAllPosts = async () => {
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let user = JSON.parse(localStorage.getItem('user'))
        let body = { user: user }
        let result = await getData('post/fetchAllPosts', config)

        if (result?.status == true) {
            setPostDataList(result?.data)
        }

        let postedbyyou = result?.data?.filter((item) => {
            return item.postedby?._id == user._id
        })
        // console.log("post which is post by you : ", postedbyyou)
        setPostByYou(postedbyyou)
        // console.log("end")
    }

    const showPosts = () => {
        return postDataList.map((item) => {
            return <div style={{ marginBottom: '1rem', width: '94%' }}>
                <PostComponent data={item} refresh={refresh} setRefresh={setRefresh} />
                <Divider />
            </div>
        })
    }

    return (
            isLoading? <LoadingPage /> :
        <div style={{ width: '100%',height:matches3?'auto':'100vh', background: '#f5f6fa' }}>
            <Grid container spacing={2} style={{ display:'flex',justifyContent:'center',position:'relative'}}>
                <Grid item xs={12} style={{ background: 'white' , position:'fixed',top:0,left:0,zIndex:1000,width:'100%'}}>

                    <Header refresh={refresh} setRefresh={setRefresh} />
              
                </Grid>

            {matches3?<></>: <Grid item xs={matches2?5.5:matches1?5:3.5} style={{ display: 'flex', justifyContent: 'end', background: 'fixed',marginTop:'90px' }}>
                    <HomeProfile followers={user.followers.length} following={user.following.length} noOfposts={postByYou?.length} username={user.username} />
                </Grid> }

                <Grid item xs={matches5?12:matches4?10:matches3?8:matches1?6:4.5} className="filter-scrollbar" style={{ overflow: 'auto', height: matches3?'82vh':'85vh', display: 'flex', flexWrap: 'wrap' ,justifyContent:'center',marginTop:'90px'}}>

                    {/* <div style={{width:'94%',height:'180px',backgroundColor:'white',marginBottom:10,display:'flex',justifyContent:'center'}}>
                    <div style={{width:'90%'}}>
                    <div style={{display:'flex',justifyContent:'start',marginTop:5}}>
                        <BorderColorIcon color='primary' />
                        <span style={{fontSize:'.9rem',fontWeight:'bold',marginLeft:10,display:'flex',alignItems:'center'}}>Create Post</span>
                    </div>

                    <div style={{marginTop:15}}>
                    <textarea
                        placeholder="What's on your mind?"
                        row={5}
                        style={{width:'100%',height:90,borderRadius:15,paddingLeft:10,outline:'none',paddingTop:5}}
                        value={caption}
                        onChange={(e)=>setCaption(e.target.value)}
                        />
                    </div>

                    <div style={{display:'flex',alignItems:'center'}}>
                     <span onClick={()=>setOpen(true)}><AddPhotoAlternateIcon color='success' style={{cursor:'pointer'}}/></span> 
                        <span>Photo</span>

                        <span onClick={()=>setOpen(true)} ><VideocamIcon color='success' style={{cursor:'pointer',marginLeft:'10px'}}/></span> 
                        <span>Video</span>

                    </div>

                    </div>
                    </div> */}

                    <CreatePostComponent refresh={refresh} setRefresh={setRefresh} setIsLoading={setIsLoading} />

                    {showPosts()}
                </Grid>
          {matches1?<></>:   <Grid item xs={2.7} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', marginTop: 15, height: "fit-content",marginTop:'105px' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 10, fontWeight: 'bold', textAlign: 'start', width: '90%' }}>Who to follow</div>
                    <Suggestion data = {users} refresh={refresh} setRefresh={setRefresh}/>
                </Grid>}

                {/* {matches3?   <Grid item xs={12} style={{position:'absolute',top:'92%',width:'100%', backgroundColor:'#fff'}}>

                <BottomNavigationComp /> 
                </Grid> : <></>} */}

              
            </Grid>
            {/* {showDialog()} */}
            
            
               
        </div>
    )
}