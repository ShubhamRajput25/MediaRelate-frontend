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
import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import LoadingPage from './userinterface/components/LoadingPage';
import Notification from './userinterface/components/Notification';


function App() {
  const [refresh, setRefresh] = useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const theme = useTheme()
    const matches1 = useMediaQuery(theme.breakpoints.down(1000))
    const matches2 = useMediaQuery(theme.breakpoints.down(800))
    const matches3 = useMediaQuery(theme.breakpoints.down(700))
    const matches4 = useMediaQuery(theme.breakpoints.down(600))
    const matches5 = useMediaQuery(theme.breakpoints.down(500))
  return (
    <Router>
       <div className="App">
      
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/profile/:userId' element={<Profile refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading} />}/>
        <Route path='/home' element={<Home refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading} />}/>
        <Route path='/imagefeed/:userId' element={<ImageFeed refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading} />}/>
        <Route path='/loadingpage' element={<LoadingPage />} />
        <Route path='/notification' element={<Notification />} />
      </Routes>
      <ToastContainer />
     {matches3? <BottomNavigationComp refresh={refresh} setRefresh={setRefresh} isLoading={isLoading} setIsLoading={setIsLoading}  />: <></>}
      </div>
    </Router>
  );
}

export default App;
