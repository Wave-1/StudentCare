import React from 'react'
import Menu from '../compoments/Menu'
import Box from '@mui/material/Box';
import Navbar from '../compoments/Navbar'

const About = () => {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Menu />
        <Box compoments="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>About</h1>
        </Box>
      </Box>
    </>
  )
}

export default About