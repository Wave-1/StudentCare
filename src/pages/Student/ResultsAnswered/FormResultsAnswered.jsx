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
    const [resultsCertificationData, setResultsCertificationData] = useState([]);
    const studentID = sessionStorage.getItem('ID');


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
    const getCertificatesName = async (certificatesID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Certificates}/${certificatesID}`, {
                headers: API_HEADERS
            }); // Thay API_ENDPOINT bằng đường dẫn API thực tế
            if (response.status === 200) {
                return response.data.kind; // Trả về tên của sinh viên
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


    const getTeacherName = async (teacherID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}${API_ROUTES.Teacher}/${teacherID || ""}`, {
                headers: API_HEADERS
            }); // Thay API_ENDPOINT bằng đường dẫn API thực tế
            if (response.status === 200) {
                return response.data.teacherName;
            }
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () =>{
            let apiUrl = `${API_BASE_URL}${API_ROUTES.ResultsAnswered}/${studentID}`;
        
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
        // Lấy dữ liệu từ bảng ResultsCertification
        const fetchResultsCertificationData = async () => {
            let apiUrl = `${API_BASE_URL}${API_ROUTES.ResultsCertification}/${studentID}`;
    
            await axios.get(apiUrl, {
                headers: API_HEADERS,
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
                    const kind = await getCertificatesName(row.certificatesID);
                    const studentName = await getStudentName(row.studentID);
                    const teacherName = await getTeacherName(row.teacherID);

                    // Thêm tên sinh viên vào dữ liệu kết quả đã được trả lời
                    row.kind = kind;
                    row.studentName = studentName;
                    row.teacherName = teacherName;
                }
                setResultsCertificationData(data);
            })
            .catch((error) => console.log(error));
        };
        fetchResultsCertificationData();
        fetchData();
    },[studentID]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = +event.target.value;
        const newPage = Math.min(page, Math.floor(totalRows / newRowsPerPage));
        setRowsPerPage(newRowsPerPage);
        setPage(newPage);
    };
    
    const totalRows = rows.length ;
    // const filterData = (v) => {
    //     if(v) {
    //         setRows([v]);
    //     }else{
    //         axios.get(`${API_BASE_URL}${API_ROUTES.ResultsAnswered}`, 
    //         { headers: API_HEADERS })
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 return response.data;
    //             } else {
    //                 throw new Error('Failed to fetch data');
    //             }
    //         })
    //         .then(async (data) => {
    //             // Duyệt qua danh sách kết quả đã được trả lời
    //             for (const row of data) {
    //                 // Lấy tên của sinh viên dựa trên studentID
    //                 const problemName = await getInquiriesName(row.inquiriesID);
    //                 const studentName = await getStudentName(row.studentID);
    //                 const teacherName = await getTeacherName(row.teacherID);


    //                 // Thêm tên sinh viên vào dữ liệu kết quả đã được trả lời
    //                 row.problemName = problemName;
    //                 row.studentName = studentName;
    //                 row.teacherName = teacherName;
    //             }
    //             setRows(data);
    //         })
    //         .catch((error) => console.error(error));
    //     }
    // };

    return(
        <>
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
{/* 
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        className="w-96"
                        onChange={useEffect}
                        getOptionLabel={(row) => `${row.resultsAnsweredID}: ${row.problemName || ""}`}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search" />
                        )}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        className="flex-grow"
                    ></Typography>
                </Stack> */}

                <div className="h-10" />

                <TableContainer className="max-h-450">
                    <Table className="sticky top-0" aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="min-w-100">Inquiries Name</TableCell>
                                <TableCell className="min-w-100">Student Name</TableCell>
                                <TableCell className="min-w-100">Teacher Name</TableCell>
                                <TableCell className="min-w-100">Date Of Reception</TableCell>
                                <TableCell className="min-w-100">Processing Results</TableCell>
                                <TableCell className="min-w-100">Condition</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow key={row.resultsAnsweredID} hover role="checkbox" tabIndex={-1}>
                                         
                                            <TableCell className="min-w-100">
                                                {row.problemName}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.studentName}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.teacherName || ''}
                                                {/* {row.teacherID} */}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {(row.dateOfReception)}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.processingResults}
                                            </TableCell>
                                            <TableCell className="min-w-100">
                                                {row.condition}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                        <TableBody>
                            {resultsCertificationData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const backgroundColor = '';
                                return (
                                <TableRow key={row.resultsCertificationID} hover role="checkbox" tabIndex={-1} style={{ backgroundColor }}>
                                    <TableCell className="min-w-100">{row.kind}</TableCell>
                                    <TableCell className="min-w-100">{row.studentName}</TableCell>
                                    <TableCell className="min-w-100">{row.teacherName || ""}</TableCell>
                                    <TableCell className="min-w-100">{row.dateOfReception}</TableCell>
                                    <TableCell className="min-w-100">{row.processingResults}</TableCell>
                                    <TableCell className="min-w-100">{row.condition}</TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={totalRows}
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