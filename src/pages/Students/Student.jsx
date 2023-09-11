import React from 'react'
import Menu from '../../compoments/Menu'
import Navbar from '../../compoments/Navbar'
import Box from '@mui/material/Box';
import StudentList from './StudentList';
import '../Home.css';

const Student = () => {
    return (
        <>
            <div className="bgcolor">
                <Navbar />
                <Box height={70} />
                <Box sx={{ display: 'flex' }}>
                    <Menu />
                    <Box compoments="main" sx={{ flexGrow: 1, p: 3 }}>
                        <StudentList />
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default Student