import React, { useEffect, useState } from "react";
import profileImg from "../../img/download.jfif"
import { Button, Divider, Grid, Paper } from "material-ui-core";
import { getData, postData } from "../../services/fetchnodeservices";
import { toast } from "react-toastify";
import coverPhoto from "../../img/cover.jpg"
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import ProfilePostComponent from "./ProfilePostComponent";
import ProfileFollowersComponent from "./ProfileFollowersComponent";
import ProfileFollowingComponent from "./ProfileFollowingComponent";
import EditProfileComponent from "./EditProfileComponent";
import "../css/ProfileComponent.css"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Suggestion from "./Suggestion";
import PostComponent from "./PostComponent";
import CreatePostComponent from "./CreatePostComponent";
import { ImageList, ImageListItem, useMediaQuery, useTheme } from "@mui/material";
import ImageFeedPostComponent from "./ImageFeedPostComponent";
export default function ProfileComponent({ userData, data, refresh, setRefresh, isLoading, setIsLoading }) {
    const [followBtnText, setFollowBtnText] = useState('Follow')
    // const [refresh, setRefresh] = useState(false)
    const [status,setStatus]=useState('posts')
    const [open,setOpen]=useState(false)
    const [cnt,setCnt]=useState(0);
    const [suggestionList,setSuggestionList]=useState([])
    const [followesrDialogOpen,setFollowersDialogOpen]=useState(false)
    const [followingDialogOpen,setFollowingDialogOpen]=useState(false)

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1100))
    const matches2 = useMediaQuery(theme.breakpoints.down(1000))
    const matches3 = useMediaQuery(theme.breakpoints.down(908))
    const matches4 = useMediaQuery(theme.breakpoints.down(700))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))
    
    let user = JSON.parse(localStorage.getItem('user'))
    let userid = user._id
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaa",user)
    if (user.following?.includes(userData._id) && cnt == 0) {  
        setCnt(cnt+1)
        setFollowBtnText('Unfollow')
    }

    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)
    // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",data)

    const handleFollowBtn = async () => {
       
        let token = JSON.parse(localStorage.getItem('token'))
        let body = { friendid: data.postedby }
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        if (followBtnText == 'Follow') {
            let result = await postData('users/addfollowers', body, config)
            setFollowBtnText('UnFollow')
            user.following.push(data.postedby)
            localStorage.setItem('user', JSON.stringify(user))
            setRefresh(!refresh)
        } else {
            let result = await postData('users/removefollowers', body, config)
            setFollowBtnText('Follow')
            user.following.splice(user.following.indexOf(data.postedby), 1)
            localStorage.setItem('user', JSON.stringify(user))
            setRefresh(!refresh)
        }
    }

    const handleProfileImg = async(postimg)=>{
        setIsLoading(true)
        const data = new FormData()
        data.append("file", postimg)
        data.append("upload_preset", "instagram-clone")
        data.append("cloud_name", "shubhamrajputcloud")

        fetch("https://api.cloudinary.com/v1_1/shubhamrajputcloud/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json())
            .then(async(data) => {
                alert("cloud")
                let token = JSON.parse(localStorage.getItem('token'))
                let config = {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
                let body = { profilepic: data.url }
                let result = await postData('users/addprofilepic',body,config)
                setIsLoading(false)
                if(result.status == true){
                    alert(result.message)
                    user.profilepic = data.url
                    localStorage.setItem('user', JSON.stringify(user))
                    setRefresh(!refresh)
                }

            })
    }

    const handleProfileCoverPage = async(postimg)=>{
        setIsLoading(true)
        const data = new FormData()
        data.append("file", postimg)
        data.append("upload_preset", "instagram-clone")
        data.append("cloud_name", "shubhamrajputcloud")

        fetch("https://api.cloudinary.com/v1_1/shubhamrajputcloud/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json())
            .then(async(data) => {
                // alert("cloud")
                let token = JSON.parse(localStorage.getItem('token'))
                let config = {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                }
                let body = { coverpic: data.url }
                let result = await postData('users/addcoverpic',body,config)
                setIsLoading(false)
                if(result.status == true){
                    // alert(result.message)
                    user.coverpic = data.url
                    localStorage.setItem('user', JSON.stringify(user))
                    setRefresh(!refresh)
                }

            })
    }

    const fetchSuggestionList = async()=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await getData(`users/getsuggestionList`,config)
        if(result?.status == true){
            setSuggestionList(result?.data)
        }
    }

    const showPosts = () => {
            return <div style={{ display: 'flex', flexDirection:'column', flexWrap: 'wrap', marginTop: 10, width: matches4?'100%':'90%', justifyContent: 'center',background:'white',borderRadius:20,alignItems:'center'}}>
            <div style={{fontWeight:'bold',fontSize:'1.5rem',width:'90%',textAlign:'start',padding:20}}>
                Photos
            </div>
        
        {/* <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}> */}
        <ImageList variant="quilted"  cols={3} gap={2} style={{width:matches4?'99%':'95%'}}>
        {data.map((item) => (
          <ImageListItem key={item?.picture} style={{padding:'0px',cursor:'pointer'}}>
            {/* <img
              srcSet={item?.picture}
              src={item?.picture}  
              alt={item?.picture}
              loading="eager"
              style={{width:'100%'}}
            /> */}
            <ProfilePostComponent data={item} refresh={refresh} setRefresh={setRefresh} />
            
          </ImageListItem>
        ))}
      </ImageList>
        {/* {data?.map((item)=>{
          return  <ProfilePostComponent data={item} refresh={refresh} setRefresh={setRefresh} />
        })} */}
        {/* </div> */}
    </div>
    }

    useEffect(function(){
        fetchSuggestionList()
    },[refresh])

  
    return (<div style={{ width: '100%' }}>
        <Grid container >
            <Grid item xs={matches3?12:8} style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:15,marginBottom:30}}>

        <div style={{ width:  matches4?'98%':'90%' ,background:'white',display:'flex',alignItems:'center',flexDirection:'column',borderRadius:20}}>
            <div style={{ width: '95%', height:matches4?200: 250,marginTop:18 ,borderRadius:20}}>
                <img src={userid == userData?._id ? user.coverpic || "https://trusteid.mioa.gov.mk/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-2.jpg" : userData.coverpic || "https://www.findmysub.co.za/wp-content/uploads/2023/10/cover-default.jpg"} style={{ width: '100%', height: '100%', objectFit: 'cover' ,borderRadius:20}} />
               {userid == userData?._id ? <Button style={{position:'absolute',color:'#7f8c8d',left:matches5?'79%':matches3?'85%':matches2?'56%':'57.5%',top:matches5?'7.2%':matches3?'6.5%':matches2?'5.5%':'7.5%', padding:0}} component="label" >
                <ModeEditIcon  />
                <input type="file" hidden accept="image/*" onChange={(e)=>{handleProfileCoverPage(e.target.files[0])}} />
                </Button> : <></>}
           </div>

            <div style={{ display: 'flex', marginBottom: 10, marginTop: 10, position: 'relative' ,width:'95%'}}>

                <div style={{ width: matches4?'140px': '170px', height: matches4?'140px': '170px', borderRadius: '50%', position: 'absolute', border: '7px solid white', top: '-70px', left: matches4?'30px': '60px' }}><img src={userid == userData?._id ? user.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" : userData.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"} style={{ width: '100%',height:'100%', borderRadius: '50%',objectFit:'cover' }} />
              {userid == userData?._id ? <Button style={{position:'absolute',color:'#7f8c8d',left:'60%',top:'15%'}} component="label" >
                <ModeEditIcon />
                <input type="file" hidden accept="image/*" onChange={(e)=>{handleProfileImg(e.target.files[0])}} />
                </Button> : <></> }
                
                </div>



                <div style={{ width: '100%', textAlign: 'start', marginLeft: matches5?'10px':matches4?'200px': '270px',marginBottom:40,display:'flex',justifyContent:'space-between',flexDirection: matches4?'column': matches3?'row': matches2?'column':'row',marginTop:matches5?'75px':'' }}>
                   <div style={{width:'100%'}}>
                   <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 5 }}>{userData?.username}</div>
                   <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: 5 }}>{userData?.name}</div>
                    <div style={{ display: 'flex', gap: 15, fontSize: '.9rem', fontWeight: 600 ,width:'100%',}}>
                        <div style={{width:'fit-content'}}>{userData?.followers?.length} <span style={{fontSize:'.98rem'}}>followers</span></div>
                        <div style={{width:'fit-content'}}>{userData?.following?.length} <span style={{fontSize:'.98rem'}}>following</span></div>
                        <div style={{width:'fit-content'}}>{data?.length} <span style={{fontSize:'.98rem'}}>posts</span></div>
                    </div>
                   </div>
                    {/* <div style={{ marginTop: 10 }}>
                        Turning dreams into plans. 🚀 | Adventure seeker | Coffee enthusiast ☕
                    </div> */}
                    {userid == userData?._id ? <div style={{marginTop: matches4?'10px': matches3?'':matches2?'10px':''}} className="editbtn" onClick={()=>setOpen(true)}><ModeEditIcon /> Edit Profile</div> : <div style={{ marginTop: 10 ,marginRight:20}}>
                        <Button variant='contained' color='primary' onClick={handleFollowBtn}>
                            {followBtnText}
                        </Button>
                    </div>}

                </div>


            </div>

            <div style={{width:'100%',borderTop:'.2px solid #7f8c8d'}}></div>

            <div style={{display:'flex',justifyContent:'space-between',width:'95%',padding:20,fontSize:'1.2rem',fontWeight:'bold',color:'#34495e'}}>
                <div style={{cursor:'pointer'}} onClick={()=>setStatus('posts')}>Posts</div>
                <div style={{cursor:'pointer'}} onClick={()=>{
                    setFollowersDialogOpen(true)
                    }}>Followers</div>
                <div style={{cursor:'pointer'}} onClick={()=>{
                    setFollowingDialogOpen(true)
                    }}>Following</div>
            </div>

        </div>
                    
            { showPosts() }
             
             <ProfileFollowersComponent followesrDialogOpen={followesrDialogOpen} setFollowersDialogOpen={setFollowersDialogOpen} userData={userData} refresh={refresh} setRefresh={setRefresh} />
             <ProfileFollowingComponent followingDialogOpen={followingDialogOpen} setFollowingDialogOpen={setFollowingDialogOpen} userData={userData} refresh={refresh} setRefresh={setRefresh} />
               
            </Grid>
        {matches3?<></>: <Grid item xs={4} style={{display:'flex',alignItems:"start",flexDirection:'column',paddingTop:15}}>

                <div style={{width:matches1?'98%':'80%',background:'white',textAlign:'start',borderRadius:20,marginBottom:20,display:'flex',alignItems:'center',padding:10}}>
                    <img src={user?.profilepic || "https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg" } style={{width:50,height:50,borderRadius:'50%'}} />
                    <span style={{marginLeft:10,fontSize:'1.02rem',fontWeight:'bold'}}>{user?.username}
                        <div style={{fontSize:'.9rem',fontWeight:'bold',color:'grey'}}>{user?.name}</div>
                    </span>
                    <span style={{flex:1,textAlign:'end',fontWeight:'bold',fontSize:'.8rem',color:'#0095F6',cursor:'pointer'}}>Switch</span>
                </div>

                <div style={{width:matches1?'98%':'80%',background:'white',borderRadius:20,textAlign:'start',padding:20}}>
                    <div style={{fontSize:'1.4rem',fontWeight:600}}>About</div>
                    <div style={{fontSize:'1.1rem',marginTop:10,color:'#676A79'}}>{userData?.bio || "-"}</div>
                    <div style={{fontSize:'1.15rem',color:'#676A79',marginTop:10}}>Born: <span style={{fontSize:'1.03rem',fontWeight:'bold',color:'#676A79'}}>{userData?.dob || "-"}</span></div>
                    <div style={{fontSize:'1.15rem',color:'#676A79',marginTop:10}}>Email: <span style={{fontSize:'1.03rem',fontWeight:'bold',color:'#676A79'}}>{userData?.email || "-"}</span></div>
                    <div style={{fontSize:'1.15rem',color:'#676A79',marginTop:10}}>Gender: <span style={{fontSize:'1.03rem',fontWeight:'bold',color:'#676A79'}}>{userData?.gender || "-"}</span></div>
                </div>

                {/* <div style={{width:'80%',background:'white',borderRadius:20,textAlign:'start',padding:20,marginTop:20}}>
                <div style={{fontSize:'1.4rem',fontWeight:600}}>Links</div>

                <div style={{marginTop:20,width:'100%'}}>
                    <div style={{fontSize:'1.1rem',fontWeight:600,marginBottom:5,color:'#40407a'}}><u>LinkedIn</u></div>
                    <div style={{fontSize:'.94rem',fontWeight:600,color:'#2e86de',textOverflow:'ellipsis',overflow:'hidden'}}>https://www.linkedin.com/in/shubham-rajput-99400b223/</div>
                </div>

                <div style={{marginTop:20,width:'100%'}}>
                    <div style={{fontSize:'1.1rem',fontWeight:600,marginBottom:5,color:'#40407a'}}><u>Instagram</u></div>
                    <div style={{fontSize:'.94rem',fontWeight:600,color:'#2e86de',textOverflow:'ellipsis',overflow:'hidden'}}>https://www.instagram.com/itz_shubham.0255/</div>
                </div>
 

                
                </div> */}
                <div style={{width:matches1?'98%': '80%',background:'white',borderRadius:20,marginTop:'10px',overflow:'hidden',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <CreatePostComponent refresh={refresh} setRefresh={setRefresh} />
                </div>
                <div  style={{width:matches1?'98%':'80%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', marginTop: 15, height: "fit-content",padding:5,borderRadius:20 }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 10, fontWeight: 'bold', textAlign: 'start', width: '90%' }}>Suggestion</div>
                    <Suggestion refresh={refresh} setRefresh={setRefresh} data={suggestionList} />
                </div>
                

            </Grid> }
        </Grid>

                <EditProfileComponent open={open} setOpen={setOpen} data={userData} refresh={refresh} setRefresh={setRefresh} />

               

    </div>)
}