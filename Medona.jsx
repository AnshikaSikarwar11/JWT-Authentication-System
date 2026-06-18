import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toknav } from './Toknav';
import Medona1 from './Token/Medona1';
import Medona2 from './Token/Medona2';
import Medona3 from './Token/Medona3';
1
export const Token4 = () => {
    return (
        <Router>
            <Toknav />
            <Routes>
                <Route path="/register" element={<Medona1 />} />
                <Route path="/login" element={<Medona2 />} />
                <Route path="/dash" element={<Medona3/>} />
            </Routes>
        </Router>
    );
}

export default Token4;