import React from 'react'
import Navbar from '../../../compoments/Navbar'
import Menu from '../../../compoments/Menu'
import Box from '@mui/material/Box';
import FormCalendar from './FormWorkSchedule';

const WorkSchedule = () => {
    return (
        <>
            <div className="bgcolor">
                <Box height={70} />
                <Box sx={{ display: 'flex' }}>
                    <Box compoments="main" height={'95vh'} sx={{ flexGrow: 1, p: 3 }}>
                        <FormCalendar/>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default WorkSchedule