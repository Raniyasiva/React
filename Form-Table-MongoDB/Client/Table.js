import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";
import Swal from "sweetalert2";
import axios from 'axios';

const GridTable = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const totalRows = userData?.length || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
       
        if (error.response) {
          if (error.response.status === 404) {
            console.error("User not found.");
          } else if (error.response.status === 500) {
            console.error("Internal Server Error.");
          }
        } else {
          console.error('An unexpected error occurred:', error.message);
        }
       
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting user with id:', id);
      const swalResult = await Swal.fire({
        title: "Are you sure want to delete the user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (swalResult.isConfirmed) {
        const response = await axios.delete(`http://localhost:3000/delete/${id}`);
        setUserData((prevData) =>
          prevData.filter((dataItem) => dataItem._id !== id)
        );

        toast.success(response.data.message, {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
          position: toast.POSITION.TOP_CENTER,
          style: {
            color: 'red'
          }
        });
      }
    } 
    catch (error) {
      console.error('Error deleting data:', error.message);
      if (error.response) {
        if (error.response.status === 404) {
          console.error('User not found.');
        } else if (error.response.status === 500) {
          console.error('Internal Server Error.');
        }
      }
       else if (error.request) {
        console.error('No response received from the server.');
      } else {
        console.error('An error occurred while deleting the user.');
      }
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${id}`);
      const userToEdit = response.data;
      navigate(`/form/${id}`, { state: { rowData: userToEdit } });
    } catch (error) {
      console.error('Error fetching user data for editing:', error.message);
      if (error.response) {
        if (error.response.status === 404) 
        {
          console.error('User not found.');
        } else if (error.response.status === 500) 
        {
          console.error('Internal Server Error.');
        }
      }
       else if (error.request) {
        console.error('No response received from the server.');
      } else {
        console.error('An error occurred while deleting the user.');
      }
    }
  };

  const handleUserButtonClick = () => {
    navigate('/form');
  };

  const updatedUserData = userData.map((user) => ({
    ...user,
  }));

  const visibleRows = updatedUserData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div>
      <ToastContainer />
      <h1>User Details</h1>
      <div className="add">
        <Button
          variant="contained"
          color="primary"
          onClick={handleUserButtonClick}
          style={{ display: 'block', marginLeft: 'auto', marginRight: '10px' }}
        >
          Add User
        </Button>
      </div>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ p: 2, height: '100%' }}>
          <Table className="table">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Firstname</Th>
                <Th>Lastname</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Phone</Th>
                <Th>Gender</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {visibleRows.map((row, index) => (
                <Tr key={row._id}>
                  <Td>{index + 1}</Td>
                  <Td>{row.firstname}</Td>
                  <Td>{row.lastname}</Td>
                  <Td>{row.email}</Td>
                  <Td>{row.roles}</Td>
                  <Td>{row.phone}</Td>
                  <Td>{row.gender}</Td>
                  <Td>
                    <div>
                      <RiDeleteBin6Line onClick={() => handleDelete(row._id)} className="delete-icon" />
                      <RiEdit2Line onClick={() => handleEdit(row._id)} className="edit-icon" />
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <Pagination
        count={Math.ceil(totalRows / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default GridTable;
