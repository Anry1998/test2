


import {FC, useState } from "react";
import {  Link, NavLink, useNavigate  } from 'react-router-dom';

// import { Context } from "../../main";

// import BtnDarkMode from "../../UI/btndarkMode/DtndarkMode";

// import Nav from 'react-bootstrap/Nav';



import './Navbar.css'
// import DarkModeToggleSwitch from "../dark-mode-toggle-switch/DarkModeToggleSwitch";
import { useAuthStore } from "../../store/ayth-store/auth.store";
import { Button } from "react-bootstrap";

const Navbar: FC = () => {

    const navigate = useNavigate()

    // const {authStore} = useContext(Context)
    const [btnState, setBtnState] = useState(false)

    const handleClick = () => {
        setBtnState(btnState => !btnState)
    }

    let toggleClassCheck = btnState ? 'active' : null
    let toggleClassLock = btnState ? 'lock' : null

    const removeActive = () => { 
        setBtnState( false) 
    }

    const activLink = 'nav-burger__list__link nav-burger__list__link--active'
    const normalLink = 'nav-burger__list__link'

    const logoutF = () => {
        // authStore.logout()
        logout()
        navigateLoginPage()
    }

    const navigateLoginPage = () => {
        navigate('/')
    }

    const {logout}  = useAuthStore(state => state)
    
    return (
        <div>
            <div className= {` ${toggleClassLock}`}>
                <header className="burger__header">
                    <div className="container"> 
                        <div className="burger__body">
                            <Link className="header__burger-logo" to='/'>Investigator</Link>
                            <div 
                                className={`burger__icon ${toggleClassCheck}`}
                                onClick={handleClick}
                            >
                                <span></span>
                            </div>

                            <nav className={`burger__menu ${toggleClassCheck}`}>
                                <ul className="burger__list">
                                    <li ><NavLink to='/main' className={({isActive}) => isActive ? activLink : normalLink}  onClick={removeActive}>Главная</NavLink></li>
                                    <li ><NavLink to='/chat' className={({isActive}) => isActive ? activLink : normalLink}  onClick={removeActive}>Чат</NavLink></li>
                                    <li ><NavLink to='/employes' className={({isActive}) => isActive ? activLink : normalLink} onClick={removeActive}>Сотрудники</NavLink></li>
                                    <li ><NavLink to='/incident' className={({isActive}) => isActive ? activLink : normalLink} onClick={removeActive}>Происшествия</NavLink></li>
                                    <li ><NavLink to='/settings' className={({isActive}) => isActive ? activLink : normalLink} onClick={removeActive}>Настройки</NavLink></li>
                                    {/* <DarkModeToggleSwitch/> */}
                                    {/* <button onClick={logoutF}>Выйти</button> */}
                                    <Button style={{marginLeft: '40px'}} onClick={logoutF} variant="primary">Выйти</Button>{''}
                                    
                                    {/* <BtnDarkMode/> */}

                                    {/* {store.user.role === 'USER' &&
                                        <li ><NavLink to='/investigatorPage' className={({isActive}) => isActive ? activLink : normalLink} onClick={removeActive}>Функции следователя</NavLink></li>
                                    } */}
                                </ul>   
                            </nav>
                        </div> 
                    </div> 
                </header>
            </div>   
        </div>
    )
}

export default Navbar