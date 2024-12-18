import { useNavigate } from "react-router-dom"
import { Avatar, Badge, Button, Checkbox, Dialog, DialogContent, Divider } from "material-ui-core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import commentIcon from "../../img/commentIcon.webp"
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from "../../Constant";

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { postData } from "../../services/fetchnodeservices";
import { toast } from "react-toastify";

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CommentSection({data, handleLikes,comment,setComment,open,setOpen,handleDeletePost, commentDataList, refresh, setRefresh, fetchCommentByPost, fetchCalled}){
    // const [comment, setComment] = useState('')
    const [replyCommentData,setReplyCommentData]=useState({
        id:'',
        replyTo:'',
        username:''
    })
    const [replyStatus,setReplyStatus]=useState(false)
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    let navigate = useNavigate()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    let user = JSON.parse(localStorage.getItem('user'))
    let userid = user._id
    // console.log("comment data : ",commentDataList)

    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg) 

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))

    const handleAddComments = async () => {
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        if(replyStatus){
            let body = {commentId:replyCommentData?.id,replyTo:replyCommentData?.replyTo, reply:comment}
            // console.log("body...........",body)
            let result = await postData('post/add-reply-on-comment', body, config)
            if (result?.status == true) {
                notifyB("Add reply sucessfully")
            } else {
                notifyA("error")
            }

            setReplyStatus(false)
            setComment(' ')
            setRefresh(!refresh)
            fetchCalled.current = false;
        }else{
           
            let body = { postId: data?._id, comment: comment}
           
            let result = await postData('post/addcomments', body, config)
            if (result?.status == true) {
                notifyB("Add Comment sucessfully")
                setRefresh(!refresh)
            } else {
                notifyA("error")
            }
            setComment(' ')
            setRefresh(!refresh)
            fetchCalled.current = false;
        }
        

    }

    const handleLikeComment = async(item)=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await postData(`post/like-comment`,{commentId:item?._id},config)
        if(result?.status == true){
            setRefresh(!refresh)
            fetchCalled.current = false;
        }
    }

    const handleUnLikeComment = async(item)=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await postData(`post/unlike-comment`,{commentId:item?._id},config)
        if(result?.status == true){
            setRefresh(!refresh)
            fetchCalled.current = false;
        }
    }

    const handleLikeReply = async(item)=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await postData(`post/like-reply`,{replyId:item?._id},config)
        if(result?.status == true){
            setRefresh(!refresh)
            fetchCalled.current = false;
        }
    }

    const handleUnLikeReply = async(item)=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await postData(`post/unlike-reply`,{replyId:item?._id},config)
        if(result?.status == true){
            setRefresh(!refresh)
            fetchCalled.current = false;
        }
    }

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };


    return <div style={{ width: '100%', height: matches4?'auto':'578px', display: 'flex',position:'relative', flexDirection:matches4?'column':'row' }}>
                {matches4? <div style={{
                        position:'absolute',
                        top:'0px',
                        left:'0px',
                        cursor:'pointer',
                        color: matches4?'#0984e3':'black'
                    }} onClick={()=>{setOpen(false)}}> 
                     <ArrowBackIcon  />
                     </div> :<></>}
         {matches4? <></> : <div style={{
                        position:'absolute',
                        top:'0px',
                        right:'0px',
                        cursor:'pointer',
                        color: matches4?'#0984e3':'black'   
                    }} onClick={()=>{setOpen(false)}}> 
                     <CloseIcon  />
                     </div> }
    <div style={{ width: matches4?'100%':'40%', borderRight: '1px solid #95afc0',display:'flex',alignItems:'center',justifyContent:'center' }}>
    {data.video ? (
                     <div style={{ position: 'relative', width: '100%' }}>
                     <video
                     ref={videoRef}
                     autoPlay
                     muted={isMuted}
                     loop
                     style={{ width: '100%', cursor: 'pointer', height:'100%' }}
                     onClick={handlePlayPause} // Single-click to play/pause
                    
                 >
                     <source src={data.video} type="video/mp4" />
                     Your browser does not support the video tag.
                 </video>
                  <div
                  onClick={toggleMute}
                  style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      cursor: 'pointer',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                      padding: '5px',
                      display:'flex',
                      justifyContent:'center',
                      alignItems:'center'
                  }}
              >
                  {isMuted ? (
                      <VolumeOffIcon style={{ color: 'white', fontSize:'1rem' }} />
                  ) : (
                      <VolumeUpIcon style={{ color: 'white', fontSize:'1rem' }} />
                  )}
              </div>
          </div>
                ) : (
        <img src={data?.picture} style={{ width: '100%', height: '100%' }} />
    )}
    </div>
    <div style={{ width: matches4?'100%':'60%', display: 'flex', flexDirection: 'column',alignItems:'center',height:'100%' }}> 

        <div style={{width:'95%',display: 'flex', flexDirection: 'column',height:'75%'}}>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: '', marginBottom: 5 ,borderBottom: '1px solid #95afc0',paddingBottom:10,paddingTop:3,alignItems:'start'}}>
                <div style={{ width: '60%', display: 'flex', alignItems:'start' }}>

                    <Avatar src={userid == data?.postedby?._id ? user?.profilepic : data?.postedby?.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"} style={{width:'40px',height:'40px' }} />

                    <div style={{ marginLeft: 8 }}>
                        <div style={{ fontSize: '.78rem', fontWeight: 700,cursor:'pointer' }} onClick={()=>{
                     navigate(`/profile/${data?.postedby?._id}`)
                    }}>{data?.postedby?.username} <span style={{ fontSize: '.9rem', color: 'grey' }}>. 9h</span>
                    </div>
                    <div style={{ fontSize: '.78rem', fontWeight: 700 }}>{data?.postedby?.name}</div>
                    </div>

                </div>
              {userid == data?.postedby?._id ?  <DeleteIcon style={{
                        marginLeft:'auto',
                        marginRight:'5%',
                        cursor:'pointer'
                    }} onClick={()=>{
                        setOpen(false)
                        handleDeletePost()
                    }} /> :<></>}
            </div>

            <div style={{ flexGrow: 4,overflow:'scroll', height:'279px' }}  >
                
                {commentDataList?.map((item) => {
                    
                    return <div style={{ marginTop: 10,display:'flex',alignItems:'center',width:'fit-content',marginLeft:'',padding:10,flexDirection:'column' }}>
                        <div style={{display:'flex',flexDirection:'row',alignItems:'start'}}>

                        <span style={{marginRight:7,width:'30px',marginTop:5,height:'30px'}}><Avatar src={item?.postedby?.profilepic || "https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg" } style={{width:'100%',height:'100%'}} /></span>

                        <span >
                        <div style={{fontSize: '.9rem',color:'#2e3030',marginRight:5 ,cursor:'pointer',fontWeight:500}} onClick={()=>{
                     navigate(`/profile/${item?.postedby?._id}`)
                    }} >{item?.postedby?.username} : <span style={{fontWeight:400,fontSize:'.8rem'}}>{formatDate(item?.createdAt)}</span> </div> 

                         <div style={{display:'flex',alignItems:'center'}}>
                        <span style={{color:'black',opacity:4,fontSize:'.9rem',fontWeight:500}}>{item?.comment}</span> 
                        </div>

                        <div style={{
                            display:'flex',
                            alignContent:'end',
                            // gap:'10px',
                            fontSize:'.9rem'
                        }}>
                           {item?.likes?.includes(userid)? <ThumbUpAltIcon style={{fontSize:'1.2rem',cursor:'pointer'}} onClick={()=>handleUnLikeComment(item)} /> : <ThumbUpOffAltIcon style={{fontSize:'1.2rem',cursor:'pointer'}} onClick={()=>handleLikeComment(item)} /> }
                         {item?.likes?.length>0 ? <span style={{marginLeft:'2px',color:'#34495e',fontWeight:'bold',fontSize:'.85rem'}}>{item?.likes?.length}</span> : <></>}
                            <span style={{
                                marginLeft:'10px',
                                cursor:'pointer',
                                color:'#8e44ad'
                            }}
                            onClick={()=>{
                                setReplyCommentData((prev)=>{
                                    return {
                                        ...prev,
                                        id:item?._id,
                                        replyTo:item?.postedby?._id,
                                        username:item?.postedby?.username
                                    }
                                })
                                setReplyStatus(true)
                            }}
                            >reply</span> 
                            {item?.replies?.length >0 ? <span style={{marginLeft:'5px',color:'#34495e',fontWeight:'bold',fontSize:'.85rem'}}>{item?.replies?.length}</span>:<></>}
                        </div>

                    {item?.replies?.length > 0 ?  <div>
                        <Accordion  style={{
                            boxShadow:"none",
                            padding:'0px'
                        }}>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
         style={{padding:'0px',fontSize:'.8rem',fontWeight:500,color:'#2980b9'}}
        >
          see replies <ExpandMoreIcon style={{fontSize:'1.2rem'}} />
        </AccordionSummary>
        <AccordionDetails style={{
            padding:'0px'
        }}>
         {item?.replies?.map((rpy,index)=>{
            return <div style={{ marginTop: 10,display:'flex',alignItems:'center',width:'fit-content',marginLeft:'',padding:10,flexDirection:'column' }}>
            <div style={{display:'flex',flexDirection:'row',alignItems:'start'}}>

            <span style={{marginRight:7,width:'30px',marginTop:5,height:'30px'}}><Avatar src={rpy?.replyBy?.profilepic || "https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg" } style={{width:'100%',height:'100%'}} /></span>

            <span >
            <div style={{fontSize: '.9rem',color:'#2e3030',marginRight:5 ,cursor:'pointer',fontWeight:500}} onClick={()=>{
         navigate(`/profile/${item?.postedby?._id}`)
        }} >{rpy?.replyBy?.username} : <span style={{fontWeight:400,fontSize:'.8rem'}}>{formatDate(rpy?.createdAt)}</span> </div> 

             <div style={{display:'flex',alignItems:'center'}}>
            <span style={{color:'black',opacity:4,fontSize:'.9rem',fontWeight:500}}><span style={{fontSize:'.75rem',fontWeight:400,color:'#2980b9',marginRight:'5px'}}>@{rpy?.replyTo?.username}</span>{rpy?.reply}</span> 
            </div>

            <div style={{
                display:'flex',
                alignContent:'center',
                // gap:'10px',
                fontSize:'.9rem'
            }}>
               {rpy?.likes?.includes(userid)? <ThumbUpAltIcon style={{fontSize:'1.2rem',cursor:'pointer'}} onClick={()=>handleUnLikeReply(rpy)} /> : <ThumbUpOffAltIcon style={{fontSize:'1.2rem',cursor:'pointer'}} onClick={()=>handleLikeReply(rpy)} /> }
             {rpy?.likes?.length>0 ? <span style={{marginLeft:'2px'}}>{rpy?.likes?.length}</span> : <></>}
                <span style={{
                    marginLeft:'10px',
                    cursor:'pointer'
                }}
                onClick={()=>{
                    setReplyCommentData((prev)=>{
                        return {
                            ...prev,
                            id:item?._id,
                            replyTo:rpy?.replyBy?._id,
                            username:rpy?.replyBy?.username
                        }
                    })
                    setReplyStatus(true)
                }}
                >reply</span>
            </div>
            
            </span>

            </div> 
           
            </div>
         })}
        </AccordionDetails>
      </Accordion>
                        </div> : <></>}

                        </span>

                        </div> 
                       
                        </div>
                })}
            </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center',boxShadow:'0px 0px 1px #bdc3c7',width:'100%',flexDirection:'column',paddingTop:'5px',paddingBottom:'5px', }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start',width:'94%', }}>
                {data?.likes?.includes(userid) == true ? <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleLikes} checked={true} /> : <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleLikes} />}

                <Badge badgeContent={commentDataList?.length} color='secondary' >
                <img src={commentIcon} style={{ width: '27px', marginLeft: 7,cursor:'pointer' }} onClick={() => setOpen(true)} />
            </Badge>
            </div>
            <div style={{ fontSize: '.8rem', fontWeight: 'bold',width:'90%',textAlign:'start' }}>{data?.likes?.length} likes</div>

            <div style={{ fontSize: '.8rem',width:'90%',textAlign:'start',color:'#7f8c8d',fontWeight:200,marginTop:'5px' }}>{formatDate(data?.createdAt)}</div>
           </div>

        <div style={{ fontSize: '.9rem', width: '100%', textAlign: 'start', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #95afc0',paddingTop:10,paddingBottom:5,position:'relative'}}>
                {replyStatus?<span style={{fontSize:'.75rem',fontWeight:400,color:'#2980b9',marginRight:'5px'}}>@{replyCommentData?.username}</span>:<></>}
                <input type='text' placeholder={replyStatus?'Add Reply':'Add Comment'} style={{ padding: 5, fontSize: '.9rem', border: 'none', outline: 'none', background: 'transparent', width: '85%' }} onChange={(e) => setComment(e.target.value)} value={comment} onKeyPress={(e)=>{if (e.key == 'Enter') {
                                           handleAddComments()
                                        }}} />
                <div style={{ marginRight: 5, fontSize: '.9rem', fontWeight: 'bold', color: '#0abde3', cursor: 'pointer' }} onClick={handleAddComments}    >post</div>
            </div>

    </div>
</div>
}