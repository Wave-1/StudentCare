import React from 'react'
import Navbar from '../../../compoments/Navbar'
import Menu from '../../../compoments/Menu'
import Box from '@mui/material/Box';
import FormCertificates from './FormCertificates';

const Certificates = () => {
    return (
        <>
            <div className="bgcolor">
                <Box height={20} />
                <Box sx={{ display: 'flex' }}>
                    <Box compoments="main" height={'95vh'} sx={{ flexGrow: 1, p: 3 }}>
                        <FormCertificates/>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default Certificates