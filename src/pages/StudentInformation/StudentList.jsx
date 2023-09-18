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
import { API_URL } from '../../apiConfig';
import AddStudent from './AddStudent';
import { useAppStore } from '../../appStore';
import EditStudent from './EditStudent';
import { Skeleton } from '@mui/material';


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

export default function StudentList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [rows, setRows] = useState([]);

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
    // Fetch data from API_URL and update 'rows' state here.
    // Example using fetch:
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setRows(data))
      .catch((error) => console.error(error));
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
  const deleteApi = async (id) => {
    try {
      const apiUrl = `${API_URL}/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Item deleted successfully, you may want to remove it from the 'rows' state.
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        // Handle error when item deletion fails
        Swal.fire("Error", "Failed to delete item", "error");
      }
    } catch (error) {
      // Handle network or other errors
      Swal.fire("Error", `An error occurred: ${error.message}`, "error");
    }
  };

  const filterData = (v) => {
    if (v) {
      // Filtered data is set when a value is selected in the autocomplete input.
      setRows([v]);
    } else {
      // Fetch the full list of students and set it when the input is cleared.
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => setRows(data))
        .catch((error) => console.error(error));
    }
  };

  const editData = (id, userId, title, body) => {
    const data = {
      id: id,
      userId: userId,
      title: title,
      body: body
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
            <AddStudent closeEvent={handleClose} />
          </Box>
        </Modal>
        <Modal
          open={editopen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditStudent fid={formid} closeEvent={handleEditClose} />
          </Box>
        </Modal>
      </div>
      {rows.length > 0 &&(
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '12px' }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Student List
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
            getOptionLabel={(row) => row.title || ""}
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
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  ID
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  UserID
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Title
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Body
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                      <TableCell align='left'>
                        {row.id}
                      </TableCell>
                      <TableCell align='left'>
                        {row.userId}
                      </TableCell>
                      <TableCell align='left'>
                        {row.title}
                      </TableCell>
                      <TableCell align='left'>
                        {row.body}
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
                            // onClick={() => editUser(row.id)}
                            onClick={() => {
                              editData(row.id, row.userId, row.title, row.body);
                            }}
                          />
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "darkred",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteUser(row.id);
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
      {rows.length == 0 &&(
        <>
          <Paper sx={{width:'100%', overflow: 'hidden', padding: '12px'}}>
            <Box height={20}/>
            <Skeleton variant='rectangular' width={'100%'} height={30}/>
            <Box height={40}/>
            <Skeleton variant='rectangular' width={'100%'} height={60}/>
            <Box height={20}/>
            <Skeleton variant='rectangular' width={'100%'} height={60}/>
            <Box height={20}/>
            <Skeleton variant='rectangular' width={'100%'} height={60}/>
            <Box height={20}/>
            <Skeleton variant='rectangular' width={'100%'} height={60}/>
            <Box height={20}/>
            <Skeleton variant='rectangular' width={'100%'} height={60}/>
            <Box height={20}/>
          </Paper>
        </>
      )}
    </>
  );
}
