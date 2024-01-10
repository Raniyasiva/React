import './App.css';
import RegisterForm from './Form';
import GridTable from './Table';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GridTable />} />
          <Route path="/table" element={<GridTable />} />
          <Route path="/form" element={<RegisterForm />} />
          <Route path="/form/:id" element={<RegisterForm />} />

        </Routes>
     
    </Router>
    </div>
  );
}
export default App;