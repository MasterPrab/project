// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';

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