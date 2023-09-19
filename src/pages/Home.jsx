import React from 'react'
import Menu from '../compoments/Menu'
import Navbar from '../compoments/Navbar'
import Box from '@mui/material/Box';
import './Home.css';
import { Outlet } from 'react-router-dom';
const Home = () => {
    return (
        <>
            <div className='bgcolor'>
                <Navbar />
                <Box sx={{ display: 'flex' }}>
                    <Menu />
                    <Box compoments="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Outlet />
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default Home