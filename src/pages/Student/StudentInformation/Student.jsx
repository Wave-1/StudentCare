import React from 'react'
import Navbar from '../../../compoments/Navbar'
import Menu from '../../../compoments/Menu'
import Box from '@mui/material/Box';
import StudentInformation from './StudentInformation';

const StudentI = () => {
    return (
        <>
            <div className="bgcolor">
                <Box height={20} />
                <Box sx={{ display: 'flex' }}>
                    <Box compoments="main" sx={{ flexGrow: 1, p: 3 }}>
                       
                    </Box>
                </Box>
                <StudentInformation />
            </div>
        </>
    )
}

export default StudentI