import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { API_URL } from '../../apiConfig';
import Swal from 'sweetalert2';
import CloseIcon from '@mui/icons-material/Close';   
import { useAppStore } from '../../appStore';

export default function AddTeacher({ closeEvent }) {

    const setRows = useAppStore((state) => state.setRows);
    const [teacherData, setTeacherData] = useState({
        id: '',
        userId: '',
        title: '',
        body: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTeacherData({
            ...teacherData,
            [name]: value,
        });
    };

    const createTeacher = async () => {
        // Assuming you have an API endpoint to create a new student
        const apiUrl = `${API_URL}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacherData),
            });

            if (response.ok) {
                // Handle successful student creation, e.g., show a success message
                closeEvent();
                Swal.fire("Thêm thành công !!!", "", "success")
            } else {
                // Handle error when student creation fails
                console.error('Failed to create student !!!');
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
                Add Teacher
            </Typography>
            {/* <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}
            >
                <CloseIcon />
            </IconButton> */}
            <Box height={20} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="id"
                        label="id"
                        variant="outlined"
                        size="small"
                        name="id"
                        value={teacherData.id}
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
                        value={teacherData.userId}
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
                        value={teacherData.title}
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
                        value={teacherData.body}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                        <Button variant="contained" onClick={createTeacher}>
                            Add
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

