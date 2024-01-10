import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Radio,
  Typography,
  MenuItem,
  Container,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  //Form validation using Yup
  const validation = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup.number().required("Phone is required"),
    roles: yup.string().required("Role is required"),
    gender: yup.string().required("Gender is required"),
    image: yup.mixed().required("Image is required"),
  });

  //Initial form values
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    roles: "",
    gender: "",
    image: null,
  };

  //If editing needed, initial values will replace the existing values
  if (location.state && location.state.rowData) {
    Object.assign(initialValues, location.state.rowData);
  }

  //To handle form state and form submission
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        if (values._id) {
          // Update existing user
          const response = await axios.put(
            `http://localhost:3000/api/update/${values._id}`,
            values
          );
          console.log("User updated successfully", response.data);
          toast.success("Form updated successfully", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
              console.log("Toast closed");
              setTimeout(() => {
                navigate("/table");
              }, 4000);
            },
          });
        } else {
          // Add new user
          const response = await axios.post(
            "http://localhost:3000/api/register",
            values
          );
          console.log("User added successfully", response.data);
          toast.success("Form added successfully", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
            onClose: () => {
              console.log("Toast closed");
              setTimeout(() => {
                navigate("/table");
              }, 4000);
            },
          });
        }
      } catch (error) {
        console.error(error);
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("User not found.");
          } else if (error.response.status === 500) {
            toast.error("Internal Server Error.");
          }
        } else if (error.request) {
          toast.error("No response received from the server.");
        } else {
          toast.error("An error occurred.", error.message);
        }
      }
    },
  });

  //To fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      }
    };

    fetchRoles();
  }, []);

  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <Container>
      <ToastContainer />
      <h1>User REgistration form</h1>
      <form onSubmit={(e) => formik.handleSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              label="First name"
              variant="outlined"
              name="firstname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              label="Last name"
              variant="outlined"
              name="lastname"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              select
              label="Select Roles"
              name="roles"
              value={formik.values.roles}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.roles && Boolean(formik.errors.roles)}
              helperText={formik.touched.roles && formik.errors.roles}
            >
              {roles.map((role) => (
                <MenuItem key={role._id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid container item xs={12} sm={6} md={6} lg={4} alignItems="center">
            <Typography variant="body1" style={{ marginRight: "10px" }}>
              Gender:
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid container item xs={12} alignItems="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterForm;
