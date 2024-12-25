import React, { useEffect, useRef, useState } from "react";
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
    // const [limit, setLimit] = useState(2)
    // const [skip, setSkip] = useState(0)
    // const [caption, setCaption] = useState('')
    // const [postimg, setPostimg] = useState('')
    // const [open, setOpen] = useState(false)

    let limit = 10
    let skip = 0

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))
    const matches6 = useMediaQuery(theme.breakpoints.down(1200))

    let user = JSON.parse(localStorage.getItem('user'))

    const notifyA = (msg)=>toast.error(msg)
    const notifyB = (msg)=>toast.success(msg)

    const containerRef = useRef(null);
    const fetchCalled = useRef(false);

    useEffect(function () {
        if (!fetchCalled.current) {
            fetchAllPosts();
            fetchAllUsers();
            fetchCalled.current = true;
            setIsLoading(false)
        }
        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
          }
          return () => {
            if (container) {
              container.removeEventListener("scroll", handleScroll);
            }
          };
    }, [refresh])
    
    const handleScroll = ()=>{
        // alert("call")
        const container = containerRef.current;
        if( container.scrollTop + container.clientHeight >= container.scrollHeight - 10){
            // setLimit(limit+2)
            // setSkip(skip+2)
            skip = skip + 10
            fetchAllPosts()
        }
    }

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
        let result = await getData(`post/fetchAllPosts?limit=${limit}&skip=${skip}`, config)

        if (result?.status == true) {
            setIsLoading(false)
            setPostDataList((data)=>[...data, ...result?.data])
        } else {
            setIsLoading(false)
        }

        let postedbyyou = result?.data?.filter((item) => {
            return item.postedby?._id === user._id
        })
        // console.log("post which is post by you : ", postedbyyou)
        setPostByYou(postedbyyou)
        // console.log("end")
        
    }

    const fetchAllPostsbyChanges = async () => {

         let token = JSON.parse(localStorage.getItem('token'))
         let config = {
             headers: {
                 Authorization: `Bearer ${token}`,
             }
         }
         let user = JSON.parse(localStorage.getItem('user'))
         let body = { user: user }
         let result = await getData(`post/fetchAllPosts?limit=${skip+0}&skip=0`, config)
 
         if (result?.status == true) {
             setPostDataList(result?.data)
         }
 
         let postedbyyou = result?.data?.filter((item) => {
             return item.postedby?._id === user._id
         })
         // console.log("post which is post by you : ", postedbyyou)
         setPostByYou(postedbyyou)
         // console.log("end")
     }
console.log("pppppppppppppp",users,users?.length)
    const showPosts = () => {
        return postDataList.map((item) => {
            return <div style={{ marginBottom: '1rem', width: '94%' }}  >
                <PostComponent data={item} refresh={refresh} setRefresh={setRefresh} fetchAllPosts={fetchAllPostsbyChanges} />
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

            {matches3?<></>: <Grid item xs={matches2?5.5:matches6?4.8:3.5} style={{ display: 'flex', justifyContent: 'end', background: 'fixed',marginTop:'90px'}}>
                    <HomeProfile followers={user.followers.length} following={user.following.length} noOfposts={postByYou?.length} username={user.username} />

                </Grid> }

                <Grid item xs={matches5?12:matches4?10:matches3?8:matches6?6:4.5} className="filter-scrollbar" style={{ overflow: 'auto', height: matches3?'82vh':'85vh', display: 'flex', flexWrap: 'wrap' ,justifyContent:'center',marginTop:'90px'}} ref={containerRef} >

                    <CreatePostComponent refresh={refresh} setRefresh={setRefresh} setIsLoading={setIsLoading} fetchAllPosts={fetchAllPostsbyChanges} />

                    {showPosts()}
                </Grid>
  {users?.length >=2 ?  matches6 ? <></>:   <Grid item xs={2.7} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', marginTop: 15, height: "fit-content",marginTop:'105px' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 500, marginBottom: 10, fontWeight: 'bold', textAlign: 'start', width: '90%' }}>Who to follow</div>
                    <Suggestion data = {users} refresh={refresh} setRefresh={setRefresh}/>
                </Grid> : <></> }

                {/* {matches3?   <Grid item xs={12} style={{position:'absolute',top:'92%',width:'100%', backgroundColor:'#fff'}}>

                <BottomNavigationComp /> 
                </Grid> : <></>} */}

              
            </Grid>
            {/* {showDialog()} */}
            
            
               
        </div>
    )
}