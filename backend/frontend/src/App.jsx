import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Loading from './components/Loading'
import {lazy, Suspense} from 'react'
function App() {
 const {authUser} = useAuthContext();
 const Home = lazy(() => import('./pages/Home/Home'));
 const Login = lazy(() => import('./pages/Login/Login'));
 const Signup = lazy(() => import('./pages/Signup/Signup'));

  return (
    <>
    <div className='min-h-screen p-4 flex items-center justify-center bg-[#1c1c27]  '>
      <Suspense fallback={<Loading/>} >
      <Toaster position="bottom-right" />
      <Routes>
      <Route path='/' element={authUser ? <Home/> : <Navigate to={'/login'} />}/>
      <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login/>}/>
      <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup/>}/>
      </Routes>
      </Suspense>
    
    </div>
    </>
  )
}

export default App
