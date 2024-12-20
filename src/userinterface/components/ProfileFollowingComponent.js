import { useEffect, useState } from "react"
import { deleteData, postData } from "../../services/fetchnodeservices"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, useMediaQuery, useTheme } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProfileFollowingComponent({userData,refresh,setRefresh,followingDialogOpen,setFollowingDialogOpen}){
    //  alert(JSON.stringify(userData.followers))
    const [following,setFollowing]=useState([])
    let user = JSON.parse(localStorage.getItem('user'))
    let navigate = useNavigate()

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))

     useEffect(function(){
        fetchFollowing()
     },[refresh,userData])

     const fetchFollowing = async()=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        let body = {users:userData?.following}
        let result = await postData('users/fetchusersdetail',body,config)
        if(result.status == true){
            setFollowing(result.data)
        }
     }

     const handleRemoveFollowing = async(followingId)=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
        let result =await deleteData(`users/unfollow/${followingId}`,config)
        if(result?.status == true){
            user.following.splice(user.following.indexOf(followingId),1)
            localStorage.setItem('user',JSON.stringify(user))
            setRefresh(!refresh)
        }
        // console.log(result)
    }

    const showFollowingList = ()=>{
            if(following?.length >=1){
        return following?.map((item)=>{
            return  <div style={{width:'100%',background:'white',textAlign:'start',marginBottom:10,display:'flex',alignItems:'center',padding:10, paddingRight:0}}>
            <img src={item?.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" } style={{width:40,height:40,borderRadius:'50%'}} />
            <div style={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center'
            }}>
            <span style={{marginLeft:10,fontSize:'1.2rem',fontWeight:'bold'}} onClick={()=>{
            navigate(`/profile/${item?._id}`)
            setFollowingDialogOpen(false)
           }}>{item.username}</span>

            <span style={{marginLeft:10,fontSize:'.9rem',fontWeight:'bold',color:'grey'}}>{item?.name}</span>

            </div>
           
            {/* <span style={{flex:1,textAlign:'end',fontWeight:'bold',fontSize:'1.1rem',color:'#0095F6'}}>Remove</span> */}
           
           <span style={{marginLeft:'auto',display:'flex'}}>
            <div className="editbtn"  onClick={()=>handleRemoveFollowing(item?._id)}>UnFollow</div>
     
            </span> 
        </div>
       
        })
    }else{
        return <div style={{
            width:'100%',
            height:'100px',
            fontSize:'1.2rem',
            fontWeight:'bold',
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
        }}>NONE</div>
    }
      
    }

    return <Dialog open={followingDialogOpen} onClose={()=>setFollowingDialogOpen(false)} fullWidth={true} maxWidth={matches4?'':'xs'} fullScreen={matches4}>
                    <DialogContent style={{ padding: 0 }}>
    <div style={{ display: 'flex',maxHeight:500, flexDirection:'column', flexWrap: 'wrap', marginTop: 10, width: '96%',background:'white',borderRadius:20,alignItems:'center',overflow:'scroll'}}>
  {matches4? <div style={{
                        position:'absolute',
                        top:'0px',
                        left:'0px',
                        cursor:'pointer',
                        color: 'black'
                    }} onClick={()=>{setFollowingDialogOpen(false)}}> 
                     <ArrowBackIcon  />
                     </div> :<></>}
         {matches4? <></> : <div style={{
                        position:'absolute',
                        top:'0px',
                        right:'0px',
                        cursor:'pointer',
                        color: 'black'
                    }} onClick={()=>{setFollowingDialogOpen(false)}}> 
                     <CloseIcon  />
                     </div> }
    <div style={{fontWeight:'bold',fontSize:'1.5rem',width:'90%',textAlign:'start',padding:0}}>
        Following
    </div>

    <div style={{width:'100%'}}>
        {showFollowingList()}
    </div>
    </div>
    </DialogContent>
    </Dialog>
}