import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; 
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'; 
// import Navbar from './components/Navbar'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
