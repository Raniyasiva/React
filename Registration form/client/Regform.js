import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Table.css";

export default function Regform() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    location: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [data, setData] = useState([]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = "Name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.userName)) {
      newErrors.userName = "Name should contain only letters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid Email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 5) {
      newErrors.password = "Password should be at least 5 characters long";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Please select a gender";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Please select a location";
    }

    if (!formData.file) {
      newErrors.file = "Please select a file";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (errors[name] && value.trim()) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });
    const error = validateForm(name, formData[name]);
    setErrors({
      ...errors,
      [name]: error,
    });
    validateForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        console.log("Form submitted:", formData);
        const formDataToSend = new FormData();
        // formDataToSend.append("userName", formData.userName);
        // formDataToSend.append("email", formData.email);
        // formDataToSend.append("password", formData.password);
        // formDataToSend.append("gender", formData.gender);
        // formDataToSend.append("location", formData.location);
        // formDataToSend.append("file", formData.file);
          Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
        const response = await axios.post("http://localhost:3000/storeFormData", formDataToSend);

        if (response.status !== 200) {
          console.error("Failed to submit form.", response.status);
          alert("Failed to submit form");
          return;
        }
         else {
          console.log("Form data sent successfully:", response.data.message);
          alert(response.data.message);
          setFormData({
            userName: "",
            email: "",
            password: "",
            phoneNumber: "",
            gender: "",
            location: "",
            file: null,
          });
         
        }
      } 
      catch (error) {
        console.error("Error:", error);
        alert("Error submitting form");
      }
    } else {
      alert("Form is invalid");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getData');
      const jsonData = response.data;
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="border">
          <h1>Registration From</h1>
          <div className="userName">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              placeholder="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {touched.userName && errors.userName && <p className="error">{errors.userName}</p>}
          </div>

          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="phoneNumber">
            <label htmlFor="phoneNumber">Phone number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <p className="error">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="Gender">
            <label className="Gender-label" htmlFor="gender">
              Gender
            </label>
            <div className="gender-options">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label htmlFor="Male">Male</label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label htmlFor="Female">Female</label>

              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <label htmlFor="Other">Other</label>
            </div>
            {touched.gender && errors.gender && <p className="error">{errors.gender}</p>}
          </div>

          <div className="Location">
            <label htmlFor="location">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              onBlur={handleBlur}
            >
              <option value="">Select</option>
              <option value="Nagercoil">Nagercoil</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
            </select>
            {touched.location && errors.location && <p className="error">{errors.location}</p>}
          </div>
          <div className="file">
            <label htmlFor="file">File </label>
            <input type="file" name="file" onChange={handleFileChange} />
            {touched.file && errors.file && <p className="error">{errors.file}</p>}
          </div>
          <div className="btn">
            <button type="submit">Add User</button>
          </div>
        </div>

        <div>
      <h2>User Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
  {data.map((item) => (
    <tr key={item.id}>
      <td>{item.userName}</td>
      <td>{item.email}</td>
      <td>{item.Gender}</td>
      <td>{item.Location}</td>
    </tr>
  ))}
</tbody>

      </table>
      </div>
      </div>
    </form>
  );
}
