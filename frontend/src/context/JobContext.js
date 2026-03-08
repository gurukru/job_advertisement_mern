import React, { createContext, useContext, useState, useCallback } from 'react';
import { jobAPI } from '../api/jobAPI.js';

const JobContext = createContext();

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    jobType: null,
    salaryType: null,
    searchTerm: '',
  });

  // Fetch all jobs
  const fetchJobs = useCallback(async (filterParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await jobAPI.getAllJobs(filterParams);
      setJobs(data);
      
      // Apply search filter
      if (filterParams.searchTerm) {
        const searchLower = filterParams.searchTerm.toLowerCase();
        const filtered = data.filter(job =>
          job.jobTitle.toLowerCase().includes(searchLower) ||
          job.companyName.toLowerCase().includes(searchLower) ||
          job.location.toLowerCase().includes(searchLower)
        );
        setFilteredJobs(filtered);
      } else {
        setFilteredJobs(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
      setJobs([]);
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new job
  const createJob = useCallback(async (jobData) => {
    setLoading(true);
    setError(null);
    try {
      const newJob = await jobAPI.createJob(jobData);
      setJobs([...jobs, newJob]);
      return newJob;
    } catch (err) {
      setError(err.message || 'Failed to create job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [jobs]);

  // Update job
  const updateJob = useCallback(async (jobId, jobData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedJob = await jobAPI.updateJob(jobId, jobData);
      setJobs(jobs.map(job => job._id === jobId ? updatedJob : job));
      return updatedJob;
    } catch (err) {
      setError(err.message || 'Failed to update job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [jobs]);

  // Delete job
  const deleteJob = useCallback(async (jobId) => {
    setLoading(true);
    setError(null);
    try {
      await jobAPI.deleteJob(jobId);
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (err) {
      setError(err.message || 'Failed to delete job');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [jobs]);

  // Update filters and fetch
  const applyFilters = useCallback(async (newFilters) => {
    setFilters(newFilters);
    
    const apiFilters = {};
    if (newFilters.jobType) apiFilters.jobType = newFilters.jobType;
    if (newFilters.salaryType) apiFilters.salaryType = newFilters.salaryType;

    await fetchJobs(apiFilters);
    
    // Apply search after API fetch
    if (newFilters.searchTerm) {
      const searchLower = newFilters.searchTerm.toLowerCase();
      const filtered = jobs.filter(job =>
        job.jobTitle.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower)
      );
      setFilteredJobs(filtered);
    }
  }, [jobs, fetchJobs]);

  // Clear filters
  const clearFilters = useCallback(async () => {
    setFilters({
      jobType: null,
      salaryType: null,
      searchTerm: '',
    });
    await fetchJobs();
  }, [fetchJobs]);

  const value = {
    jobs,
    filteredJobs,
    loading,
    error,
    filters,
    fetchJobs,
    createJob,
    updateJob,
    deleteJob,
    applyFilters,
    clearFilters,
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};
