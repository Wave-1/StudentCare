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
import Autocomplete from "@mui/material/Autocomplete";

import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import { API_BASE_URL, API_ROUTES, API_HEADERS } from '../../../apiConfig';
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

const TeacherList = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [formid, setFormID] = useState('');
    const [editopen, setEditOpen] = useState(false);
    const [rows, setRows] = useState([]);

    const handleEditOpen = () => setEditOpen(true);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(API_BASE_URL + API_ROUTES.Teacher, {
                headers: API_HEADERS
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
        };

        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteUser = (teacherID) => {
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
                deleteApi(teacherID);
            }
        });
    };

    const deleteApi = async (teacherID) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}${API_ROUTES.Teacher}/${teacherID}`, {
                headers: API_HEADERS
            });
            if (response.status === 200) {
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
            axios.get(API_BASE_URL + API_ROUTES.Teacher, { headers: API_HEADERS })
                .then((response) => {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        throw new Error('Failed to fetch data');
                    }
                })
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
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-max">
                        <AddTeacher onClose={() => setOpen(false)} />
                    </Box>
                </Modal>
                <Modal
                    open={editopen}
                    onClose={() => setEditOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-max">
                        <EditTeacher
                            fid={formid}
                            onClose={() => setEditOpen(false)}
                        />
                    </Box>
                </Modal>
            </div>

            <Paper className="w-full overflow-hidden p-3">
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="p-2"
                >
                    Teacher Information
                </Typography>
                <Divider />
                <div className="h-10" />

                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        className="w-96"
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(row) => row.teacherName || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search" />
                        )}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        className="flex-grow"
                    ></Typography>
                    <Button
                        variant="contained"
                        endIcon={<AddCircleIcon />}
                        onClick={() => setOpen(true)}
                        className="bg-blue-500 text-white rounded hover:bg-violet-600"
                    >
                        Add
                    </Button>
                </Stack>

                <div className="h-10" />

                <TableContainer className="max-h-450">
                    <Table className="sticky top-0" aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="min-w-100">Teacher ID</TableCell>
                                <TableCell className="min-w-100">Teacher Name</TableCell>
                                <TableCell className="min-w-100">Problem ID</TableCell>
                                <TableCell className="min-w-100">Role ID</TableCell>
                                <TableCell className="min-w-100">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow key={row.teacherID} hover role="checkbox" tabIndex={-1}>
                                            <TableCell className="min-w-100">
                                                {row.teacherID}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.teacherName}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.problemID}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.roleID}
                                            </TableCell>
                                            <TableCell className="min-w-100">
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
        </>
    )
}

export default TeacherList;
