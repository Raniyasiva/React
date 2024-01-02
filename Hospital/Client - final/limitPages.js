import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./user.css";
import Swal from "sweetalert2";
import axios from 'axios';

const CustomDataGrid = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const totalRows = userData.length;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

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
  // const handleEdit = (id) => {
  //   navigate(`/form/${id}`,{ state: { rowData: user }});
  // };

  const handleEdit = (id) => {
    const userToEdit = userData.find((user) => user.id === id);
  
    navigate(`/form/${id}`, { state: { rowData: userToEdit } });
  };
  const handleUserButtonClick = () => {
    navigate('/form');
  };

 const updatedUserData = userData.map((user) => ({
    ...user,status: 'Active',
  }));

  const visibleRows = updatedUserData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div>
      <ToastContainer />
      <div className="add">
        <Button variant="contained" color="primary" onClick={handleUserButtonClick}>
          Add User
        </Button>
      </div>
      <div className="data-grid-container">
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={visibleRows}
            columns={[
              { field: 'id', headerName: 'ID', width: 90 },
              { field: 'firstname', headerName: 'Firstname', width: 150 },
              { field: 'lastname', headerName: 'Lastname', width: 150 },
              { field: 'role', headerName: 'Role', width: 150 },
              { field: 'department', headerName: 'Department', width: 150 },
              { field: 'hospital', headerName: 'Hospital', width: 150 },
              { field: 'email', headerName: 'Email', width: 150 },
              { field: 'status', headerName: 'Status', width: 150 },
              {field: 'profile',headerName: 'Profile',width: 150,
              renderCell: (params) =>params.row.file ? (
                    <img
                      src={`http://localhost:3000/${params.row.file}`}
                      alt={`Image for ${params.row.firstname}`}
                      style={{ width: '50px', height: '50px', borderRadius: '50px' }}
                    />
                  ) : null,
              },
              {
                field: 'actions',
                headerName: 'Actions',
                width: 150,
                renderCell: (params) => (
                  <div>
                    <RiDeleteBin6Line onClick={() => handleDelete(params.row.id)} className="delete-icon" />
                    <RiEdit2Line onClick={() => handleEdit(params.row.id)} className="edit-icon" />
                  </div>
                ),
              },
            ]}
            //pageSize={rowsPerPage}
            //disableSelectionOnClick 
          />
        </Box>
        <Pagination
          count={Math.ceil(totalRows / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default CustomDataGrid;
