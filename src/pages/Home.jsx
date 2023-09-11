import React from 'react'
import Menu from '../compoments/Menu'
import Navbar from '../compoments/Navbar'
import Box from '@mui/material/Box';
import './Home.css';
const Home = () => {
    return (
        <>
            <div className='bgcolor'>
                <Navbar />
                <Box height={30} />
                <Box sx={{ display: 'flex' }}>
                    <Menu />
                    <Box compoments="main" sx={{ flexGrow: 1, p: 3 }}>
                        <h1>Home</h1>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default Home