import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Job API calls
export const jobAPI = {
  // Create a new job
  createJob: async (jobData) => {
    try {
      const response = await api.post('/jobs', jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all jobs with optional filters
  getAllJobs: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.jobType) {
        params.append('jobType', filters.jobType);
      }
      
      if (filters.salaryType) {
        params.append('salaryType', filters.salaryType);
      }

      const response = await api.get('/jobs', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single job by ID
  getJobById: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update job
  updateJob: async (id, jobData) => {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete job
  deleteJob: async (id) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search jobs by title
  searchJobs: async (searchTerm, filters = {}) => {
    try {
      const allJobs = await jobAPI.getAllJobs(filters);
      
      if (!searchTerm) return allJobs;
      
      const lowerSearchTerm = searchTerm.toLowerCase();
      return allJobs.filter(job => 
        job.jobTitle.toLowerCase().includes(lowerSearchTerm) ||
        job.companyName.toLowerCase().includes(lowerSearchTerm)
      );
    } catch (error) {
      throw error;
    }
  },
};

export default api;
