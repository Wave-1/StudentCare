import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';

import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";

import { useEffect, useState } from "react";
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
import { useAppStore } from '../../../appStore';
import { Skeleton } from '@mui/material';
import AddTeacher from './AddTeacher';
import EditTeacher from './EditTeacher';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TeacherList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [formid, setFormID] = useState('');
    
    const [editopen, setEditOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
    const setRows = useAppStore((state) => state.setRows);
    const rows = useAppStore((state) => state.rows);

    useEffect(() => {
        axios.get(API_BASE_URL + API_ROUTES.Teacher, {
            headers: API_HEADERS,
        })
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then((data) => setRows(data))
        .catch((error) => console.log(error));
    }, []);
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                deleteApi(id);
            }
        });
    };

    const deleteApi = async (teacherID) => { // Change 'id' to 'teacherID'
        try {
            const response = await axios.delete(`${API_BASE_URL}${API_ROUTES.Teacher}/${teacherID}`); // Corrected the URL format
    
            if (response.status === 200) { // Check the status code, not 'ok'
                const updatedRows = rows.filter((row) => row.teacherID !== teacherID);
                setRows(updatedRows);
    
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
                Swal.fire("Error", "Failed to delete item", "error");
            }
        } catch (error) {
            Swal.fire("Error", `An error occurred: ${error.message}`, "error");
        }
    };

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            fetch(API_BASE_URL + API_ROUTES.Teacher, {
                headers: API_HEADERS,
            })
                .then((response) => response.json())
                .then((data) => setRows(data))
                .catch((error) => console.error(error));
        }
    };

    const editData = (teacherID, teacherName, problemID, roleID) => {
        const data = {
            teacherID: teacherID,
            teacherName: teacherName,
            problemID: problemID,
            roleID: roleID
        };
        setFormID(data);
        handleEditOpen();
    }

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddTeacher
                            closeEvent={handleClose}
                        />
                    </Box>
                </Modal>
                <Modal
                    open={editopen}
                    onClose={handleEditClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditTeacher fid={formid} closeEvent={handleEditClose} />
                    </Box>
                </Modal>
            </div>
            {rows.length >= 0 && (
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '12px' }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ padding: "20px" }}
                    >
                        Teacher List
                    </Typography>
                    <Divider />
                    <Box height={10} />
                    <Stack direction="row" spacing={2} className="my-2 mb-2">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={rows}
                            sx={{ width: 300 }}
                            onChange={(e, v) => filterData(v)}
                            getOptionLabel={(row) => row.teacherName || ""}
                            renderInput={(params) => (
                                <TextField {...params} size="small" label="Search" />
                            )}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        ></Typography>
                        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                            Add
                        </Button>
                    </Stack>
                    <Box height={10} />
                    <TableContainer sx={{ maxHeight: 450 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Teacher ID
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Teacher Name
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Problem ID
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Role ID
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: "100px" }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow key={row.teacherID} hover role="checkbox" tabIndex={-1}>
                                                <TableCell align='left'>
                                                    {row.teacherID}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {row.teacherName}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {row.problemID}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {row.roleID}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Stack spacing={2} direction="row">
                                                        <EditIcon
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "blue",
                                                                cursor: "pointer",
                                                            }}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                editData(
                                                                    row.teacherID,
                                                                    row.teacherName,
                                                                    row.problemID,
                                                                    row.roleID
                                                                );
                                                            }}
                                                        />
                                                        <DeleteIcon
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "darkred",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                deleteUser(row.teacherID);
                                                            }}
                                                        />
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
            {rows.length === 0 && (
                <>
                    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '12px' }}>
                        <Box height={20} />
                        <Skeleton variant='rectangular' width={'100%'} height={30} />
                        <Box height={40} />
                        <Skeleton variant='rectangular' width={'100%'} height={60} />
                        <Box height={20} />
                        <Skeleton variant='rectangular' width={'100%'} height={60} />
                        <Box height={20} />
                        <Skeleton variant='rectangular' width={'100%'} height={60} />
                        <Box height={20} />
                        <Skeleton variant='rectangular' width={'100%'} height={60} />
                        <Box height={20} />
                        <Skeleton variant='rectangular' width={'100%'} height={60} />
                        <Box height={20} />
                    </Paper>
                </>
            )}
        </>
    );
}
