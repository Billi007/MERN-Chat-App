import Login from './pages/Login/Login'
import './App.css'
import Signup from './pages/Signup/Signup'
import Home from './pages/Home/Home'
import { Route, Routes, Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
function App() {
 const {authUser} = useAuthContext()


  return (
    <>
    <div className='min-h-screen p-4 flex items-center justify-center bg-slate-950  '>
    <Toaster position="bottom-right" />
    <Routes>
      <Route path='/' element={authUser ? <Home/> : <Navigate to={'/login'} />}/>
      <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login/>}/>
      <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup/>}/>
    </Routes>
    </div>
    </>
  )
}

export default App
