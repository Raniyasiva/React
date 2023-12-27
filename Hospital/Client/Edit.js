import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
  const navigate = useNavigate();
  const location = useLocation();

  const [editedData, setEditedData] = useState({
    firstname: '',
    role: '',
    hospital: '',
    email: '',
  });

  const [roles, setRoles] = useState([]);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const { rowData } = location.state || {};

    if (rowData) {
      console.log('Existing Data:', rowData);

      setEditedData({
        firstname: rowData.firstname,
        role: rowData.role,
        hospital: rowData.hospital,
        email: rowData.email,
        id: rowData.id,
      });
    } 
    else {
      console.error('Error: No data found');
      navigate('/display');
    }

    const fetch = async () => {
      try {
        const rolesResponse = await axios.get('http://localhost:3000/getRoles');
        const hospitalsResponse = await axios.get('http://localhost:3000/getHospitals');

        console.log('Roles:', rolesResponse.data);
        console.log('Hospitals:', hospitalsResponse.data);

        setRoles(rolesResponse.data);
        setHospitals(hospitalsResponse.data);
        console.log(setRoles);
      } catch (error) {
        console.error('Error fetching roles and hospitals:', error);
      }
    };
    fetch();
  }, [location.state, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to update?');
    if (!isConfirmed) {
      return; 
    }

    try {
      await axios.put(`http://localhost:3000/updateUserData/${editedData.id}`, {
        firstname: editedData.firstname,
        role: editedData.role,
        hospital: editedData.hospital,
        email: editedData.email,
      });

      navigate('/table');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const update=(existData) => ({ ...existData, [name]: value })
    setEditedData(update);
  };

  return (
    <div >
    <div className='editContainer'>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
     
        <TextField
          label="Name"
          type="text"
          name="firstname"
          value={editedData.firstname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="text"
          name="email"
          value={editedData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            name="role"
            value={editedData.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="hospital-label">Hospital</InputLabel>
          <Select
            labelId="hospital-label"
            id="hospital"
            name="hospital"
            value={editedData.hospital}
            onChange={handleChange}
          >
            {hospitals.map((hospital) => (
              <MenuItem key={hospital} value={hospital}>
                {hospital}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div>
    </div>
  );
}
export default Edit;