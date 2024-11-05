import { useEffect, useState } from "react"
import { deleteData, postData } from "../../services/fetchnodeservices"
import { Button, Divider, Grid, Paper } from "material-ui-core";
import "../css/ProfileComponent.css"
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProfileFollowersComponent({userData,refresh,setRefresh,followesrDialogOpen,setFollowersDialogOpen}){
    //  alert(JSON.stringify(userData.followers))
    const [followBtnText, setFollowBtnText] = useState('Follow')
    const [followers,setFollowers]=useState([])

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))

    let navigate = useNavigate()

     useEffect(function(){
        fetchFollowers()
     },[refresh,userData])

     let user = JSON.parse(localStorage.getItem('user'))

     const fetchFollowers = async()=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        let body = {users:userData?.followers}
        let result = await postData('users/fetchusersdetail',body,config)
        // console.log("follower details",result)
        if(result.status == true){
            setFollowers(result.data)
        }
     }

     const handleFollowBtn = async (txt,item) => {
        // console.log(data)
        let token = JSON.parse(localStorage.getItem('token'))
        let body = { friendid: item._id }
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        if (txt == 'follow') {
            // alert("sr")
            let result = await postData('users/addfollowers', body, config)
            user.following.push(item._id)
            localStorage.setItem('user',JSON.stringify(user))
            setRefresh(!refresh)
        } else {
            let result = await postData('users/removefollowers', body, config)
             user.following.splice(user.following.indexOf(item._id),1)
            localStorage.setItem('user',JSON.stringify(user))
            setRefresh(!refresh)
        }
    }

    const handleRemoveFollower = async(followerId)=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        let result =await deleteData(`users/removeFollower/${followerId}`,config)
        if(result?.status == true){
            user.following.splice(user.followers.indexOf(followerId),1)
            localStorage.setItem('user',JSON.stringify(user))
            setRefresh(!refresh)
        }
        // console.log(result)
    }

    const showFollowerList = ()=>{
        return followers?.map((item)=>{
            return  <div style={{width:'100%',background:'white',textAlign:'start',marginBottom:10,display:'flex',alignItems:'center',padding:10    }}>
            <img src={item?.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" } style={{width:40,height:40,borderRadius:'50%'}} />
            <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}>
            <span style={{marginLeft:10,fontSize:'1.2rem',fontWeight:'bold'}} onClick={()=>{
            navigate(`/profile/${item?._id}`)
           }}>{item.username}</span>

            <span style={{marginLeft:10,fontSize:'.9rem',fontWeight:'bold',color:'grey'}}>{item?.name}</span>

            </div>
           
            {/* <span style={{flex:1,textAlign:'end',fontWeight:'bold',fontSize:'1.1rem',color:'#0095F6'}}>Remove</span> */}
           
           {user?._id == userData._id ?  <span style={{marginLeft:'auto',display:'flex'}}>
            <div className="editbtn" onClick={()=>handleRemoveFollower(item?._id)}>Remove</div>
              {user?.following?.includes(item?._id) ?  <></> : <div   className="followbtn" onClick={()=>handleFollowBtn('follow',item)} style={{marginLeft:20}}>
                    follow
                </div> }
            </span> :  <div style={{ marginLeft:'auto',display:'flex'}}>
            <div className="editbtn">Remove</div>
                        <Button variant='contained' color='primary' >
                            {followBtnText}
                        </Button>
                    </div>}
        </div>
        })
      
    }

    return  <Dialog open={followesrDialogOpen} onClose={()=>setFollowersDialogOpen(false)} fullWidth={true} maxWidth={matches4?'':'xs'} fullScreen={matches4}>
                    <DialogContent style={{ padding: 0 }}>
     <div style={{ display: 'flex',maxHeight:500, flexDirection:'column', flexWrap: 'wrap', marginTop: 10, width: '96%',background:'white',borderRadius:20,alignItems:'center',overflow:'scroll'}}>
     {matches4? <div style={{
                        position:'absolute',
                        top:'0px',
                        left:'0px',
                        cursor:'pointer',
                        color: 'black'
                    }} onClick={()=>{setFollowersDialogOpen(false)}}> 
                     <ArrowBackIcon  />
                     </div> :<></>}
         {matches4? <></> : <div style={{
                        position:'absolute',
                        top:'0px',
                        right:'0px',
                        cursor:'pointer',
                        color: 'black'
                    }} onClick={()=>{setFollowersDialogOpen(false)}}> 
                     <CloseIcon  />
                     </div> }
    <div style={{fontWeight:'bold',fontSize:'1.5rem',width:'90%',textAlign:'start',padding:20}}>
        Followers
    </div>

    <div style={{width:'100%'}}>
        {showFollowerList()}
    </div>
    </div>
    </DialogContent>
    </Dialog>
}