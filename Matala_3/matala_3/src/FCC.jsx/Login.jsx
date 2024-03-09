import { PinkButton } from "./Style";
import LoginIcon from '@mui/icons-material/Login';
import { loginUser } from './storage'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsloggedin }) {

  const [login, setLogin] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const submitHandler = (event) => {
    event.preventDefault();
    // validations
    if (login.username === "admin" && login.password === "ad12343211ad") {
      navigate('/admin');
      return;
    }
    const loginSuccess = loginUser(login.username, login.password)

    if (loginSuccess) {
      setIsloggedin(true)
      navigate('/profile');
    } else {
      setMessage("שם משתמש וסיסמה אינם תקינים");
    }

  }

  return (
    <div><br />
      <h1>Login To The System:</h1><br />
      <form onSubmit={submitHandler}>
        <div>
          <label>Enter Your UserName: </label>
          <input type="text" id="username" value={login.username} onChange={event => setLogin({ ...login, username: event.target.value })} required placeholder="Your username" />
        </div>
        <div>
          <label>Enter Your Password: </label>
          <input type="password" id="password" value={login.password} onChange={event => setLogin({ ...login, password: event.target.value })} minLength={7} maxLength={12} placeholder="Your password" />
        </div><br />
        <PinkButton size="large" type="submit " variant="contained" startIcon={<LoginIcon />}>Log In</PinkButton>
        <p style={{ backgroundColor: 'pink', color: 'red', fontWeight: 'bold' }}>{message}</p>
      </form>
    </div>
  )
}

export default Login;