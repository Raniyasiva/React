import './App.css';
import Validatin from './Validatin';
import Details from './Details';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Edit from './Edit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LimitPages from './limitPages'
function App() {
  const [userData, setData] = useState([]);
  const [rowData, setRowData] = useState([]);

  // const updateRowData = (data) => {
  //   setRowData(data);
  // };
//   const updateRowData = (data) => {
//     setRowData(data);
//   };
//   useEffect(() => {
//     fetchData();
//   }, [rowData]);
// console.log(rowData,'RowData');
//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/getData');
//       const jsonData = response.data;
//       console.log('Response',response.data);
//       setData(jsonData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
  useEffect(() => {
  const interval = setInterval(() => {
    axios.get('http://localhost:3000/getData')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, 1000); 

  return () => clearInterval(interval);
}, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LimitPages userData={userData} setUserData={setData} />} />
        <Route path="/form/:id" element={<Validatin  />} />
        <Route path="/form" element={ <Validatin />} />
        {/* <Route path="/edit/:id" element={<Edit  />} /> */}
        <Route path="/table" element={<LimitPages userData={userData} setUserData={setData}/>} />

      </Routes>
    </Router>
  );
}

export default App;