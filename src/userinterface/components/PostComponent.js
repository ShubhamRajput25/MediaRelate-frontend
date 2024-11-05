import React, { useEffect, useRef, useState } from "react";
import Grid from '@mui/material/Grid';
import { getData, postData, serverurl } from "../../services/fetchnodeservices";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Badge, Button, Checkbox, Dialog, DialogContent, Divider } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import commentIcon from "../../img/commentIcon.webp"
import sendIcon from "../../img/sendIcon.png"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { toast } from "react-toastify";
import "../css/PostComponent.css"
import { useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDate } from "../../Constant";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useMediaQuery, useTheme } from "@mui/material";

export default function PostComponent({ data, refresh, setRefresh }) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [postedByInfo, setPostedByInfo] = useState({})
    const [followBtnText, setFollowBtnText] = useState('Follow')
    const [comment, setComment] = useState('')
    const [open, setOpen] = useState(false)
    const [openMenu,setOpenMenu]=useState(false)
    const [currentPage,setCurrentPage]=useState(1)
    const [commentDataList,setCommentDataList]=useState([])
    let navigate = useNavigate()
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))


    let user = JSON.parse(localStorage.getItem('user'))
    let userid = user._id

    useEffect(function(req,res,next){
        fetchCommentByPost()
        if(user.following?.includes(data.postedby)){
            setFollowBtnText('Unfollow')
        }
    },[data?._id,refresh])

    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg) 

    const handleLikes = async (e) => {
        // console.log(data)
        let token = JSON.parse(localStorage.getItem('token'))
        let body = { id: data._id }
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        if (e.target.checked) {
            let result = await postData('post/addlikes', body, config)
            setRefresh(!refresh)
        } else {
            let result = await postData('post/removelikes', body, config)
            setRefresh(!refresh)
        }
    }

    const handleFollowBtn = async () => {
        // console.log(data)
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
            localStorage.setItem('user',JSON.stringify(user))
            setRefresh(!refresh)
        } else {
            let result = await postData('users/removefollowers', body, config)
            setFollowBtnText('Follow')
             user.following.splice(user.following.indexOf(data.postedby),1)
            localStorage.setItem('user',JSON.stringify(user))
            setRefresh(!refresh)
        }
    }

    const handleAddComments = async () => {
        let token = JSON.parse(localStorage.getItem('token'))
        let body = { postId: data?._id, comment: comment}
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await postData('post/addcomments', body, config)
        if (result.status == true) {
            notifyB("Add Comment sucessfully")
            setRefresh(!refresh)
        } else {
            notifyA("error")
        }
        setComment(' ')
        setRefresh(!refresh)

    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpenCommentDialog = () => {
        return <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={matches4?'':'md'} fullScreen={matches4}>
            <DialogContent style={{ padding: 0 }}>
                <CommentSection data = {data} handleLikes={handleLikes} handleAddComments={handleAddComments} comment={comment} setComment={setComment} setOpen={setOpen} open={open} commentDataList={commentDataList} refresh={refresh} setRefresh={setRefresh} />
            </DialogContent>
        </Dialog>
    }

    const fetchCommentByPost = async()=>{
        let token = JSON.parse(localStorage.getItem('token'))
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        let result = await postData(`post/fetch-comment-by-post?pageNumber=${currentPage}`,{postId:data?._id},config)
        // console.log("ooooooooooooooooooooooooo",result)
        if(result?.status == true){
            setCommentDataList(result?.data)
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

    const handlePostMenu = ()=>{
        return <div className="menu" >
            <div>delete</div>
        </div>
    }
// console.log("ddddddddaaaaaaaaaaaatttttttttttaaaaaaaaaa",data)
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', background: 'white', padding: 10 }}>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', background: '', marginBottom: 5 }}>
            <div style={{ width: '60%', display: 'flex', background: '', alignItems: 'center' }}>
                <Avatar
                    src={userid === data.postedby?._id ? user.profilepic : data.postedby?.profilepic || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"} 
                    style={{width:'40px',height:'40px' }} 
                />
                <div style={{ marginLeft: 8 }}>
                    <div 
                        style={{ fontSize: '.78rem', fontWeight: 700, cursor: 'pointer' }} 
                        onClick={() => navigate(`/profile/${data?.postedby?._id}`)}
                    >
                        {data.postedby?.username} 
                        
                        <div style={{ fontWeight: 400, fontSize: '.8rem',textAlign:'start' }}>{formatDate(data?.createdAt)}</div>
                    </div>
                </div>
            </div>
            {/* {console.log("userid === data.postedby",userid,data)} */}
            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', position: 'relative' }}>
                {userid === data.postedby?._id ? null : <div className="follow-btn" onClick={handleFollowBtn}>{followBtnText}</div>}
                <span style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <MoreVertIcon style={{ fontSize: 18 }} onClick={() => setOpenMenu(!openMenu)} />
                </span>
                {openMenu ? handlePostMenu() : null}
            </div>
        </div>
    
        <div>
            {/* Conditionally Render Image or Video */}
            <div style={{ width: '100%' }}>
                {data.video ? (
                     <div style={{ position: 'relative', width: '100%' }}>
                     <video
                     ref={videoRef}
                     autoPlay
                     muted={isMuted}
                     loop
                     style={{ width: '100%', cursor: 'pointer' }}
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
                    <img src={data.picture} style={{ width: '100%' }} />
                )}
            </div>
    
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    {data?.likes?.includes(userid) ? 
                        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleLikes} checked={true} /> : 
                        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} onClick={handleLikes} />
                    }
                    <div style={{ fontSize: '1.05rem', fontWeight: 'bold' }}>{data?.likes?.length}</div>
                    <Badge badgeContent={commentDataList?.length} color="secondary">
                        <img src={commentIcon} style={{ width: '27px', marginLeft: 7, cursor: 'pointer' }} onClick={() => setOpen(true)} />
                    </Badge>
                </div>
            </div>
    
            <div style={{ width: '100%' }}>
                <div style={{ fontSize: '.84rem', textAlign: 'start', marginBottom: 3 }}>{data.body}</div>
                <div 
                    style={{ fontSize: '.74rem', textAlign: 'start', fontWeight: 'bold', color: '#6ab04c', cursor: 'pointer', marginBottom: 3 }} 
                    onClick={() => setOpen(true)}
                >
                    See comments...
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ fontSize: '.9rem', width: '100%', textAlign: 'start', display: 'flex', justifyContent: 'space-between' }}>
                        <input 
                            type="text" 
                            placeholder="Add Comment" 
                            style={{ padding: 5, fontSize: '.9rem', border: 'none', outline: 'none', background: 'transparent', width: '85%' }} 
                            onChange={(e) => setComment(e.target.value)} 
                            value={comment} 
                        />
                        <div 
                            style={{ marginRight: 5, fontSize: '.9rem', fontWeight: 'bold', color: '#0abde3', cursor: 'pointer' }} 
                            onClick={handleAddComments}
                        >
                            Post
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        {handleOpenCommentDialog()}
    </div>
    
    )
}