import { Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import RegistrationPage from '../../pages/RegistrationPage';

const PublicRouter = () => {   
  return (  
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/registration' element={<RegistrationPage/>}></Route>
        <Route path="*" element={<LoginPage/>} />
      </Routes> 
    </>
  )  
}

export default PublicRouter