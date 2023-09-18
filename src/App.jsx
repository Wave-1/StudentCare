import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import About from './pages/About';
import Student from './pages/StudentInformation/Student';
import WorkSchedule from './pages/WorkSchedule/WorkSchedule';
import Teacher from './pages/TeacherInformation/Teacher';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/workschedule" element={<WorkSchedule />} />
          <Route path="/about" element={<About />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
