import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { API_URL } from '../../apiConfig';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';

export default function EditStudent({ fid, closeEvent }) {
  const [studentData, setStudentData] = useState({
    id: '',
    userId: '',
    title: '',
    body: '',
  });

  useEffect(() => {
    // Assuming you have an API endpoint to fetch student data by ID
    const apiUrl = `${API_URL}/${fid.id}`; // Replace with your API endpoint

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Update the studentData state with the fetched data
        setStudentData(data);
      })
      .catch((error) => console.error('An error occurred:', error));
  }, [fid]); // Include fid in the dependency array to fetch data when it changes

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const updateStudent = async () => {
    // Assuming you have an API endpoint to update student data
    const apiUrl = `${API_URL}/${fid.id}`; // Replace with your API endpoint

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT', // Use the appropriate HTTP method for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        // Handle successful student update, e.g., show a success message
        closeEvent();
        Swal.fire('Sửa thành công !!!', '', 'success');
      } else {
        // Handle error when student update fails
        console.error('Failed to update student !!!');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Student
      </Typography>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="id"
            label="ID"
            variant="outlined"
            size="small"
            name="id"
            value={studentData.id}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="userId"
            label="UserID"
            variant="outlined"
            size="small"
            name="userId"
            value={studentData.userId}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="title"
            label="Title"
            variant="outlined"
            size="small"
            name="title"
            value={studentData.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="body"
            label="Body"
            variant="outlined"
            size="small"
            name="body"
            value={studentData.body}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={updateStudent}>
              Edit
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
