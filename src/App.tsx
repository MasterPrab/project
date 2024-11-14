// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';  // Adjust path as needed for your Register component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />        {/* Example Home route */}
                <Route path="/register" element={<Register />} />  {/* Register route */}
            </Routes>
        </Router>
    );
}

export default App;