import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './userinterface/screen/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './userinterface/screen/Profile';
import ImageFeed from './userinterface/screen/ImageFeed';
import BottomNavigationComp from './userinterface/components/BottomNavigationComp';
import Header from './userinterface/components/Header';
import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import LoadingPage from './userinterface/components/LoadingPage';
import Notification from './userinterface/components/Notification';
import OtpPage from './userinterface/components/OtpPage';
import Search from './userinterface/screen/Search';
import { getData } from './services/fetchnodeservices';
import PermissionDenied from './userinterface/components/PermissionDenied';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [refresh, setRefresh] = useState(false)
  const [isLoading,setIsLoading]=useState(true)
  const [isLogin, setIsLogin] = useState(true)
  const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))
    let token = JSON.parse(localStorage.getItem('token'))
    // const checkUser = async()=>{
    // // setIsLoading(true)
    // // let token = JSON.parse(localStorage.getItem('token'))
    // // let config = {
    // //     headers: {
    // //         Authorization: `Bearer ${token}`,
    // //     }
    // // }
    // //   let result = await getData('auth/check-user',config)

    // //   if(result?.status) {
    // //     setIsLogin(true)
    // //     setIsLoading(false)
    // //   }
     
    // }
    
    // useEffect(function(){
      
    // },[])

  return (
    <GoogleOAuthProvider clientId="95811051786-1m2san9ac75f5qik6h0g5sjd4ue79jr0.apps.googleusercontent.com">
    <Router>
       <div className="App">
      
      <Routes>
        
        <Route path='/signup' element={<SignUp setIsLogin={setIsLogin} refresh={refresh} setRefresh={setRefresh} />}/>
        <Route path='/signin' element={<SignIn setIsLogin={setIsLogin} refresh={refresh} setRefresh={setRefresh} />}/>
        <Route path='/loadingpage' element={<LoadingPage />} />
    
      {token ?
        <Route path='/profile/:userId' element={<Profile refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading} />}/> : <> <Route element={<PermissionDenied
          type='auth'
          title={'Login to view your profile'} />} path="/profile/:userId" /> </> }

       {token ? <Route path='/home' element={<Home refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading} />}/> : <> <Route element={<PermissionDenied
          type='auth'
          title={'Login to access the MediaRelate'} />} path="home" /> </> }

       {token ? <Route path='/imagefeed/:userId' element={<ImageFeed refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading} />}/>: <> <Route element={<PermissionDenied
          type='auth'
          title={'Login to access the MediaRelate'} />} path="home" /> </> }

      {token ?  <Route path='/notification' element={<Notification />} /> : <> <Route element={<PermissionDenied
          type='auth'
          title={'Login to access the MediaRelate'} />} path="home" /> </> }

      {token ? <Route path='/search' element={<Search  refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading} />} /> : <> <Route element={<PermissionDenied
          type='auth'
          title={'Login to access the MediaRelate'} />} path="home" /> </> }
       
        </Routes>
      <ToastContainer />
     {matches3? token ? <BottomNavigationComp refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading}  /> : <></>: <></>}
     
      </div>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
