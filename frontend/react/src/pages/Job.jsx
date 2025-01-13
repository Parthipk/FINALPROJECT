// Job.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../components/Jobs/Landing';

export default function Job() {
  return (
    <Router>
      <Routes>
        <Route path="/jobs" element={<Landing />} />
      </Routes>
    </Router>
  );
}
