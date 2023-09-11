import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from "./pages/Login";
import About from './pages/About';
import Student from './pages/Students/Student';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
