import axios from "axios";
// let serverurl="http://192.168.29.247:5000"
let serverurl="http://localhost:3000"
// let serverurl = "https://mediarelate-backend-4.onrender.com"
const postData = async (url,body,config)=>{
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx",config)
    try{
        var response = await axios.post(`${serverurl}/${url}`,body,config)
        var result = response.data
        return result
    }catch(e){
        console.log(e)
        return null
    }
}

const getData = async (url,config)=>{
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx",config)
    try{
        var response = await axios.get(`${serverurl}/${url}`,config)
        var result = response.data
        return result
    }catch(e){
        console.log(e)
        return null
    }
}

const deleteData = async (url,config)=>{
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx",config)
    try{
        var response = await axios.delete(`${serverurl}/${url}`,config)
        var result = response.data
        return result
    }catch(e){
        console.log(e)
        return null
    }
}

const postImg = async(url,body,headers)=>{
    try{
        var response = await axios.post(`${serverurl}/${url}`,body,headers)
        var result = response.data
        return result 
    }catch(e){
        return null
    }
}

const signing = async (url,body)=>{
    try{
        var response = await axios.post(`${serverurl}/${url}`,body)
        var result = response.data
        return result
    }catch(e){
        console.log(e);
        return null
    }
}

export {serverurl,postData,postImg,signing,getData,deleteData}