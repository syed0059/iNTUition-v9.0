import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Mainpage from './components/Mainpage/Mainpage';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/calendar" element={<div><Navbar />
      <Sidebar /><Calendar /></div>}/> 
          <Route path="/home" element={<div><Navbar />
      <Sidebar /><Mainpage/></div>}/>
          </Routes>
    </div>
  );
}

export default App;