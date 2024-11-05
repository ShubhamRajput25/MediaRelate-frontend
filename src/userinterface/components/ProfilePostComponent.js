import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import '../css/ProfilePostComponent.css'
import { deleteData, postData } from '../../services/fetchnodeservices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dialog, DialogContent } from 'material-ui-core';
import CommentSection from './CommentSection';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { useMediaQuery, useTheme } from '@mui/material';
export default function ProfilePostComponent({data,refresh,setRefresh}){
    const [comment, setComment] = useState('')
    const [open, setOpen] = useState(false)

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1100))
    const matches2 = useMediaQuery(theme.breakpoints.down(1000))
    const matches3 = useMediaQuery(theme.breakpoints.down(908))
    const matches4 = useMediaQuery(theme.breakpoints.down(700))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))
    const matches6 = useMediaQuery(theme.breakpoints.down(370))
    let navigate = useNavigate()

    let user = JSON.parse(localStorage?.getItem('user'))
    let userid = user?._id  

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

            const handleAddComments = async () => {
                let token = JSON.parse(localStorage.getItem('token'))
                let body = { id: data._id, comment: comment, username: user.username }
                let config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                let result = await postData('post/addcomments', body, config)
                if (result.status == true) {
                    notifyB("Add Comment sucessfully")
                } else {
                    notifyA("error")
                }
                setComment(' ')
                setRefresh(!refresh)
        
            }

            const handleDeletePost = async()=>{
                let token = JSON.parse(localStorage.getItem('token'))
                let config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                Swal.fire({
                    title: "Are you sure to delete this Post?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: 'red',
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                        let result = await deleteData(`post/deletePost/${data?._id}`,config)
                        if (result.status == true) {
                            notifyB(result?.message)
                        } else {
                            notifyA(result?.message)
                        }
                        setRefresh(!refresh)
              
                    }
                  });
               
            }

            const handleClose = () => {
                setOpen(false)
            }

            const handleOpenCommentDialog = () => {
                return <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={matches4?'':'md'} fullScreen={matches4}>
                    <DialogContent style={{ padding: 0 }}>
                        <CommentSection data = {data} handleLikes={handleLikes} handleAddComments={handleAddComments} comment={comment} setComment={setComment} open={open} setOpen={setOpen} handleDeletePost={handleDeletePost} />
                    </DialogContent>
                </Dialog>
            }
     

   
   
   return  <div style={{ cursor:'pointer',height:'100%'}} >
                 <div style={{ width: '100%',height:matches6?'140px':matches5?'150px':'197px', borderRadius:10,objectFit:'cover',overflow:'hidden' }} >
                 {data.video ? (
                     <video
                     autoPlay
                     muted
                     loop
                     style={{ width: '100%',height:'100%', cursor: 'pointer' ,objectFit:'cover' }}
                     onClick={()=>{
                        setOpen(true)
                        }}
                 >
                     <source src={data.video} type="video/mp4" />
                     Your browser does not support the video tag.
                 </video>
                ) : (
                <img src={data.picture} style={{ width: '100%', height: '100%' ,objectFit:'cover'}}  onClick={()=>{
                                setOpen(true)
                                }}  />
                            )}
                </div>

                {/* <div style={{width:'100%',display:'flex',justifyContent:'start',zIndex:2,marginLeft:15,marginBottom:'30px'}}>
                    <FavoriteIcon style={{color:'red',marginRight:4}} />  <span style={{margin:3,fontWeight:'bold',fontSize:'.9rem'}}>{data.likes?.length}</span>
                    <ChatIcon style={{marginLeft:10}}/> <span style={{margin:3,fontWeight:'bold',fontSize:'.9rem'}}>{data.comments?.length}</span>
                    </div> */}  
                  {handleOpenCommentDialog()}
            </div>
             

}