import React from 'react'
import Menu from '../../../compoments/Menu'
import Navbar from '../../../compoments/Navbar'
import Box from '@mui/material/Box';
import TeacherList from './TeacherList';

const Teacher = () => {
  return (
    <>
      <div className="bgcolor">
        <Box height={20} />
        <Box sx={{ display: 'flex' }}>
          <Box compoments="main" sx={{ flexGrow: 1, p: 3 }}>
            
          </Box>
        </Box>
        <TeacherList />
      </div>
    </>
  )
}

export default Teacher