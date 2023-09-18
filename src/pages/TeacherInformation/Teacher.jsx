import React from 'react'
import Menu from '../../compoments/Menu'
import Navbar from '../../compoments/Navbar'
import Box from '@mui/material/Box';
import TeacherList from './TeacherList';
import '../Home.css';

const Teacher = () => {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: 'flex' }}>
          <Menu />
          <Box compoments="main" sx={{ flexGrow: 1, p: 3 }}>
            <TeacherList />
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Teacher