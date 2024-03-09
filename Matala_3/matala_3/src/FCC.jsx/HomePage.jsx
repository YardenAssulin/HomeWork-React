import { useState, useEffect } from 'react';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PinkButton } from "./Style";
import { useNavigate, Outlet } from 'react-router-dom';


const HomePage = ({ setIsloggedin, isLoggedin }) => {
  const [message, setMessage] = useState("")
  const nav = useNavigate();
  const showLogin = () => {
    setMessage("");
    nav('/login')
  }

  const showProfile = () => {
    if (isLoggedin === false) {
      setMessage("יש להתחבר למערכת")
    } else {
      setMessage("")
      nav('/profile')
    }

  }

  const showRegister = () => {
    setMessage("");
    nav('/register')
  }

  return (

    <div>
      <h1 >Welcome To A User management system</h1><br />
      <img src="./images/Account-Management-Software.png.webp" alt="User management system" />
      <h3>Choose what you want to do:</h3><br />
      <PinkButton startIcon={<HowToRegIcon />} size="large" variant="contained" onClick={showRegister}>Register</PinkButton>
      <PinkButton startIcon={<LoginIcon />} size="large" variant="contained" onClick={showLogin}>Login</PinkButton>
      <PinkButton startIcon={<AccountCircleIcon />} size="large" variant="contained" onClick={showProfile}>Profile</PinkButton>
      <p style={{ backgroundColor: message ? 'pink' : 'initial', color: 'red', fontWeight: 'bold' }}>{message}</p>
      <Outlet />
    </div>
  )
}

export default HomePage;