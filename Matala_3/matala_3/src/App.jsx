import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './FCC.jsx/Login'
import Register from './FCC.jsx/Register'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import Profile from './FCC.jsx/Profile'
import HomePage from './FCC.jsx/HomePage'
import SystemAdmin from './FCC.jsx/SystemAdmin'


function App() {
  const [isLoggedin, setIsloggedin] = useState(false)

  useEffect(() => {
    const user = sessionStorage.getItem("login");
    if (user) {
      setIsloggedin(true)
    }
  }, [])

  return (
    <div>

      <Routes>
        <Route path='/' element={<HomePage isLoggedin={isLoggedin} setIsloggedin={setIsloggedin} />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login setIsloggedin={setIsloggedin} />} />
        </Route>
        <Route path='/profile' element={<Profile setIsloggedin={setIsloggedin} />} />
        <Route path='/admin' element={<SystemAdmin />} />
      </Routes>
    </div>


  )
}

export default App
