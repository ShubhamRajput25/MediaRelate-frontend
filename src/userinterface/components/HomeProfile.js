import "../css/HomeProfile.css"
import image from "../../img/profileTempPostImg.webp"
import { useNavigate } from "react-router-dom"
import coverTempPhoto from "../../img/coverTempPhoto.jpg"
import { Divider, Grid } from "material-ui-core"
export default function HomeProfile({followers,following,noOfposts,username}){
    const navigate = useNavigate()
    let user = JSON.parse(localStorage.getItem('user'))

    return(<div className="hp-container"> 
        <div style={{width:'100%',position:'relative',display:'flex',justifyContent:'center'}}>
        <img src={user.coverpic} style={{width:'100%',height:'120px',objectFit:'cover'}}/>
        <img src={user.profilepic} style={{zIndex:2,position:'absolute',bottom:'-40px',width:'90px',border:'3px solid white',borderRadius:'10px',height:'90px',objectFit:'cover'}}/>
        </div>

            <div className="details-box">
                <div className="details" style={{marginTop:'45px',fontWeight:'bold'}}>{username}</div>
                <div style={{marginTop:10}}>
               {user?.bio}
                </div>

                <Grid container style={{width:'100%',marginTop:10,marginBottom:30}}>

                <Grid item xs={4} style={{borderRight:'1px solid grey',display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{flex:1,textAlign:'end'}}>{noOfposts}</div>
                    <div>Posts</div>
                </Grid>

                <Grid item xs={4} style={{borderRight:'1px solid grey',display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{flex:1,textAlign:'end'}}>{followers}</div>
                    <div>Followers</div>
                </Grid>

                <Grid item xs={4} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{flex:1,textAlign:'end'}}>{following}</div>
                <div>Following</div>
                </Grid>


                </Grid>
            </div>
            <div style={{textAlign:'center',marginBottom:'10px',cursor:'pointer',borderTop:'1px solid #b2bec3',paddingTop:8,width:'100%'}} className="vp" onClick={()=>{
                let userId = user?._id
                navigate(`/profile/${userId}`)
                }}>View Profile</div>
    </div>)
}