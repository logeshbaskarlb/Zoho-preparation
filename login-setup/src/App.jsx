import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Profile from './pages/Profile';
function App() {

  return (
    <>
      {/* <Login /> */}
  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/profile' element={<Profile />}></Route>

      </Routes>
    </BrowserRouter>



    <ToastContainer />
    </>
  )
}

export default App
