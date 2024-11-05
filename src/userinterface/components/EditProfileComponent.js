import { Dialog, DialogContent, Grid} from "@mui/material";
import { TextField ,MenuItem} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useEffect, useState } from "react";
import { postData } from "../../services/fetchnodeservices";

export default function EditProfileComponent({open,setOpen, refresh, setRefresh}){

    const [name,setName]=useState('')
    const [username,setUsername]=useState('')
    const [gender,setGender]=useState('')
    const [dob,setDob]=useState('')
    const [bio,setBio]=useState('')

    useEffect(function(){
      setName(data.name)
      setUsername(data.username)
      setGender(data?.gender)
      setDob(data?.dob)
      setBio(data?.bio)
      // alert(JSON.stringify(data)) 
    },[])

    let data = JSON.parse(localStorage.getItem('user'))
    
    let genderlist = ['male','female','other']
    
    const handleSubmit = async()=>{
      let token = JSON.parse(localStorage.getItem('token'))
      let config = {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      }
      let body
      if(username == data.username){
       body = {name, gender, bio, dob}
      }else{
        body = {username, name, gender, bio, dob} 
      }

      let result = await postData('users/editprofile',body,config)
      if(result.status == true){
        // alert(JSON.stringify(result.data))
        localStorage.setItem('user',JSON.stringify(result.data[0]))
        setOpen(false)
        setRefresh(!refresh)
      }else{

      }

    }

    return(<div style={{width:'100%'}}>
        <Dialog open={open} onClose={()=>setOpen(false)} fullWidth={true} maxWidth={'md'}>
        <DialogContent style={{width:'100%',height:'100vh',background:'white',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{fontSize:'1.7rem',fontWeight:'bold',marginBottom:20}}>
                Edit Profile
             </div>
            <div style={{width:'80%',height:'100%'}}>
            <Grid container >

                <Grid item xs={12}>
                    <div style={{marginBottom:5,marginTop:10}}>Full Name</div>
                <TextField  variant='outlined' size='small' fullWidth placeholder="Enter Full Name" color='primary' value={name} onChange={(e)=>setName(e.target.value)} />
                </Grid>

                <Grid item xs={12}>
                    <div style={{marginBottom:5,marginTop:10}}>User Name</div>
                <TextField  variant='outlined' size='small' fullWidth placeholder="Enter User Name" color='primary' value={username} onChange={(e)=>setUsername(e.target.value)} />
                </Grid>

                <Grid item xs={6}>
                    <div style={{marginBottom:5,marginTop:10}}>Gender</div>
                <TextField  variant='outlined' size='small' label="select" fullWidth  color='primary' select onChange={(e)=>setGender(e.target.value)} value={gender} >
                {genderlist.map((item)=>{
                   return <MenuItem key={item} value={item} >{item}</MenuItem>
                })}
                </TextField>
                </Grid>

                <Grid item xs={6} style={{paddingLeft:29}}>
                    <div style={{marginBottom:5,marginTop:10,textAlign:'start'}}>Date Of Birth</div>
                    <input type='date' className="dateinput" onChange={(e)=>setDob(e.target.value)} value={dob} />
                </Grid>

                <Grid item xs={12}>
                    <div style={{marginBottom:5,marginTop:10}}>Bio</div>
                <textarea  rows={5} placeholder="Enter About your" style={{width:'100%'}} onChange={(e)=>setBio(e.target.value)} value={bio} className="edittextarea" />
                </Grid>

                <Grid item xs={12} style={{marginTop:25,display:'flex',justifyContent:'center'}}>
                  <span className="editsubmitbtn" onClick={handleSubmit} >Submit</span>
                </Grid>

            </Grid> 
            </div>
        </DialogContent>
        </Dialog> 
    </div>)
}