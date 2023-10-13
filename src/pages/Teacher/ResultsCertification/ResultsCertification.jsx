import React from 'react'
import Box from '@mui/material/Box';
import FormResultsCertification from './FormResultsCertification';
const ResultsAnswered = () => {
  return (
    <>
      <div className="bgcolor">
        <Box height={20} />
        <Box sx={{ display: 'flex' }}>
          <Box compoments="main" sx={{ flexGrow: 1, p: 3 }}>
          </Box>
        </Box>
        <FormResultsCertification/>
      </div>
    </>
  )
}

export default ResultsAnswered