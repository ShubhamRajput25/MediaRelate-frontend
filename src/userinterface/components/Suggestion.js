import { Button, IconButton } from "@mui/material"
import image from "../../img/profileTempPostImg.webp"
import "../css/Suggestion.css"
import AddIcon from '@mui/icons-material/Add';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { postData } from "../../services/fetchnodeservices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
export default function Suggestion({data,refresh,setRefresh}){
    const [followStatus,setFollowStatus]=useState(false)

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1100))
    const matches2 = useMediaQuery(theme.breakpoints.down(1000))
    const matches3 = useMediaQuery(theme.breakpoints.down(908))
    const matches4 = useMediaQuery(theme.breakpoints.down(700))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))

    let navigate = useNavigate()


    let user = JSON.parse(localStorage.getItem('user'))
    let userid = user._id

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

   

    const showSuggestionList = ()=>{
        // console.log(data.length)
        return data?.map((item)=>{
            return user._id == item._id ? <></>: <div style={{display:'flex',width:'97%',fontSize:'1rem',marginBottom:5,borderRadius:20,paddingTop:3,paddingBottom:3,paddingRight:0}}>
           
            <div style={{width:'47px',height:'47px',borderRadius:'50%',display:'flex',alignItems:'center',objectFit:'fill',backgroundColor:'green'}}> <img src={item.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"} style={{width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'}}/> </div>


            <div style={{marginLeft:'10px',display:'flex',alignItems:'center',fontWeight:'bolder',cursor:'pointer'}}
           onClick={()=>{
            navigate(`/profile/${item?._id}`)
           }}
            >{item.username}</div>

            <div style={{display:'flex',alignItems:'center',marginLeft:'auto'}}>

                {user.following?.includes(item._id)?<IconButton onClick={()=>handleFollowBtn('unfollow',item)}>
            <PersonRemoveIcon  color="primary" style={{background:'#E7F1FD',padding:5,borderRadius:'50%',fontSize:'2rem'}}/> 
            </IconButton>:<IconButton onClick={()=>handleFollowBtn('follow',item)}>
            <AddIcon  color="primary" style={{background:'#E7F1FD',padding:5,borderRadius:'50%',fontSize:'2rem'}}/> 
            </IconButton>}
            
 
            </div>
        </div>
        })
                
    }

    return (<div className="s-container">
       
        <div className="list-box">{showSuggestionList()}</div>
    </div>)
}