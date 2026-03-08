import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import JobForm from './pages/JobForm.js';
import { JobProvider } from './context/JobContext.js';
import './styles/index.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <Router>
      <JobProvider>
        <Header isAdmin={isAdmin} onToggleAdmin={toggleAdminMode} />
        <Routes>
          {/* User View - Browse Jobs */}
          <Route path="/" element={<Home isAdmin={false} />} />
          <Route path="/jobs" element={<Home isAdmin={false} />} />

          {/* Admin View */}
          <Route path="/admin" element={<Home isAdmin={true} />} />
          <Route path="/manage-jobs" element={<Home isAdmin={true} />} />

          {/* Create Job */}
          <Route path="/create-job" element={<JobForm isEdit={false} />} />

          {/* Edit Job */}
          <Route path="/edit-job/:id" element={<JobForm isEdit={true} />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </JobProvider>
    </Router>
  );
}

export default App;
