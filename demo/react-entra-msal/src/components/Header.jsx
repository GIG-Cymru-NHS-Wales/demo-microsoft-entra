import React from 'react';
import '../assets/Header.css';
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { loginRequest } from '../authConfig'

function Header() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  
  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.error(e);
    });
  };
  
  const handleLogout = () => {
    instance.logoutPopup();
  };
  
  return (
    <header className="sticky-header">
      <img src="/dhcw_logo.png" className="logo" />
      <div className="title-box">
        <img src="/react.svg" className='logo'/><h1 className='title'>React Entra MSAL Demo</h1>
      </div>
      {!isAuthenticated ? (
              <button onClick={handleLogin} className='login-button'>Login</button>
            ) : (
              <>
                <p>You are logged in!</p>
                <button onClick={handleLogout} className='login-button'>Logout</button>
              </>
            )}
    </header>
  );
};

export default Header;