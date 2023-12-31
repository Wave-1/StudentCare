import React from 'react'
import Navbar from '../../../compoments/Navbar'
import Menu from '../../../compoments/Menu'
import Box from '@mui/material/Box';
import FormWorkSchedule from './FormWorkSchedule';

const WorkSchedule = () => {
    return (
        <>
            <div className="bgcolor">
                <Box height={70} />
                <Box sx={{ display: 'flex' }}>
                    <Box compoments="main" height={'95vh'} sx={{ flexGrow: 1, p: 3 }}>
                        <FormWorkSchedule/>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default WorkSchedule