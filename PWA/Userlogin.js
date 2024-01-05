import React from "react";

import { Container,TextField,Button,MenuItem,Typography, Grid,} from "@mui/material";

import { useFormik } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const UserLogin = () => {

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      role: "",
      gender: "",
      file: null,
    },
 
    onSubmit:(formValues,{resetForm},e) => {
      console.log('Form submitted:', formValues);
  
      alert("REgistered successfully");
      resetForm();

    },
  });

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <Container>
       <h1>Registration Form</h1>
       <form onSubmit={(e) => formik.handleSubmit(e)}>
       
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              label="First name"
              variant="outlined"
              name="firstname"
              onChange={formik.handleChange}
              value={formik.values.firstname}
             
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              label="Last name"
              variant="outlined"
              name="lastname"
              onChange={formik.handleChange}
              value={formik.values.lastname}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.email}
             
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.phone}
            
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
              fullWidth
              select
              label="Select Roles"
              name="role"
              value={formik.values.role}
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </TextField>
          </Grid>
          <Grid container item xs={12} sm={6} md={6} lg={4} alignItems="center">
            <Typography variant="body1" style={{ marginRight: "10px" }}>
              Gender:
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
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

          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Button type="submit" variant="contained" color="primary">
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default UserLogin;