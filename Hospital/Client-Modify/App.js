import './App.css';
import Validatin from './Validatin';
import Details from './Details';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Edit from './Edit';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userData, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getData');
      const jsonData = response.data;
      console.log('Response',response.data);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Details userData={userData} setUserData={setData} />} />
        <Route path="/form/:id" element={<Validatin  />} />
        <Route path="/form" element={<Validatin  />} />
        <Route path="/edit/:id" element={<Edit  />} />
        <Route path="/table" element={<Details userData={userData} setUserData={setData}/>} />

      </Routes>
    </Router>
  );
}

export default App;