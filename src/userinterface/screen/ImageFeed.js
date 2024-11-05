import { Grid } from "material-ui-core";
import ImageFeedComponent from "../components/ImageFeedComponent";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/fetchnodeservices"
import { useParams } from "react-router-dom";
import BottomNavigationComp from "../components/BottomNavigationComp";
import { useMediaQuery, useTheme } from "@mui/material";
import LoadingPage from "../components/LoadingPage";

export default function ImageFeed({refresh, setRefresh, isLoading, setIsLoading}) {
   
    const [myPosts,setMyPosts]=useState([])
    const [userData,setUserData]=useState([])

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))

    let param = useParams();
    let user = JSON.parse(localStorage.getItem('user'))

    useEffect(function(){
            fetchUserDetails()
            fetchMyPosts()
    },[refresh,param?.userId])

    const fetchUserDetails = async()=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await getData(`auth/get-user-details-by-userid/${param?.userId}`,config)
        // console.log(result)
        if(result?.status == true){
            setUserData(result?.data)
        }
        
    }

    const fetchMyPosts = async ()=>{
    
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        } 
        let result = await getData('post/fetchAllPosts',config)
        if(result?.status == true){
            // console.log("post kaaaa dataaa",result)
            setMyPosts(result.data)
        }
    }

    return ( isLoading? <LoadingPage /> :<div style={{ width: '100%', height:matches4?'auto':'100vh' , background: '#F1F3F4' }}>
        <Grid container  style={{position:'relative'}} >
            <Grid item xs={12} style={{ background: 'white' }}>
                <Header refresh={refresh} setRefresh={setRefresh} />
            </Grid>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', height:matches3?'80vh':'92vh', overflow:'scroll' }}>
                <ImageFeedComponent  data={myPosts} refresh={refresh} setRefresh={setRefresh} />
            </Grid>

            {matches3?   <Grid item xs={12} style={{position:'fixed',top:'95.5%',width:'100%', backgroundColor:'#fff',padding:'5px 0px '}}>

<BottomNavigationComp /> 
</Grid> : <></>}

        </Grid>
    </div>)


}