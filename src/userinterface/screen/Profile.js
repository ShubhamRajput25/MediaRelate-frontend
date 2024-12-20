import { Grid } from "material-ui-core"
import ProfileComponent from "../components/ProfileComponent"
import Header from "../components/Header"
import { useEffect, useRef, useState } from "react"
import { getData, postData } from "../../services/fetchnodeservices"
import { useLocation, useParams } from "react-router-dom"
import coverTempPhoto from "../../img/coverTempPhoto.jpg"
import LoadingPage from "../components/LoadingPage"
export default function Profile({refresh, setRefresh, isLoading, setIsLoading}){
   
    const [myPosts,setMyPosts]=useState([])
    const [userData,setUserData]=useState([])
   
   
    let param = useParams();
    let user = JSON.parse(localStorage.getItem('user'))

    let fetchCalled = useRef(false)

    useEffect(function(){
            if(!fetchCalled.current){
            setIsLoading(true)
            fetchCalled.current = true
        }
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
        let body = {userid:param?.userId}
        let result = await postData('post/fetchPostsByUserid',body,config)
        if(result.status == true){
            setMyPosts(result.data)
        }
       
        setIsLoading(false)
    }

    return (isLoading? <LoadingPage /> :<div style={{width:'100%',background:'#F1F3F4'}}>
            <Grid container >
            <Grid item xs={12} style={{background:'white'}}>
                <Header refresh={refresh} setRefresh={setRefresh}/>
            </Grid>
           
                <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
                    <ProfileComponent userData={userData} data={myPosts} refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading}  />
                </Grid>

            </Grid>
        </div>)
}