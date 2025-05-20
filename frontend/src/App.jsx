import React from 'react'
import { Routes,Route } from 'react-router-dom'
import  HomePage  from './pages/HomePage'
import LoginPage from './pages/loginPage'
import SignupPage from './pages/signupPage'
import ResetPassword from './pages/resetPassword'
import EmailVerify from './pages/emailVerify'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path='/' element={< HomePage />}/>
        <Route path='/login' element={< LoginPage />}/>
        <Route path='/signup' element={< SignupPage />}/>
        <Route path='/reset-password' element={< ResetPassword/>}/>
        <Route path='/email-verify' element={< EmailVerify />}/>

       </Routes>
    </div>
  )
}

export default App
