import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import DashBoard from './components/DashBoard'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Refer from './components/Refer'

function App() {

  const [curUserData, setCurUserData] = useState({
    email: "",
    userId: "",
    balance: 0
  });
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashBoard/>}/>
          <Route path='/signup' element={<SignUp setCurUserData={setCurUserData}/> }/>
          <Route path='/signin' element={<SignIn setCurUserData={setCurUserData} setIsSignIn={setIsSignIn}/>}/>
          <Route path='/refer/:prevUserId' element={<Refer/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
