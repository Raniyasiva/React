import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { GoUpload } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { PiUsersBold } from "react-icons/pi";
import "./user.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Validatin() {
//console.log("updateRowData ", updateRowData);

  //console.log(updateRowData);
  const svgContent = `
    <svg width="95" height="36" viewBox="0 0 95 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.9999 24.7C8.7999 25.3 8.5999 26 8.3999 26.6C10.7999 29.2 14.0999 30.8 17.8999 30.8C21.6999 30.8 25.0999 29.2 27.3999 26.6C27.1999 26 27.0999 25.3 26.7999 24.7C25.9999 22.5 24.3999 20.8 22.2999 19.9C20.9999 20.8 19.4999 21.3 17.8999 21.3C16.2999 21.3 14.6999 20.8 13.4999 19.9C11.4999 20.8 9.7999 22.5 8.9999 24.7Z" fill="#0BC5EA"/>
    <path d="M18.0002 18.6C20.9002 18.6 23.3002 16.3 23.3002 13.3C23.3002 10.4 20.9002 8.09998 18.0002 8.09998C15.1002 8.09998 12.7002 10.4 12.7002 13.3C12.7002 16.3 15.1002 18.6 18.0002 18.6Z" fill="#0BC5EA"/>
    <path d="M18 33.4C9.5 33.4 2.6 26.5 2.6 18C2.6 9.5 9.5 2.6 18 2.6C22.6 2.6 26.8 4.7 29.6 7.9C30 7.1 30.5 6.4 31.1 5.7C27.8 2.2 23.2 0 18 0C8.1 0 0 8.1 0 18C0 27.9 8.1 36 18 36C23.2 36 27.8 33.8 31.1 30.3C30.6 29.6 30.1 28.8 29.6 28.1C26.8 31.3 22.6 33.4 18 33.4Z" fill="#0BC5EA"/>
    <path d="M68.1 24.7C67.9 25.3 67.7 26 67.5 26.6C69.9 29.2 73.2 30.8 77 30.8C80.8 30.8 84.2 29.2 86.5 26.6C86.3 26 86.2 25.3 85.9 24.7C85.1 22.5 83.5 20.8 81.4 19.9C80.1 20.8 78.6 21.3 77 21.3C75.4 21.3 73.8 20.8 72.6 19.9C70.5 20.8 68.9 22.5 68.1 24.7Z" fill="#0BC5EA"/>
    <path d="M77.0002 18.6C79.9002 18.6 82.3002 16.3 82.3002 13.3C82.3002 10.4 79.9002 8.09998 77.0002 8.09998C74.1002 8.09998 71.7002 10.4 71.7002 13.3C71.8002 16.3 74.1002 18.6 77.0002 18.6Z" fill="#0BC5EA"/>
    <path d="M76.9998 0C71.7998 0 67.1998 2.2 63.8998 5.7C64.3998 6.4 64.8998 7.2 65.2998 7.9C68.0998 4.6 72.2998 2.6 76.8998 2.6C85.3998 2.6 92.2998 9.5 92.2998 18C92.2998 26.5 85.3998 33.4 76.8998 33.4C72.2998 33.4 68.0998 31.3 65.2998 28.1C64.8998 28.9 64.3998 29.6 63.7998 30.3C67.0998 33.8 71.6998 36 76.8998 36C86.7998 36 94.8998 27.9 94.8998 18C94.9998 8.1 86.8998 0 76.9998 0Z" fill="#0BC5EA"/>
    <path d="M51.9 19.9C50.6 20.8 49.1 21.3 47.5 21.3C45.9 21.3 44.3 20.8 43.1 19.9C41 20.8 39.4 22.5 38.6 24.7C38.4 25.3 38.2 26 38 26.6C40.4 29.2 43.7 30.8 47.5 30.8C51.3 30.8 54.7 29.2 57 26.6C56.8 26 56.7 25.3 56.4 24.7C55.7 22.5 54 20.8 51.9 19.9Z" fill="#0BC5EA"/>
    <path d="M47.5002 18.6C50.4002 18.6 52.8002 16.3 52.8002 13.3C52.8002 10.4 50.4002 8.09998 47.5002 8.09998C44.6002 8.09998 42.2002 10.4 42.2002 13.3C42.2002 16.3 44.6002 18.6 47.5002 18.6Z" fill="#0BC5EA"/>
    <path d="M47.5 0C37.6 0 29.5 8.1 29.5 18C29.5 27.9 37.6 36 47.5 36C57.4 36 65.5 27.9 65.5 18C65.5 8.1 57.4 0 47.5 0ZM47.5 33.4C39 33.4 32.1 26.5 32.1 18C32.1 9.5 39 2.6 47.5 2.6C56 2.6 62.9 9.5 62.9 18C62.9 26.5 56 33.4 47.5 33.4Z" fill="#0BC5EA"/>
    </svg>
      </svg>
  `;

  const svgTwoUser = `<svg width="90" height="41" viewBox="0 0 90 41" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.768 31.728C10.768 34.448 8.848 36.304 5.888 36.304C2.912 36.304 1.056 34.448 1.056 31.728V24.672H3.776V31.504C3.776 32.72 4.368 33.84 5.904 33.84C7.456 33.84 8.032 32.72 8.032 31.504V24.672H10.768V31.728ZM18.9645 28.896L17.5245 30.384C17.1085 29.984 16.5005 29.664 15.8605 29.664C15.3645 29.664 14.8685 29.84 14.8685 30.304C14.8685 30.752 15.3005 30.88 16.3245 31.104C17.5405 31.376 18.8685 31.984 18.8685 33.536C18.8685 35.552 17.0925 36.256 15.4605 36.256C14.1645 36.256 12.8205 35.824 11.9885 35.024L13.4605 33.472C13.9245 33.984 14.6445 34.368 15.4125 34.368C15.8445 34.368 16.3565 34.192 16.3565 33.68C16.3565 33.184 15.8605 33.024 14.7725 32.768C13.6685 32.512 12.4525 31.952 12.4525 30.448C12.4525 28.544 14.2445 27.776 15.7645 27.776C16.9485 27.776 18.1805 28.16 18.9645 28.896ZM22.4954 31.104H25.8714C25.8714 30.272 25.3434 29.584 24.3034 29.584C23.2954 29.584 22.5594 30.288 22.4954 31.104ZM28.2874 32.112C28.2874 32.32 28.2874 32.544 28.2714 32.736H22.4954C22.5754 33.616 23.4554 34.24 24.3994 34.24C25.2314 34.24 25.8074 33.888 26.1594 33.408L27.9834 34.56C27.2314 35.648 25.9834 36.256 24.3674 36.256C21.9674 36.256 19.9834 34.736 19.9834 32.048C19.9834 29.44 21.8714 27.776 24.2874 27.776C26.6394 27.776 28.2874 29.392 28.2874 32.112ZM35.1946 27.872L35.0826 30.176C34.8426 30.112 34.6186 30.096 34.4106 30.096C33.0026 30.096 32.5386 31.248 32.5386 31.904V36H29.9146V28.032H32.4426V29.184H32.4746C32.8746 28.384 33.6586 27.808 34.6346 27.808C34.8426 27.808 35.0666 27.824 35.1946 27.872ZM42.3864 28.896L40.9464 30.384C40.5304 29.984 39.9224 29.664 39.2824 29.664C38.7864 29.664 38.2904 29.84 38.2904 30.304C38.2904 30.752 38.7224 30.88 39.7464 31.104C40.9624 31.376 42.2904 31.984 42.2904 33.536C42.2904 35.552 40.5144 36.256 38.8824 36.256C37.5864 36.256 36.2424 35.824 35.4104 35.024L36.8824 33.472C37.3464 33.984 38.0664 34.368 38.8344 34.368C39.2664 34.368 39.7784 34.192 39.7784 33.68C39.7784 33.184 39.2824 33.024 38.1944 32.768C37.0904 32.512 35.8744 31.952 35.8744 30.448C35.8744 28.544 37.6664 27.776 39.1864 27.776C40.3704 27.776 41.6024 28.16 42.3864 28.896Z" fill="#0BC5EA"/>
  <path d="M34.9998 22.8629C34.9998 23.6382 34.3708 24.2742 33.5925 24.2742H16.6489C15.8743 24.2742 15.2417 23.6405 15.2417 22.8629C15.2417 17.4069 19.6647 12.9839 25.1207 12.9839C30.5768 12.9839 34.9998 17.4069 34.9998 22.8629ZM25.1207 14.6774C20.6945 14.6774 17.0888 18.1906 16.94 22.5806H33.3014C33.1527 18.1906 29.547 14.6774 25.1207 14.6774ZM25.1207 11.8548C21.8471 11.8548 19.1933 9.20104 19.1933 5.92742C19.1933 2.6538 21.8471 0 25.1207 0C28.3944 0 31.0482 2.6538 31.0482 5.92742C31.0482 9.20104 28.3944 11.8548 25.1207 11.8548ZM25.1207 10.1613C27.459 10.1613 29.3546 8.26572 29.3546 5.92742C29.3546 3.58912 27.459 1.69355 25.1207 1.69355C22.7824 1.69355 20.8869 3.58912 20.8869 5.92742C20.8869 8.26572 22.7824 10.1613 25.1207 10.1613Z" fill="#0BC5EA"/>
  <path d="M19.7581 22.8629C19.7581 23.6382 19.1291 24.2742 18.3508 24.2742H1.40722C0.632607 24.2742 0 23.6405 0 22.8629C0 17.4069 4.42299 12.9839 9.87903 12.9839C15.3351 12.9839 19.7581 17.4069 19.7581 22.8629ZM9.87903 14.6774C5.45278 14.6774 1.84709 18.1906 1.69832 22.5806H18.0597C17.911 18.1906 14.3053 14.6774 9.87903 14.6774ZM9.87903 11.8548C6.60541 11.8548 3.95161 9.20104 3.95161 5.92742C3.95161 2.6538 6.60541 0 9.87903 0C13.1527 0 15.8065 2.6538 15.8065 5.92742C15.8065 9.20104 13.1527 11.8548 9.87903 11.8548ZM9.87903 10.1613C12.2173 10.1613 14.1129 8.26572 14.1129 5.92742C14.1129 3.58912 12.2173 1.69355 9.87903 1.69355C7.54073 1.69355 5.64516 3.58912 5.64516 5.92742C5.64516 8.26572 7.54073 10.1613 9.87903 10.1613Z" fill="#0BC5EA"/>
  </svg>`;
  const siha = `<svg width="200" height="52" viewBox="0 0 200 52" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <mask id="mask0_1_1265" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="52">
  <rect width="200" height="52" fill="url(#pattern0)"/>
  </mask>
  <g mask="url(#mask0_1_1265)">
  <rect x="-2.3667" y="-8.27246" width="202.367" height="49.6364" fill="white"/>
  </g>
  <defs>
  <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
  <use xlink:href="#image0_1_1265" transform="matrix(0.000244141 0 0 0.000939002 0 -0.653564)"/>
  </pattern>
  </defs>
  </svg>`;

  const [selectedFile, setSelectedFile] = useState(null);
  const [hospitals, setHospital] = useState([]);
  const [roles, setRoles] = useState([]);
  const [department, setDepartment] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const hospital = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getHospitals");
        setHospital(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    hospital();
  }, []);

  useEffect(() => {
    const roles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getRoles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching Roles:", error);
      }
    };
    roles();
  }, []);

  useEffect(() => {
    const department = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getDepartment");
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching Roles:", error);
      }
    };
    department();
  }, []);

  const location = useLocation();
  const { rowData } = location.state || {};
  const formik = useFormik({
    initialValues: {
      hospital: rowData ? rowData.hospital : "",
      firstname: rowData ? rowData.firstname : "",
      lastname: rowData ? rowData.lastname : "",
      email: rowData ? rowData.email : "",
      department: rowData ? rowData.department : "",
      role: rowData ? rowData.role : "",
      file: rowData ? rowData.file : null,
    },
    validationSchema: Yup.object({
      hospital: Yup.string().required("Required"),
      firstname: Yup.string().required("Required").matches(/^[a-zA-Z\s]+$/, "Firstname should contain only letters"),
      lastname: Yup.string().matches(/^[a-zA-Z\s]+$/, "Lastname should contain only letters").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      department: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
      file: Yup.mixed().required("File is required"),
    }),

    onSubmit: async (formvalues) => {
      console.log(formvalues);
      const formDataToSend = new FormData();
      Object.keys(formvalues).forEach((key) => {
        formDataToSend.append(key, formvalues[key]);
      });

      try {
        if (rowData) {
          console.log(rowData);
          const updateResponse = await axios.put(
            `http://localhost:3000/updateUserData/${rowData.id}`,
            formDataToSend
          );
          console.log(updateResponse, "updateREs");
          toast.success("Form updated successfully", {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(rowData, "row");
          setTimeout(() => {
            navigate("/table");
          }, 2000);
          console.log("check before");

          //updateRowData(formvalues);
          console.log('check after');
          formik.resetForm();
        } else {
          await axios.post(
            "http://localhost:3000/storeUserData",
            formDataToSend
          );
          toast.success("Form submitted successfully", {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            position: toast.POSITION.TOP_CENTER,
          });

          setTimeout(() => {
            navigate("/table");
          }, 2000);
        }
        //updateRowData(formvalues);
        formik.resetForm();
        // console.log('Form Reset Successfully');

        console.log(toast.success, "form submit");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("file", file);
    setSelectedFile(file);
  };

  const handleChange = (e) => {
    formik.handleChange(e);
  };

  return (
    <div>
      <ToastContainer />
      <div className="siha">
        <div className="leftl">
          <div className="left">
            <div
              className="siha_logo"
              dangerouslySetInnerHTML={{ __html: siha }}
            />
          </div>
        </div>

        <div className="mainContainer">
          <div className="top">
            <div className="nav">
              <p>
                Home&gt;Configurations&gt;<span>Add User</span>
              </p>
            </div>
            <div className="notify">
              <span>Greg House</span>
              <IoMdNotificationsOutline
                className="notify-sym"
                color="primary"
                fontSize="small"
              />
              <FaRegUserCircle
                color="primary"
                fontSize="small"
                className="user"
              />
            </div>
            <div
              className="twoUser"
              dangerouslySetInnerHTML={{ __html: svgTwoUser }}
            />
          </div>

          <div className="greyContainer">
            <div
              className="usericon"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
            <div className="container">
              <p className="heading">User Details</p>

              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <div className="nameContainerHos">
                    <TextField
                      select
                      className="outlined-basic-hos"
                      label="Select Hospital"
                      name="hospital"
                      value={formik.values.hospital}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.hospital &&
                        Boolean(formik.errors.hospital)
                      }
                      helperText={
                        formik.touched.hospital && formik.errors.hospital
                      }
                    >
                      {hospitals.map((hospital) => (
                        <MenuItem key={hospital} value={hospital.name}>
                          {hospital.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </FormControl>
                <div className="nameContainer">
                  <TextField
                    className="outlined-basic"
                    label="First name"
                    variant="outlined"
                    name="firstname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                    error={
                      formik.touched.firstname &&
                      Boolean(formik.errors.firstname)
                    }
                    helperText={
                      formik.touched.firstname && formik.errors.firstname
                    }
                  />
                  <TextField
                    className="outlined-basic"
                    label="Last name"
                    variant="outlined"
                    name="lastname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                    error={
                      formik.touched.lastname && Boolean(formik.errors.lastname)
                    }
                    helperText={
                      formik.touched.lastname && formik.errors.lastname
                    }
                  />
                </div>
                <div className="nameContainer">
                  <TextField
                    className="outlined-basic"
                    label="Email"
                    name="email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <FormControl>
                    <TextField
                      select
                      className="outlined-basic"
                      label="Select Roles"
                      name="role"
                      value={formik.values.role}
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                      helperText={formik.touched.role && formik.errors.role}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role} value={role.name}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </div>
                <div className="nameContainer">
                  <FormControl>
                    <TextField
                      select
                      className="outlined-basic"
                      label="Select Department"
                      name="department"
                      value={formik.values.department}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.department &&
                        Boolean(formik.errors.department)
                      }
                      helperText={
                        formik.touched.department && formik.errors.department
                      }
                    >
                      {department.map((department) => (
                        <MenuItem key={department} value={department.name}>
                          {department.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                  <div className="btn-file">
                    <label htmlFor="file-upload" className="btn-file">
                      <input
                        type="file"
                        id="file-upload"
                        name="file"
                        onChange={handleFileChange}
                        onBlur={formik.handleBlur}
                        style={{ display: "none" }}
                      />
                      <Typography className="reg">
                        {selectedFile
                          ? selectedFile.name
                          : rowData && rowData.file
                          ? rowData.file
                          : "Registration Certificate"}
                        <GoUpload
                          color="primary"
                          fontSize="small"
                          className="GoUpload"
                        />
                      </Typography>
                    </label>
                    {formik.touched.file && formik.errors.file && (
                      <Typography variant="caption" color="error">
                        {formik.errors.file}
                      </Typography>
                    )}
                  </div>
                </div>
                <div className="button">
                  <button type="submit" className="btn">
                    <PiUsersBold color="primary" className="btn-user" />
                    {rowData ? "Update User" : "Add User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
