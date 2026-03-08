import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard.js';
import FilterBar from '../components/FilterBar.js';
import { useJobContext } from '../context/JobContext.js';
import styles from './Home.module.css';

const Home = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const { filteredJobs, loading, error, fetchJobs, applyFilters, clearFilters } = useJobContext();
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      fetchJobs();
      setHasInitialized(true);
    }
  }, [fetchJobs, hasInitialized]);

  const handleApply = (job) => {
    if (job.portalLink) {
      window.open(job.portalLink, '_blank');
    } else {
      alert('No application link provided for this job.');
    }
  };

  const handleEdit = (job) => {
    navigate(`/edit-job/${job._id}`, { state: { job } });
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      // Delete logic will be implemented in context
      navigate('/manage-jobs');
    }
  };

  const handleSearch = (searchTerm) => {
    applyFilters({
      searchTerm,
    });
  };

  const handleFilter = (filters) => {
    applyFilters(filters);
  };

  return (
    <div className={styles.home}>
      <FilterBar
        onSearch={handleSearch}
        onFilter={handleFilter}
        onClear={clearFilters}
      />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>
            {isAdmin ? '📋 Manage Job Postings' : '💼 Available Jobs'}
          </h1>
          <p className={styles.subtitle}>
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {error && (
          <div className={styles.alert + ' ' + styles.error}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No Jobs Found</h3>
            <p>
              {isAdmin
                ? 'Start by creating a new job posting!'
                : 'Try adjusting your search filters or check back later.'}
            </p>
            {isAdmin && (
              <button
                className={styles.cta}
                onClick={() => navigate('/create-job')}
              >
                ➕ Create New Job
              </button>
            )}
          </div>
        ) : (
          <div className={styles.jobsList}>
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onApply={handleApply}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
