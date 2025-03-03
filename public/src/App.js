import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import setAvatar from './pages/setAvatar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Chat />} />
          <Route index path='/setAvatar' element={<setAvatar />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

