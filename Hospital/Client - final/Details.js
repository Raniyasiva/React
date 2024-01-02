import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { RiEdit2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight:'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function CustomizedTables({ userData, setUserData }) {
  const navigate = useNavigate();

  // const handleDelete = async (id) => {
  //   const confirmed = window.confirm('Are you sure you want to delete this user?');
  
  //   if (confirmed) {
  //     try {
  //       const response = await axios.delete(`http://localhost:3000/deleteData/${id}`);
  //       //alert( response.data.message);
  
  //       setUserData((prevData) =>
  //         prevData.filter((dataItem) => dataItem.id !== id)
  //       );
  //       toast.success(response.data.message, {
  //         autoClose: 3000,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         style: {
  //           background: 'green',
  //           color:'white' 
  //         },
  //         position: toast.POSITION.TOP_CENTER,
  //       });
  
  //     } catch (error) {
  //       console.error('Error deleting data:', error.message);
  //     }
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      const swalResult = await Swal.fire({
        title: "Are you sure want to delete the user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
  
      if (swalResult.isConfirmed) {
        const response = await axios.delete(`http://localhost:3000/deleteData/${id}`);
        setUserData((prevData) =>
          prevData.filter((dataItem) => dataItem.id !== id)
        );
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
  
        toast.success(response.data.message, {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };
  

  const handleUserButtonClick = () => {
    navigate('/form');
  };

  const handleEdit = (item) => {
    navigate(`/form/${item.id}`, { state: { rowData: item } });
  };

  return (
    <div>
      <ToastContainer/>
      <div className='add'>
      <button onClick={handleUserButtonClick}>Add User</button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> ID</StyledTableCell>
              <StyledTableCell align="center">Firstname</StyledTableCell>
              <StyledTableCell align="center">Lastname</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Department</StyledTableCell>
              <StyledTableCell align="center">Hospital</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Profile</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="center">{user.id} </StyledTableCell>
                <StyledTableCell align="center">{user.firstname}</StyledTableCell>
                <StyledTableCell align="center">{user.lastname}</StyledTableCell>
                <StyledTableCell align="center">{user.role}</StyledTableCell>
                <StyledTableCell align="center">{user.department}</StyledTableCell>
                <StyledTableCell align="center">{user.hospital}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>
                <StyledTableCell>
              {user.file && (
                  <img
                    src={`http://localhost:3000/${user.file}`}
                    alt={`Image for ${user.firstname}`}
                    style={{ width: '100px', height: '100px' , borderRadius:'50px'}}
                  />
              )}
              </StyledTableCell>
                <StyledTableCell align="right">
                  <RiDeleteBin6Line onClick={() => handleDelete(user.id)} className="delete-icon" />
                  <RiEdit2Line onClick={() => handleEdit(user)} className="edit-icon"/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default CustomizedTables;