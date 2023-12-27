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

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
  
    if (confirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/deleteData/${id}`);
        alert( response.data.message);
  
        setUserData((prevData) =>
          prevData.filter((dataItem) => dataItem.id !== id)
        );
      } catch (error) {
        console.error('Error deleting data:', error.message);
      }
    }
  };
  

  const handleUserButtonClick = () => {
    navigate('/form');
  };

  const handleEdit = (item) => {
    navigate(`/edit/${item.id}`, { state: { rowData: item } });
  };

  return (
    <div>
      <div className='add'>
      <button onClick={handleUserButtonClick}>Add User</button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
              <StyledTableCell align="right">Hospital</StyledTableCell>
              <StyledTableCell align="right">Email Address</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.id} 
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {user.firstname}
                </StyledTableCell>
                <StyledTableCell align="right">{user.role}</StyledTableCell>
                <StyledTableCell align="right">{user.hospital}</StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">Active</StyledTableCell>
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