
import './App.css'
import { Outlet } from "react-router-dom"
import { useAuthStore } from './store/ayth-store/auth.store'
// import RegistrationPage from './pages/RegistrationPage'
// import LoginPage from './pages/LoginPage'
 import Navbar from './components/navbar/Navbar'

import PublicRouter from './components/router/PublicRouter'
import Loading from './components/loading/Loading'
// import Images from './components/images/Images'
// import List from './components/listGroups/ListGroups'
// import StaticModal from './components/static-modal/StaticModal'
// import SearchInputNavbar from './components/search-input-navbar/SearchInputNavbar'
// import TestTheme from './pages/testTheme/TestTheme'
// import { Button, Card, Container } from 'react-bootstrap'





import  { useEffect } from 'react'
import { useSocketStore } from './store/socket-store/socket.store'
// import { get } from 'react-hook-form'
// import NavbarBootstrap from './components/navbar/NavbarBootstrap'
// import CollapsibleExample from './components/navbar/HamburgerInSidenav'
// import OffcanvasExample from './components/navbar/HamburgerInSidenav'
// import detectDarkMode from './utils/detectDarkMode'
// import { useSettingsStore } from './store/settingsStore/settings.store';







function App() { 

  const {isAuth, isLoading, checkAuth,}  = useAuthStore(state => state)
  const { socket}  = useSocketStore(state => state)

  console.log(isAuth)
 
  useEffect(() => {
    if(localStorage.getItem('access-token')) {
      new Promise(async (resolve) => {
        await checkAuth()
        resolve('')
      })  
      .then(() => {
        socket.auth = { accessToken: `Bearer ${localStorage.getItem('access-token')}`};
        socket.connect();
        console.log('socket.connect') 
      
      })
    }
  }, [])


  return (
    <>
      {
        isAuth 
        ? 
          <div>
            {/* <header><OffcanvasExample/></header> */}
            <header><Navbar/></header> 
            <div>
              <Outlet/>
            </div>
          </div>
        : isLoading
        ?
          <div>
            <Loading/>
          </div>
        : 
          <div>
            <PublicRouter/>
          </div>
      }

    </>
  )
}

export default App
