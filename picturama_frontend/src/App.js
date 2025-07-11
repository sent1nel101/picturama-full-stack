import React, {useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'

const App = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
    if(!user) navigate('/login')
  },[])
    return (
      <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/*" element={<Home />} />
      </Routes>
    )
}

export default App
