import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';
import '../css/ProfilePostComponent.css'
import { deleteData, postData } from '../../services/fetchnodeservices';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dialog, DialogContent } from 'material-ui-core';
import CommentSection from './CommentSection';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { useMediaQuery, useTheme } from '@mui/material';

export default function ImageFeedPostComponent({data,refresh, setRefresh}){
    const [comment, setComment] = useState('')
    const [open, setOpen] = useState(false)
    const [commentDataList,setCommentDataList]=useState([])
    const [currentPage,setCurrentPage]=useState(1)

    let navigate = useNavigate()

    let user = JSON.parse(localStorage?.getItem('user'))
    let userid = user?._id  

    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg) 

    

    const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))

   

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
    useEffect(function(){
        fetchCommentByPost()
    },[refresh])

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
                return <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={matches4?'':'md'} fullScreen={matches4} >
                    <DialogContent style={{ padding: 0 }}>
                        <CommentSection data = {data} handleLikes={handleLikes} handleAddComments={handleAddComments} comment={comment} setComment={setComment} open={open} setOpen={setOpen} commentDataList={commentDataList}  handleDeletePost={handleDeletePost} refresh={refresh} setRefresh={setRefresh} />
                    </DialogContent>
                </Dialog>
            }
   

    return(<>
    {data.video ? (
                     <video
                     autoPlay
                     muted
                     loop
                     style={{ width: '100%',height:'100%', cursor: 'pointer', backgroundColor:'#fff' }}
                     onClick={()=>{
                        setOpen(true)
                        }}
                 >
                     <source src={data.video} type="video/mp4" />
                     Your browser does not support the video tag.
                 </video>
                ) : (
        <img 
        srcSet={data?.picture}
        src={data?.picture}  
        alt={data?.picture}
        loading="eager"
        style={{width:'100%', height: '100%' ,objectFit:'cover', backgroundColor:'#fff'}} 
        onClick={()=>{
            setOpen(true)
            }}
        />
    )}
        {handleOpenCommentDialog()}
        </>
)
}