import React, {useState } from 'react';
import detectDarkMode from '../../utils/detectDarkMode';
import { useSettingsStore } from '../../store/settingsStore/settings.store';
import './DarkModeToggleSwitch.css'

function DarkModeToggleSwitch() {
    const {appThemeLight, toggleAppTheme, setAppTheme }  = useSettingsStore(state => state)

    let dakModeStorage = localStorage.getItem('dakMode')
    let lightModeStorage = localStorage.getItem('lightMode')
    const windowTheme = detectDarkMode()

    React.useEffect(() => {
        if (lightModeStorage) {
            setAppTheme(true)
        }
        if (!dakModeStorage && !lightModeStorage) {
            if (windowTheme === 'dark') {
                setAppTheme(false)
                localStorage.setItem('dakMode', 'dark' );
            } else if (windowTheme === 'light') {
                setAppTheme(true)
                localStorage.setItem('lightMode', 'light');
            } else {
                setAppTheme(true)
                localStorage.setItem('lightMode', 'light');
            }
        } 
    }, [appThemeLight])

    const [isChecked, setIsChecked] = useState(appThemeLight)

    const checkHandler = () => {
        setIsChecked(!isChecked)
        toggleAppTheme()
        if (appThemeLight) {
            localStorage.removeItem('lightMode')
            localStorage.setItem('dakMode', 'dark');
            document.body.classList.add('dark') 
        } else {
            localStorage.removeItem('dakMode')
            localStorage.setItem('lightMode', 'light');
            document.body.classList.remove('dark')
        }
    }

    const ckeck = () => {
        if (lightModeStorage ) {
            return true
        } 
        if (dakModeStorage ) {
            document.body.classList.add('dark')
            return false
        }
        if ((!lightModeStorage && !dakModeStorage)  && windowTheme === 'light') {
            return true
        }
        if ((!lightModeStorage && !dakModeStorage)  && windowTheme === 'dark') {
            return false
        }
        if (appThemeLight) {
            return true
        }
        return false
    }

    return ( 
        <div  className='toggle-switch'>
            <label>
                <input checked={ckeck()} onChange={checkHandler}  type='checkbox'/> 
                <span className = 'slider'></span>
            </label>
            
        </div>
    ); 
}

export default DarkModeToggleSwitch;

