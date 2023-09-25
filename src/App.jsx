import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminRoutes, StudentRoutes, TeacherRoutes } from './compoments/Routes';

function App() {
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Student/*" element={<StudentRoutes />} />
          <Route path="/Teacher/*" element={<TeacherRoutes />} />
          <Route path="/Admin/*" element={<AdminRoutes/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
