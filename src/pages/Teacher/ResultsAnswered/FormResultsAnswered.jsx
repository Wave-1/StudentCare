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
import axios from 'axios';
import EditResultsAnswered from './EditResultsAnswered';

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

const FormResultsAnswered = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [formid, setFormID] = useState('');
    const [editopen, setEditOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const teacherID = sessionStorage.getItem('ID');

    const handleEditOpen = () => setEditOpen(true);

    const getInquiriesName = async (inquiriesID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Inquiries}/${inquiriesID}`, {
                headers: API_HEADERS
            }); // Thay API_ENDPOINT bằng đường dẫn API thực tế
            if (response.status === 200) {
                return response.data.problemName; // Trả về tên của sinh viên
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const getStudentName = async (studentID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Student}/${studentID}`, {
                headers: API_HEADERS
            }); // Thay API_ENDPOINT bằng đường dẫn API thực tế
            if (response.status === 200) {
                return response.data.studentName; // Trả về tên của sinh viên
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return ''; // Handle empty date
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const getTeacherName = async (teacherID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Teacher}/${teacherID || ''}`, {
                headers: API_HEADERS
            }); // Thay API_ENDPOINT bằng đường dẫn API thực tế
            if (response.status === 200) {
                return response.data.teacherName; // Trả về tên của sinh viên
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            let apiUrl = `${API_BASE_URL}${API_ROUTES.ResultsAnswered}/search/${teacherID}`;
    
            // Kiểm tra xem teacherID đã được cung cấp hay không
            // if (teacherID !== null) {
            //     apiUrl += `?teacherID=${teacherID}`;
            // }
    
            await axios.get(apiUrl, {
                headers: API_HEADERS
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Failed to fetch data');
                }
            })
            .then(async (data) => {
                // Duyệt qua danh sách kết quả đã được trả lời
                for (const row of data) {
                    // Lấy tên của sinh viên dựa trên studentID
                    const problemName = await getInquiriesName(row.inquiriesID);
                    const studentName = await getStudentName(row.studentID);
                    const teacherName = await getTeacherName(row.teacherID);
    
                    // Thêm tên sinh viên vào dữ liệu kết quả đã được trả lời
                    row.problemName = problemName;
                    row.studentName = studentName;
                    row.teacherName = teacherName;
                }
                setRows(data);
            })
            .catch((error) => console.log(error));
        };
    
        fetchData();
    }, [teacherID]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            axios.get(`${API_BASE_URL}${API_ROUTES.ResultsAnswered}/search/${teacherID}`, 
                { headers: API_HEADERS })
                .then((response) => {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        throw new Error('Failed to fetch data');
                    }
                })
                .then(async (data) => {
                    // Duyệt qua danh sách kết quả đã được trả lời
                    for (const row of data) {
                        // Lấy tên của sinh viên dựa trên studentID
                        const problemName = await getInquiriesName(row.inquiriesID);
                        const studentName = await getStudentName(row.studentID);
                        const teacherName = await getTeacherName(row.teacherID);


                        // Thêm tên sinh viên vào dữ liệu kết quả đã được trả lời
                        row.problemName = problemName;
                        row.studentName = studentName;
                        row.teacherName = teacherName;
                    }
                    setRows(data);
                })
                .catch((error) => console.error(error));
        }
    };

    const editData = (
        resultsAnsweredID,
        inquiriesID,
        studentID,
        teacherID,
        dateOfReception,
        processingResults,
        condition
    ) => {
        const data = {
            resultsAnsweredID: resultsAnsweredID,
            problemName: inquiriesID,
            studentName: studentID, // Sử dụng studentID từ dữ liệu hiện tại
            teacherID: teacherID,
            dateOfReception: dateOfReception,
            processingResults: processingResults,
            condition: condition,
        };
        setFormID(data);
        handleEditOpen();
    };

    return (
        <>
            <div>
                <Modal
                    open={editopen}
                    onClose={() => setEditOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-md w-max">
                        <EditResultsAnswered
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
                    Results Answered
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
                        getOptionLabel={(row) => `${row.resultsAnsweredID}: ${row.problemName || ""}`}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search" />
                        )}
                    />
                </Stack>

                <div className="h-10" />

                <TableContainer className="max-h-450">
                    <Table className="sticky top-0" aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="min-w-100">Results Answered ID</TableCell>
                                <TableCell className="min-w-100">Inquiries Name</TableCell>
                                <TableCell className="min-w-100">Student ID</TableCell>
                                <TableCell className="min-w-100">Student Name</TableCell>
                                {/* <TableCell className="min-w-100">Teacher Name</TableCell> */}
                                <TableCell className="min-w-100">Date Of Reception</TableCell>
                                <TableCell className="min-w-100">Processing Results</TableCell>
                                <TableCell className="min-w-100">Condition</TableCell>
                                <TableCell className="min-w-100">Actions</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow key={row.resultsAnsweredID} hover role="checkbox" tabIndex={-1}>
                                            <TableCell className="min-w-100">
                                                {row.resultsAnsweredID}
                                            </TableCell>
                                            <TableCell className="min-w-100 whitespace-normal overflow-hidden overflow-ellipsis max-w-xs">
                                                {row.problemName}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.studentID}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.studentName}
                                            </TableCell>
                                            {/* <TableCell className="min-w-100">
                                                {row.teacherName || ''}
                                                {row.teacherID}
                                            </TableCell> */}
                                            <TableCell className="min-w-100">
                                                {formatDateForInput(row.dateOfReception)}
                                            </TableCell>
                                            <TableCell className="min-w-100 whitespace-normal overflow-hidden overflow-ellipsis max-w-xs">
                                                {row.processingResults}
                                            </TableCell>
                                            <TableCell className="min-w-100" style={{ fontSize: "19px", color: row.condition === 'Confirmed' ? "green" : row.condition === 'Pending' ? "red" : "blue" }}>
                                                {row.condition}
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
                                                                row.resultsAnsweredID,
                                                                row.problemName,
                                                                row.studentName,
                                                                row.teacherID,
                                                                row.dateOfReception,
                                                                row.processingResults,
                                                                row.condition,
                                                            );
                                                        }}
                                                    />
                                                    {/* <DeleteIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "darkred",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            deleteUser(row.resultsAnsweredID);
                                                        }}
                                                    /> */}
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

export default FormResultsAnswered;
