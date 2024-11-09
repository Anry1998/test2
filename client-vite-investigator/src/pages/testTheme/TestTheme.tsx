import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState } from 'react';
import { Container, Button, Card } from 'react-bootstrap';

import '../../custom.scss'
// import DarkModeToggleSwitch from '../../components/dark-mode-toggle-switch/DarkModeToggleSwitch';

import { useSettingsStore } from '../../store/settingsStore/settings.store';

function TestTheme() {
  
  const {appThemeLight}  = useSettingsStore(state => state)
  
  
  return ( 
    <>
      {/* <h1 className="text-center mb-5">
          Using Bootstrap's built-in dark mode
       </h1> */}
      <Container
        className={`${!appThemeLight ? 'bg-primary text-primary' : 'bg-info'}`}
        style={{ minHeight: '70vh' }}
      >
        <Card className={`${!appThemeLight ? 'bg-secondary' : ' bg-warning '}`}>
        <h1
          className={`${!appThemeLight ? 'white-text' : 'dark-text'}`}
          >{!appThemeLight ? 'Dark Theme' : 'Light Theme'}
        </h1>

        <Button   variant="success">Войти</Button>

        

        </Card>

      </Container>
    </>
  );
}

export default TestTheme;